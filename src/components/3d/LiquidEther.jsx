'use client';

import { useEffect, useRef, useState } from 'react';
import './LiquidEther.css';

const PIXEL_BUDGET = 2.4e6;
const MAX_CELLS = 140000;
const PRESSURE_STEPS = 32;
const PALETTE_SIZE = 256;

const VERTEX = `#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vUv;
void main() {
  vUv = corners[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`;

const HEADER = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform vec2 uTexel;
`;

const SPLAT = `${HEADER}
uniform sampler2D uVelocity;
uniform vec2 uSize;
uniform vec4 uSegment;
uniform vec2 uForce;
uniform float uRadius;

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
  return length(p - a - ab * t);
}

void main() {
  float d = segment(vUv * uSize, uSegment.xy, uSegment.zw) / uRadius;
  vec2 velocity = texture(uVelocity, vUv).xy + uForce * exp(-d * d * 6.0);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const SMOOTH = `${HEADER}
uniform sampler2D uVelocity;
uniform float uAmount;

void main() {
  vec2 center = texture(uVelocity, vUv).xy;
  vec2 around =
    texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).xy +
    texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).xy +
    texture(uVelocity, vUv - vec2(0.0, uTexel.y)).xy +
    texture(uVelocity, vUv + vec2(0.0, uTexel.y)).xy;
  fragColor = vec4(mix(center, around * 0.25, uAmount), 0.0, 1.0);
}`;

const DIVERGENCE = `${HEADER}
uniform sampler2D uVelocity;
uniform float uWalls;

void main() {
  vec2 center = texture(uVelocity, vUv).xy;
  float left = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
  float right = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
  float down = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
  float up = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
  float edge = uWalls > 0.5 ? -1.0 : 0.0;
  if (vUv.x - uTexel.x < 0.0) left = edge * center.x;
  if (vUv.x + uTexel.x > 1.0) right = edge * center.x;
  if (vUv.y - uTexel.y < 0.0) down = edge * center.y;
  if (vUv.y + uTexel.y > 1.0) up = edge * center.y;
  fragColor = vec4(0.5 * (right - left + up - down), 0.0, 0.0, 1.0);
}`;

const EDGE = `
uniform float uWalls;

float pressureAt(sampler2D field, vec2 uv) {
  vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
  return texture(field, uv).x * mix(inside.x * inside.y, 1.0, uWalls);
}
`;

const PRESSURE = `${HEADER}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
${EDGE}
void main() {
  vec2 reach = uTexel * 2.0;
  float sum =
    pressureAt(uPressure, vUv - vec2(reach.x, 0.0)) +
    pressureAt(uPressure, vUv + vec2(reach.x, 0.0)) +
    pressureAt(uPressure, vUv - vec2(0.0, reach.y)) +
    pressureAt(uPressure, vUv + vec2(0.0, reach.y));
  fragColor = vec4(sum * 0.25 - texture(uDivergence, vUv).x, 0.0, 0.0, 1.0);
}`;

const PROJECT = `${HEADER}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
${EDGE}
void main() {
  float left = pressureAt(uPressure, vUv - vec2(uTexel.x, 0.0));
  float right = pressureAt(uPressure, vUv + vec2(uTexel.x, 0.0));
  float down = pressureAt(uPressure, vUv - vec2(0.0, uTexel.y));
  float up = pressureAt(uPressure, vUv + vec2(0.0, uTexel.y));
  vec2 velocity = texture(uVelocity, vUv).xy - 0.5 * vec2(right - left, up - down);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const ADVECT = `${HEADER}
uniform sampler2D uVelocity;
uniform vec2 uStep;
uniform float uKeep;
uniform float uWalls;

vec2 at(vec2 uv) {
  vec2 outside = max(-uv, uv - 1.0) / uTexel;
  float open = clamp(1.0 - max(outside.x, outside.y) / 1.5, 0.0, 1.0);
  return texture(uVelocity, uv).xy * mix(open, 1.0, uWalls);
}

void main() {
  vec2 start = vUv - at(vUv) * uStep;
  vec2 back = start + at(start) * uStep;
  vec2 corrected = vUv - (back - vUv) * 0.5;
  vec2 origin = corrected - at(corrected) * uStep;
  vec2 a = at(origin + vec2(-0.5, -0.5) * uTexel);
  vec2 b = at(origin + vec2(0.5, -0.5) * uTexel);
  vec2 c = at(origin + vec2(-0.5, 0.5) * uTexel);
  vec2 d = at(origin + vec2(0.5, 0.5) * uTexel);
  vec2 velocity = clamp(at(origin), min(min(a, b), min(c, d)), max(max(a, b), max(c, d)));
  fragColor = vec4(velocity * uKeep, 0.0, 1.0);
}`;

const DISPLAY = `${HEADER}
uniform sampler2D uVelocity;
uniform sampler2D uPalette;
uniform vec2 uSimSize;
uniform float uSpeedScale;
uniform float uLight;
uniform vec4 uBackground;

vec2 velocityAt(vec2 uv) {
  vec2 st = uv * uSimSize - 0.5;
  vec2 i = floor(st);
  vec2 f = st - i;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (-f3 + 3.0 * f2 - 3.0 * f + 1.0) / 6.0;
  vec2 w1 = (3.0 * f3 - 6.0 * f2 + 4.0) / 6.0;
  vec2 w2 = (-3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0) / 6.0;
  vec2 w3 = f3 / 6.0;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 h0 = (i - 0.5 + w1 / g0) / uSimSize;
  vec2 h1 = (i + 1.5 + w3 / g1) / uSimSize;
  vec2 a = texture(uVelocity, vec2(h0.x, h0.y)).xy;
  vec2 b = texture(uVelocity, vec2(h1.x, h0.y)).xy;
  vec2 c = texture(uVelocity, vec2(h0.x, h1.y)).xy;
  vec2 d = texture(uVelocity, vec2(h1.x, h1.y)).xy;
  return g0.y * (g0.x * a + g1.x * b) + g1.y * (g0.x * c + g1.x * d);
}

void main() {
  float speed = length(velocityAt(vUv)) * uSpeedScale;
  float level = speed < 0.75 ? speed : 0.75 + 0.25 * tanh((speed - 0.75) * 4.0);
  vec3 ink = texture(uPalette, vec2(level, 0.5)).rgb;
  float alpha = level;
  if (uLight > 0.5) {
    float hollow = smoothstep(0.7, 1.6, speed);
    alpha = smoothstep(0.08, 0.5, level) * mix(0.85, 0.1, hollow);
  } else {
    float hot = 1.0 - exp(-max(speed - 0.75, 0.0) * 1.2);
    ink = mix(ink, min(ink * 1.8 + 0.06, vec3(1.0)), hot);
  }
  vec3 color = ink * alpha + uBackground.rgb * uBackground.a * (1.0 - alpha);
  float coverage = alpha + uBackground.a * (1.0 - alpha);
  float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  color += (grain - 0.5) / 255.0 * step(0.002, coverage);
  fragColor = vec4(clamp(color, vec3(0.0), vec3(coverage)), coverage);
}`;

const clampVal = (value, min, max) => Math.min(max, Math.max(min, value));

const keepFor = (persistence, dt) => Math.pow(0.5, dt / (0.35 + persistence * persistence * 12));

const parseColor = value => {
  const text = String(value || '').trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, digit => digit + digit) : hex[1];
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16) / 255);
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(text);
  if (rgb) return [rgb[1], rgb[2], rgb[3]].map(channel => clampVal(parseFloat(channel) / 255, 0, 1));
  return null;
};

const toLinear = channel => (channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4));

const buildPalette = colors => {
  const stops = [];
  colors.forEach(color => {
    const parsed = parseColor(color);
    if (parsed) stops.push(parsed.map(toLinear));
  });
  if (stops.length === 0) stops.push([0.32, 0.15, 1], [1, 0.62, 0.99], [0.71, 0.59, 0.81]);
  if (stops.length === 1) stops.push(stops[0]);
  const data = new Uint8Array(PALETTE_SIZE * 4);
  for (let i = 0; i < PALETTE_SIZE; i++) {
    const t = i / (PALETTE_SIZE - 1);
    const scaled = t * (stops.length - 1);
    const index = Math.min(Math.floor(scaled), stops.length - 2);
    const f = scaled - index;
    const a = stops[index];
    const b = stops[index + 1];
    data[i * 4] = Math.round(Math.pow(a[0] + (b[0] - a[0]) * f, 1 / 2.2) * 255);
    data[i * 4 + 1] = Math.round(Math.pow(a[1] + (b[1] - a[1]) * f, 1 / 2.2) * 255);
    data[i * 4 + 2] = Math.round(Math.pow(a[2] + (b[2] - a[2]) * f, 1 / 2.2) * 255);
    data[i * 4 + 3] = 255;
  }
  return data;
};

const compileShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

const createProgram = (gl, fragmentSource) => {
  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
};

const createTexture = (gl, width, height, data = null) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  return texture;
};

const createFBO = (gl, width, height) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, width, height, 0, gl.RG, gl.FLOAT, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  return { texture, fbo, width, height };
};

const createScalarFBO = (gl, width, height) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  return { texture, fbo, width, height };
};

export default function LiquidEther({
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  intensity = 1,
  mouseForce = 20,
  cursorSize = 100,
  persistence = 0.75,
  viscosity = 0,
  resolution = 0.5,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  autoResumeDelay = 1000,
  clickBurst = true,
  bounceEdges = false,
  intro = true,
  lightMode = false,
  backgroundColor = 'transparent',
  maxDevicePixelRatio = 2,
  className = '',
  style,
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    gl.getExtension('EXT_color_buffer_float');

    const programs = {
      splat: createProgram(gl, SPLAT),
      smooth: createProgram(gl, SMOOTH),
      divergence: createProgram(gl, DIVERGENCE),
      pressure: createProgram(gl, PRESSURE),
      project: createProgram(gl, PROJECT),
      advect: createProgram(gl, ADVECT),
      display: createProgram(gl, DISPLAY),
    };

    let simW, simH, velA, velB, divFBO, presA, presB;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);

      const cells = Math.min(
        Math.round(displayW * displayH * clampVal(resolution, 0.1, 1)),
        MAX_CELLS,
        Math.round(PIXEL_BUDGET / Math.max(dpr * dpr, 1))
      );
      const aspect = displayW / displayH;
      simH = Math.max(1, Math.round(Math.sqrt(cells / aspect)));
      simW = Math.max(1, Math.round(simH * aspect));

      velA = createFBO(gl, simW, simH);
      velB = createFBO(gl, simW, simH);
      divFBO = createScalarFBO(gl, simW, simH);
      presA = createScalarFBO(gl, simW, simH);
      presB = createScalarFBO(gl, simW, simH);
    };

    const paletteData = buildPalette(colors);
    const paletteTex = createTexture(gl, PALETTE_SIZE, 1, paletteData);

    const bgParsed = parseColor(backgroundColor);
    const bgColor = bgParsed ? [...bgParsed.map(toLinear), 1] : [0, 0, 0, 0];

    const draw = (src, dest) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, dest);
      if (dest === null) gl.viewport(0, 0, canvas.width, canvas.height);
      else gl.viewport(0, 0, src ? simW : simW, simH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const useTexture = (program, name, texture, unit) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(program.uniforms[name], unit);
    };

    const walls = bounceEdges ? 1 : 0;
    const texel = [1 / simW, 1 / simH];

    const splat = (x, y, dx, dy, x2, y2, radius) => {
      gl.useProgram(programs.splat.program);
      gl.uniform2fv(programs.splat.uniforms['uTexel'], texel);
      gl.uniform2f(programs.splat.uniforms['uSize'], simW, simH);
      gl.uniform4f(programs.splat.uniforms['uSegment'],
        x * simW, y * simH, x2 * simW, y2 * simH);
      gl.uniform2f(programs.splat.uniforms['uForce'], dx, dy);
      gl.uniform1f(programs.splat.uniforms['uRadius'], radius * simW);
      useTexture(programs.splat, 'uVelocity', velA.texture, 0);
      draw(velA, velB.fbo);
      [velA, velB] = [velB, velA];
    };

    const simulate = (dt) => {
      const keep = keepFor(persistence, dt);
      const smooth = clampVal(viscosity, 0, 1);

      if (smooth > 0) {
        gl.useProgram(programs.smooth.program);
        gl.uniform2fv(programs.smooth.uniforms['uTexel'], [1 / simW, 1 / simH]);
        gl.uniform1f(programs.smooth.uniforms['uAmount'], smooth);
        useTexture(programs.smooth, 'uVelocity', velA.texture, 0);
        draw(velA, velB.fbo);
        [velA, velB] = [velB, velA];
      }

      gl.useProgram(programs.divergence.program);
      gl.uniform2fv(programs.divergence.uniforms['uTexel'], [1 / simW, 1 / simH]);
      gl.uniform1f(programs.divergence.uniforms['uWalls'], walls);
      useTexture(programs.divergence, 'uVelocity', velA.texture, 0);
      draw(velA, divFBO.fbo);

      for (let i = 0; i < PRESSURE_STEPS; i++) {
        gl.useProgram(programs.pressure.program);
        gl.uniform2fv(programs.pressure.uniforms['uTexel'], [1 / simW, 1 / simH]);
        gl.uniform1f(programs.pressure.uniforms['uWalls'], walls);
        useTexture(programs.pressure, 'uPressure', presA.texture, 0);
        useTexture(programs.pressure, 'uDivergence', divFBO.texture, 1);
        draw(presA, presB.fbo);
        [presA, presB] = [presB, presA];
      }

      gl.useProgram(programs.project.program);
      gl.uniform2fv(programs.project.uniforms['uTexel'], [1 / simW, 1 / simH]);
      gl.uniform1f(programs.project.uniforms['uWalls'], walls);
      useTexture(programs.project, 'uPressure', presA.texture, 0);
      useTexture(programs.project, 'uVelocity', velA.texture, 1);
      draw(velA, velB.fbo);
      [velA, velB] = [velB, velA];

      gl.useProgram(programs.advect.program);
      gl.uniform2fv(programs.advect.uniforms['uTexel'], [1 / simW, 1 / simH]);
      gl.uniform2f(programs.advect.uniforms['uStep'], dt * 60, dt * 60);
      gl.uniform1f(programs.advect.uniforms['uKeep'], keep);
      gl.uniform1f(programs.advect.uniforms['uWalls'], walls);
      useTexture(programs.advect, 'uVelocity', velA.texture, 0);
      draw(velA, velB.fbo);
      [velA, velB] = [velB, velA];
    };

    let lastTime = null;
    let lastMouse = null;
    let lastMouseTime = null;
    let autoTimer = null;
    let isAuto = autoDemo;
    let autoAngle = Math.random() * Math.PI * 2;
    let introPhase = intro ? 1 : 0;
    let introTime = 0;

    const state = {
      mouse: { x: 0.5, y: 0.5, active: false },
      clickVel: null,
    };
    stateRef.current = state;

    const resumeAuto = () => {
      isAuto = autoDemo;
    };

    const pauseAuto = () => {
      isAuto = false;
      clearTimeout(autoTimer);
      if (autoDemo) autoTimer = setTimeout(resumeAuto, autoResumeDelay);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const now = performance.now();

      if (lastMouse && lastMouseTime) {
        const dt = Math.max((now - lastMouseTime) / 1000, 0.001);
        const dx = (x - lastMouse.x) / dt * mouseForce * 0.01;
        const dy = (y - lastMouse.y) / dt * mouseForce * 0.01;
        splat(lastMouse.x, lastMouse.y, dx, dy, x, y, cursorSize / 1000);
      }

      lastMouse = { x, y };
      lastMouseTime = now;
      state.mouse = { x, y, active: true };
      pauseAuto();
    };

    const onMouseLeave = () => {
      state.mouse.active = false;
      lastMouse = null;
      lastMouseTime = null;
    };

    const onMouseDown = (e) => {
      if (!clickBurst) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (lastMouse) {
        const dx = (x - lastMouse.x) * mouseForce * 2;
        const dy = (y - lastMouse.y) * mouseForce * 2;
        splat(x, y, dx, dy, x, y, cursorSize / 500);
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousedown', onMouseDown);

    resize();

    if (intro) {
      const cx = 0.5, cy = 0.5;
      const steps = 24;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const r = 0.3;
        const ix = cx + Math.cos(a) * r;
        const iy = cy + Math.sin(a) * r;
        const nx = cx + Math.cos(a + 0.3) * r;
        const ny = cy + Math.sin(a + 0.3) * r;
        const dx = (nx - ix) * 15;
        const dy = (ny - iy) * 15;
        splat(ix, iy, dx, dy, nx, ny, 0.08);
      }
    }

    const speedScale = 1 / (Math.max(simW, simH) * 0.003 * intensity);

    const loop = (time) => {
      rafRef.current = requestAnimationFrame(loop);

      if (lastTime === null) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isAuto) {
        const t = time * 0.001 * autoSpeed;
        autoAngle += dt * 0.8;
        const r = 0.28 + Math.sin(t * 0.7) * 0.12;
        const cx = 0.5 + Math.cos(t * 0.4) * 0.15;
        const cy = 0.5 + Math.sin(t * 0.3) * 0.15;
        const ax = cx + Math.cos(autoAngle) * r;
        const ay = cy + Math.sin(autoAngle) * r;
        const bx = cx + Math.cos(autoAngle + 0.15) * r;
        const by = cy + Math.sin(autoAngle + 0.15) * r;
        const speed = autoIntensity * mouseForce * 0.4;
        const dx = (bx - ax) * speed;
        const dy = (by - ay) * speed;
        splat(ax, ay, dx, dy, bx, by, cursorSize / 1000);
      }

      simulate(dt);

      gl.useProgram(programs.display.program);
      gl.uniform2fv(programs.display.uniforms['uTexel'], [1 / canvas.width, 1 / canvas.height]);
      gl.uniform2f(programs.display.uniforms['uSimSize'], simW, simH);
      gl.uniform1f(programs.display.uniforms['uSpeedScale'], speedScale);
      gl.uniform1f(programs.display.uniforms['uLight'], lightMode ? 1 : 0);
      gl.uniform4fv(programs.display.uniforms['uBackground'], bgColor);
      useTexture(programs.display, 'uVelocity', velA.texture, 0);
      useTexture(programs.display, 'uPalette', paletteTex, 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(autoTimer);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div className={`liquid-ether ${className}`} style={style}>
      <canvas ref={canvasRef} className="liquid-ether__canvas" />
    </div>
  );
}

