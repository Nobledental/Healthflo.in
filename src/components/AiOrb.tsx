"use client";

import React, { useEffect, useRef } from "react";

export type OrbPreset = "Aurora" | "Ember" | "Toxic" | "Ice" | "Plasma" | "Ghost" | "Daylight";

interface AiOrbProps {
  preset?: OrbPreset;
  className?: string;
  isPaused?: boolean;
  morphProgress?: number;
}

const PRESETS: Record<string, any> = {
  Aurora: { radius: 0.30, deform: 0.36, frequency: 2.0, morphSpeed: 1.30, rotSpeed: 0.12, specular: 1.0, shininess: 140, glowStrength: 0.70, colorBlue: "#4099FF", colorMagenta: "#E633BF", glowA: "#33B5FF", glowB: "#E24DD0", liquidSpeed: 0.50, liquidScale: 2.20, liquidBright: 1.00, filament: 1.40, core: 0.30, background: "#f8fafc", blend: 1.0 },
  Ember: { radius: 0.32, deform: 0.30, frequency: 2.1, morphSpeed: 1.40, rotSpeed: 0.10, specular: 1.2, shininess: 120, glowStrength: 0.85, colorBlue: "#FFC24D", colorMagenta: "#FF3B2F", glowA: "#FF7A18", glowB: "#FF2D55", liquidSpeed: 0.75, liquidScale: 2.40, liquidBright: 1.10, filament: 1.90, core: 0.40, background: "#f8fafc", blend: 1.0 },
  Toxic: { radius: 0.28, deform: 0.44, frequency: 2.3, morphSpeed: 1.50, rotSpeed: 0.18, specular: 1.0, shininess: 160, glowStrength: 0.75, colorBlue: "#9CFF4D", colorMagenta: "#00E5A0", glowA: "#57FF3C", glowB: "#00FFC8", liquidSpeed: 0.85, liquidScale: 2.60, liquidBright: 1.00, filament: 1.70, core: 0.25, background: "#f8fafc", blend: 1.0 },
  Ice: { radius: 0.34, deform: 0.20, frequency: 1.8, morphSpeed: 1.18, rotSpeed: 0.08, specular: 1.5, shininess: 210, glowStrength: 0.60, colorBlue: "#ccdcef", colorMagenta: "#efdfec", glowA: "#68c3f7", glowB: "#68c3f7", liquidSpeed: 0.32, liquidScale: 2.00, liquidBright: 0.90, filament: 1.00, core: 0.35, background: "#f8fafc", blend: 1.0 },
  Plasma: { radius: 0.28, deform: 0.40, frequency: 2.4, morphSpeed: 1.60, rotSpeed: 0.20, specular: 1.0, shininess: 130, glowStrength: 0.95, colorBlue: "#B14DFF", colorMagenta: "#FF2DA0", glowA: "#9B5CFF", glowB: "#FF3DBE", liquidSpeed: 1.00, liquidScale: 2.80, liquidBright: 1.20, filament: 2.10, core: 0.30, background: "#f8fafc", blend: 1.0 },
  Ghost: { radius: 0.32, deform: 0.30, frequency: 2.0, morphSpeed: 1.25, rotSpeed: 0.10, specular: 1.6, shininess: 220, glowStrength: 0.55, colorBlue: "#C2CBE6", colorMagenta: "#8893B5", glowA: "#AEB8D8", glowB: "#6E7799", liquidSpeed: 0.45, liquidScale: 2.20, liquidBright: 0.85, filament: 1.20, core: 0.20, background: "#f8fafc", blend: 1.0 },
  Daylight: { radius: 0.30, deform: 0.34, frequency: 2.0, morphSpeed: 1.30, rotSpeed: 0.12, specular: 1.0, shininess: 150, glowStrength: 0.80, colorBlue: "#2D6CFF", colorMagenta: "#B43CF0", glowA: "#3A82FF", glowB: "#A84DFF", liquidSpeed: 0.50, liquidScale: 2.20, liquidBright: 1.05, filament: 1.50, core: 0.30, background: "#f8fafc", blend: 1.0 },
};

const VERT = `#version 300 es
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2  u_res;
uniform float u_morph;
uniform float u_radius;
uniform float u_deform;
uniform float u_freq;
uniform float u_morphSpeed;
uniform float u_rotSpeed;
uniform float u_specular;
uniform float u_shininess;
uniform float u_glowStrength;
uniform vec3  u_colBlue;
uniform vec3  u_colMag;
uniform vec3  u_glowA;
uniform vec3  u_glowB;
uniform float u_liquidSpeed;
uniform float u_liquidScale;
uniform float u_liquidBright;
uniform float u_filament;
uniform float u_core;
uniform vec3  u_bg;
uniform float u_blend;   

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float blobField(vec3 p){
  float t = u_time * u_morphSpeed;
  float f = u_freq;
  float d = 0.0;
  d += sin(p.x * 2.6 * f + t * 1.00);
  d += sin(p.y * 2.9 * f - t * 0.80 + 1.3);
  d += sin(p.z * 3.2 * f + t * 1.20 + 2.7);
  d += sin((p.x + p.z) * 2.2 * f - t * 0.90 + 4.1);
  d += sin((p.y - p.x) * 2.4 * f + t * 0.70 + 0.6);
  return d * 0.2;
}

float mapBlob(vec3 p){
  float morph = u_morph;
  
  // Taper the top for a water drop shape
  p.y += morph * 0.15; // Shift down slightly when dropping
  float taper = mix(1.0, 1.0 - smoothstep(-0.3, 0.8, p.y) * 0.7, morph);
  p.x /= taper;
  p.z /= taper;

  vec3 np = p;
  float t = u_time * u_rotSpeed;
  np.xy *= rot(t * 0.7);
  np.yz *= rot(t * 0.5);
  float r = u_radius + u_deform * blobField(np);
  
  return (length(p) - r) * min(1.0, taper);              
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    mapBlob(p + e.xyy) - mapBlob(p - e.xyy),
    mapBlob(p + e.yxy) - mapBlob(p - e.yxy),
    mapBlob(p + e.yyx) - mapBlob(p - e.yyx)));
}

float hash13(vec3 p3){ p3 = fract(p3 * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float vnoise3(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
                 mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                 mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3(vec3 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a * vnoise3(p); p *= 2.03; a *= 0.5; } return v; }

float liquid(vec3 p){
  float t = u_time * u_liquidSpeed;
  p *= u_liquidScale;
  p.xy *= rot(t * 0.15);
  p.yz *= rot(t * 0.10);
  vec3 w = vec3(fbm3(p + t * 0.2), fbm3(p + vec3(4.3, 1.2, -t * 0.15)), fbm3(p.zxy + vec3(7.7, 2.3, t * 0.10)));
  return fbm3(p + 1.8 * w);
}

void main(){
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(p, -1.8));

  float t = 0.0;
  bool hit = false;
  vec3 pos = ro;
  float minD = 1e3;
  for (int i = 0; i < 160; i++) {
    pos = ro + rd * t;
    float d = mapBlob(pos);
    minD = min(minD, d);
    if (d < 0.001) { hit = true; break; }
    t += d * 0.40;
    if (t > 6.0) break;
  }

    vec3 E = vec3(0.0);   
    float alpha = 0.0;
    vec3 inkCol = vec3(0.0);

    if (hit) {
      alpha = 1.0;
      vec3 baseColor = mix(vec3(0.9, 0.95, 1.0), u_colBlue, 0.2); 
      E = baseColor * 0.4;

      vec3 n = calcNormal(pos);
      vec3 v = -rd;
      float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);

      vec3 rp = pos + rd * 0.04;
      float trans = 1.0;
      vec3 inner = vec3(0.0);
      for (int k = 0; k < 10; k++) {
        float raw = liquid(rp);
        float dens = smoothstep(0.30, 0.70, raw);             
        float fil = pow(1.0 - abs(2.0 * raw - 1.0), 5.0);     
        vec3 c = mix(u_colMag, u_colBlue, 0.5 + 0.5 * sin(raw * 6.0 + u_time * 0.3 + rp.y * 2.5));
        vec3 emit = c * dens * 0.55 + c * fil * u_filament + vec3(1.0) * pow(fil, 3.0) * u_filament * 0.4;
        emit += u_colBlue * smoothstep(0.5, 0.0, length(rp)) * u_core;   
        inner += trans * emit * 0.17;
        trans *= 0.84;
        rp += rd * 0.11;
        if (length(rp) > 1.0) break;
      }
      E += inner * (1.0 - fres * 0.6) * u_liquidBright;       

      vec3 rim = mix(u_colMag, u_colBlue, 0.5 + 0.5 * (n.x * 0.7 + n.y * 0.45));
      E += rim * fres * 1.5;
      // Flame-like blue on the border of the orb
      vec3 flameBlue = vec3(0.1, 0.6, 1.0);
      float flameNoise = fbm3(pos * 2.5 - vec3(0.0, u_time, 0.0));
      E += flameBlue * fres * (2.0 + flameNoise * 2.0);

      vec3 l1 = normalize(vec3(0.6, 0.85, 0.6));
      vec3 l2 = normalize(vec3(-0.7, 0.25, 0.55));
      vec3 h1 = normalize(l1 + v);
      vec3 h2 = normalize(l2 + v);
      E += vec3(1.0) * pow(max(dot(n, h1), 0.0), u_shininess) * 1.3 * u_specular;
      E += vec3(0.8, 0.9, 1.0) * pow(max(dot(n, h2), 0.0), u_shininess * 0.45) * 0.6 * u_specular;
      
      inkCol = E / (1.0 + E * 0.3);
    } else {
      float g = exp(-minD * 5.5);
      float ang = atan(rd.y, rd.x);
      vec3 gc = mix(u_glowA, u_glowB, 0.5 + 0.5 * sin(ang * 3.0 + u_time * 0.5));
      vec3 glowE = (gc * g * 1.4 + vec3(0.6, 0.8, 1.0) * pow(g, 3.0) * 0.7) * u_glowStrength;
      
      // We force the glow color to be purely white so it never darkens the background
      inkCol = vec3(1.0);
      alpha = clamp(max(glowE.r, max(glowE.g, glowE.b)), 0.0, 1.0) * 1.8;
    }

    // Proper premultiplied alpha output for WebGL canvas over HTML
    fragColor = vec4(clamp(inkCol, 0.0, 1.0) * alpha, clamp(alpha, 0.0, 1.0)); 
  }`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function AiOrb({ preset = "Aurora", className = "", isPaused = false, morphProgress = 0.0 }: AiOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true });
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }

    function compile(type: number, src: string): WebGLShader {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(sh) || "shader compile failed");
      }
      return sh;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program) || "link failed");
    }
    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const U = {
      time: gl.getUniformLocation(program, "u_time"),
      res: gl.getUniformLocation(program, "u_res"),
      morph: gl.getUniformLocation(program, "u_morph"),
      radius: gl.getUniformLocation(program, "u_radius"),
      deform: gl.getUniformLocation(program, "u_deform"),
      freq: gl.getUniformLocation(program, "u_freq"),
      morphSpeed: gl.getUniformLocation(program, "u_morphSpeed"),
      rotSpeed: gl.getUniformLocation(program, "u_rotSpeed"),
      specular: gl.getUniformLocation(program, "u_specular"),
      shininess: gl.getUniformLocation(program, "u_shininess"),
      glowStrength: gl.getUniformLocation(program, "u_glowStrength"),
      colBlue: gl.getUniformLocation(program, "u_colBlue"),
      colMag: gl.getUniformLocation(program, "u_colMag"),
      glowA: gl.getUniformLocation(program, "u_glowA"),
      glowB: gl.getUniformLocation(program, "u_glowB"),
      liquidSpeed: gl.getUniformLocation(program, "u_liquidSpeed"),
      liquidScale: gl.getUniformLocation(program, "u_liquidScale"),
      liquidBright: gl.getUniformLocation(program, "u_liquidBright"),
      filament: gl.getUniformLocation(program, "u_filament"),
      core: gl.getUniformLocation(program, "u_core"),
      bg: gl.getUniformLocation(program, "u_bg"),
      blend: gl.getUniformLocation(program, "u_blend"),
    };

    let dpr = 1;
    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    window.addEventListener("resize", resize);
    resize();

    let startTime = performance.now();

    function drawOrb(x: number, y: number, w: number, h: number, v: any, time: number, morph: number) {
      if (!gl) return;
      gl.viewport(x, y, w, h);
      gl.uniform1f(U.time, time);
      gl.uniform2f(U.res, w, h);
      gl.uniform1f(U.morph, morph);
      gl.uniform1f(U.radius, v.radius);
      gl.uniform1f(U.deform, v.deform);
      gl.uniform1f(U.freq, v.frequency);
      gl.uniform1f(U.morphSpeed, v.morphSpeed);
      gl.uniform1f(U.rotSpeed, v.rotSpeed);
      gl.uniform1f(U.specular, v.specular);
      gl.uniform1f(U.shininess, v.shininess);
      gl.uniform1f(U.glowStrength, v.glowStrength);
      gl.uniform3fv(U.colBlue, hexToRgb(v.colorBlue));
      gl.uniform3fv(U.colMag, hexToRgb(v.colorMagenta));
      gl.uniform3fv(U.glowA, hexToRgb(v.glowA));
      gl.uniform3fv(U.glowB, hexToRgb(v.glowB));
      gl.uniform1f(U.liquidSpeed, v.liquidSpeed);
      gl.uniform1f(U.liquidScale, v.liquidScale);
      gl.uniform1f(U.liquidBright, v.liquidBright);
      gl.uniform1f(U.filament, v.filament);
      gl.uniform1f(U.core, v.core);
      gl.uniform3fv(U.bg, hexToRgb(v.background));
      gl.uniform1f(U.blend, v.blend);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function frame(now: number) {
      if (isPaused) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      
      resize();
      const time = (now - startTime) * 0.001;

      if (gl && canvas) {
        // Transparent clear
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const v = PRESETS[preset] || PRESETS["Aurora"];
        drawOrb(0, 0, canvas.width, canvas.height, v, time, morphProgress);
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [preset, isPaused, morphProgress]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block ${className}`} 
    />
  );
}
