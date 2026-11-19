import React, { useEffect, useRef } from 'react';
import weddingBg from '../assets/images/casamiento_de_flor.jpeg';

interface FallingFlora {
  id: number;
  kind: 'blossom' | 'petal' | 'eucalyptus' | 'olive';
  x: number;
  y: number;
  size: number;
  speedY: number;
  swingAngle: number;
  swingSpeed: number;
  swingAmp: number;
  rotation: number;
  rotSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  alpha: number;
  tint: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftAngle: number;
  driftSpeed: number;
  driftAmp: number;
  wobblePhase: number;
  wobbleSpeed: number;
  alpha: number;
}

interface PopParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  decay: number;
}

interface Firefly {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
}

export const BotanicalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. FALLING FLOWERS & LEAVES (Delicado y bien visible sobre el fondo champagne/nude)
    const floraList: FallingFlora[] = [];
    const floraCount = Math.max(15, Math.min(24, Math.floor(width / 55)));

    const floraKinds: ('blossom' | 'petal' | 'eucalyptus' | 'olive')[] = [
      'petal',
      'petal',
      'petal',
      'blossom',
      'blossom',
      'eucalyptus',
      'olive',
    ];

    const tints = ['#E6D5BE', '#D6BE9B', '#C7A675'];

    for (let i = 0; i < floraCount; i++) {
      floraList.push({
        id: i,
        kind: floraKinds[Math.floor(Math.random() * floraKinds.length)],
        x: Math.random() * width,
        y: Math.random() * (height + 60) - 30,
        size: Math.random() * 6 + 9.5, // 9.5px a 15.5px para que se aprecien con claridad
        speedY: Math.random() * 0.48 + 0.35,
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.015 + 0.008,
        swingAmp: Math.random() * 0.85 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.016,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.022 + 0.01,
        alpha: Math.random() * 0.28 + 0.56, // Mayor presencia y nitidez
        tint: tints[Math.floor(Math.random() * tints.length)],
      });
    }

    // 2. ETHEREAL WEDDING BUBBLES / PEARL ORBS
    const bubbles: Bubble[] = [];
    const bubbleCount = Math.max(10, Math.min(15, Math.floor(width / 95)));

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * (height + 80),
        radius: Math.random() * 9 + 7.5, // 7.5px a 16.5px
        speedY: Math.random() * 0.42 + 0.25,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.014 + 0.006,
        driftAmp: Math.random() * 0.55 + 0.3,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.025 + 0.015,
        alpha: Math.random() * 0.24 + 0.44, // Contornos nacarados y dorados más visibles
      });
    }

    // 3. POP SPARKLES (Destellos al tocar una burbuja)
    const popParticles: PopParticle[] = [];

    const triggerBubblePop = (x: number, y: number) => {
      const pCount = 8;
      for (let i = 0; i < pCount; i++) {
        const ang = (Math.PI * 2 * i) / pCount + (Math.random() - 0.5) * 0.3;
        const spd = Math.random() * 1.6 + 0.9;
        popParticles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: Math.random() * 1.4 + 1.2,
          alpha: 0.95,
          decay: Math.random() * 0.025 + 0.02,
          color: i % 2 === 0 ? '#9E7B42' : '#D4AF6A',
        });
      }
    };

    // 4. FIREFLY BOKEH (Destellos dorados y cálidos luminosos)
    const fireflies: Firefly[] = [];
    const fireflyCount = Math.min(28, Math.max(18, Math.floor((width * height) / 42000)));
    const colors = [
      'rgba(179, 144, 84, ',
      'rgba(158, 123, 66, ',
      'rgba(212, 175, 106, ',
      'rgba(199, 168, 125, ',
    ];

    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 1.8, // Más visibles con halo suave
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.28,
        targetAlpha: Math.random() * 0.45 + 0.35,
        speedX: (Math.random() - 0.5) * 0.24,
        speedY: (Math.random() - 0.5) * 0.22 - 0.05,
        pulseSpeed: Math.random() * 0.012 + 0.005,
      });
    }

    // Interacción suave con las burbujas al tocar o hacer clic
    const handlePointerDown = (e: PointerEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const dist = Math.hypot(b.x - clickX, b.y - clickY);
        if (dist <= b.radius * 1.8) {
          triggerBubblePop(b.x, b.y);
          // Reinicia discretamente abajo
          b.y = height + b.radius + 15;
          b.x = Math.random() * width;
          break;
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // FUNCIONES DE DIBUJO ULTRA DELICADAS
    const drawBlossom = (f: FallingFlora) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.scale(1, Math.cos(f.flipAngle));

      const r = f.size;
      const petals = 5;

      // 5 Pétalos translúcidos color marfil/blanco cálido
      for (let p = 0; p < petals; p++) {
        const angle = (Math.PI * 2 * p) / petals;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-r * 0.4, -r * 0.5, -r * 0.3, -r * 1.1, 0, -r);
        ctx.bezierCurveTo(r * 0.3, -r * 1.1, r * 0.4, -r * 0.5, 0, 0);

        const grad = ctx.createLinearGradient(0, 0, 0, -r);
        grad.addColorStop(0, `rgba(235, 218, 194, ${f.alpha * 0.92})`);
        grad.addColorStop(0.55, `rgba(248, 241, 230, ${f.alpha * 0.88})`);
        grad.addColorStop(1, `rgba(199, 173, 136, ${f.alpha * 0.78})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(158, 123, 66, ${f.alpha * 0.48})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      // Centro dorado cálido
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(158, 123, 66, ${f.alpha * 0.95})`;
      ctx.fill();

      ctx.restore();
    };

    const drawPetal = (f: FallingFlora) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.scale(1, Math.cos(f.flipAngle));

      const w = f.size * 0.65;
      const h = f.size * 1.25;

      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.bezierCurveTo(w * 1.1, -h * 0.25, w * 1.0, h * 0.35, 0, h * 0.5);
      ctx.bezierCurveTo(-w * 1.0, h * 0.35, -w * 1.1, -h * 0.25, 0, -h * 0.5);

      const grad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      grad.addColorStop(0, `rgba(248, 241, 231, ${f.alpha * 0.92})`);
      grad.addColorStop(0.55, `rgba(227, 206, 179, ${f.alpha * 0.86})`);
      grad.addColorStop(1, `rgba(186, 152, 102, ${f.alpha * 0.75})`);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = `rgba(158, 123, 66, ${f.alpha * 0.38})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Fina nervadura central
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.38);
      ctx.quadraticCurveTo(w * 0.15, 0, 0, h * 0.35);
      ctx.strokeStyle = `rgba(158, 123, 66, ${f.alpha * 0.45})`;
      ctx.lineWidth = 0.55;
      ctx.stroke();

      ctx.restore();
    };

    const drawLeaf = (f: FallingFlora, isEucalyptus: boolean) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.scale(1, Math.cos(f.flipAngle));

      const w = isEucalyptus ? f.size * 0.8 : f.size * 0.38;
      const h = f.size * 1.28;

      ctx.beginPath();
      if (isEucalyptus) {
        ctx.moveTo(0, -h * 0.5);
        ctx.bezierCurveTo(w * 1.1, -h * 0.2, w * 1.05, h * 0.35, 0, h * 0.5);
        ctx.bezierCurveTo(-w * 1.05, h * 0.35, -w * 1.1, -h * 0.2, 0, -h * 0.5);
      } else {
        ctx.moveTo(0, -h * 0.55);
        ctx.quadraticCurveTo(w * 1.05, 0, 0, h * 0.55);
        ctx.quadraticCurveTo(-w * 1.05, 0, 0, -h * 0.55);
      }

      const grad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      if (isEucalyptus) {
        grad.addColorStop(0, `rgba(243, 232, 216, ${f.alpha * 0.85})`);
        grad.addColorStop(0.5, `rgba(209, 189, 164, ${f.alpha * 0.78})`);
        grad.addColorStop(1, `rgba(179, 144, 84, ${f.alpha * 0.65})`);
      } else {
        grad.addColorStop(0, `rgba(232, 217, 198, ${f.alpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(199, 178, 153, ${f.alpha * 0.75})`);
        grad.addColorStop(1, `rgba(158, 123, 66, ${f.alpha * 0.65})`);
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Fina línea de tallo dorado
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.42);
      ctx.lineTo(0, h * 0.44);
      ctx.strokeStyle = `rgba(184, 154, 88, ${f.alpha * 0.4})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawBubble = (b: Bubble) => {
      ctx.save();
      ctx.translate(b.x, b.y);

      // Suave bamboleo elástico mínimo
      const wobbleX = 1 + Math.sin(b.wobblePhase) * 0.05;
      const wobbleY = 1 - Math.sin(b.wobblePhase) * 0.05;
      ctx.scale(wobbleX, wobbleY);

      const r = b.radius;

      // 1. Fino contorno irisado en champagne y bronce
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      const strokeGrad = ctx.createLinearGradient(-r, -r, r, r);
      strokeGrad.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 0.9})`);
      strokeGrad.addColorStop(0.35, `rgba(179, 144, 84, ${b.alpha * 0.85})`);
      strokeGrad.addColorStop(0.7, `rgba(158, 123, 66, ${b.alpha * 0.72})`);
      strokeGrad.addColorStop(1, `rgba(227, 206, 179, ${b.alpha * 0.85})`);
      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = Math.max(0.95, r * 0.08);
      ctx.stroke();

      // 2. Interior nacarado translúcido
      const bodyGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
      bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 0.28})`);
      bodyGrad.addColorStop(0.7, `rgba(179, 144, 84, ${b.alpha * 0.14})`);
      bodyGrad.addColorStop(1, `rgba(199, 178, 153, ${b.alpha * 0.35})`);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // 3. Destello de brillo superior izquierdo
      ctx.beginPath();
      ctx.ellipse(-r * 0.38, -r * 0.38, r * 0.32, r * 0.14, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.85})`;
      ctx.fill();

      ctx.restore();
    };

    // RENDER LOOP
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Fireflies doradas luminosas
      fireflies.forEach((f) => {
        f.x += f.speedX;
        f.y += f.speedY;

        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < -10) f.y = height + 10;
        if (f.y > height + 10) f.y = -10;

        f.alpha += (f.targetAlpha - f.alpha) * f.pulseSpeed;
        if (Math.abs(f.alpha - f.targetAlpha) < 0.04) {
          f.targetAlpha = Math.random() * 0.45 + 0.35;
        }

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 3.4);
        grad.addColorStop(0, f.color + Math.min(0.95, f.alpha * 1.1) + ')');
        grad.addColorStop(0.4, f.color + f.alpha * 0.55 + ')');
        grad.addColorStop(1, f.color + '0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 3.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // B. Flores y pétalos cayendo lentamente
      floraList.forEach((f) => {
        f.y += f.speedY;
        f.swingAngle += f.swingSpeed;
        f.x += Math.sin(f.swingAngle) * f.swingAmp;
        f.rotation += f.rotSpeed;
        f.flipAngle += f.flipSpeed;

        if (f.y > height + 35) {
          f.y = -30;
          f.x = Math.random() * width;
        }
        if (f.x < -30) f.x = width + 20;
        if (f.x > width + 30) f.x = -20;

        if (f.kind === 'blossom') {
          drawBlossom(f);
        } else if (f.kind === 'petal') {
          drawPetal(f);
        } else if (f.kind === 'eucalyptus') {
          drawLeaf(f, true);
        } else {
          drawLeaf(f, false);
        }
      });

      // C. Burbujas con movimiento pausado y armónico
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.driftAngle += b.driftSpeed;
        b.x += Math.sin(b.driftAngle) * b.driftAmp;
        b.wobblePhase += b.wobbleSpeed;

        if (b.y < -b.radius - 15) {
          b.y = height + b.radius + Math.random() * 25;
          b.x = Math.random() * width;
        }
        if (b.x < -25) b.x = width + 15;
        if (b.x > width + 25) b.x = -15;

        drawBubble(b);
      });

      // D. Partículas de destello
      for (let i = popParticles.length - 1; i >= 0; i--) {
        const p = popParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= p.decay;

        if (p.alpha <= 0.02) {
          popParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F3EEE5]">
      {/* User Uploaded Champagne Silk & Crystal Floral Wedding Background */}
      <img
        src={weddingBg}
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      />

      {/* Very subtle warm veil to preserve brightness while harmonizing text contrast */}
      <div className="absolute inset-0 bg-[#FAF8F3]/5 pointer-events-none" />

      {/* Canvas with Delicate Falling Flowers, Petals, Leaves, and Floating Moving Bubbles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
