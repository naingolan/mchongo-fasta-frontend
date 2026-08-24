import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

@Component({
  selector: 'app-network-particles',
  standalone: true,
  template: `<canvas #canvas class="particles" aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        display: block;
        overflow: hidden;
      }

      .particles {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class NetworkParticles implements OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private particles: Particle[] = [];
  private raf = 0;
  private width = 0;
  private height = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private reducedMotion = false;
  private readonly onResize = () => this.resize();
  private readonly onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };
  private readonly onMouseLeave = () => {
    this.mouseX = -9999;
    this.mouseY = -9999;
  };

  constructor() {
    afterNextRender(() => {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.setup();
      if (!this.reducedMotion) {
        this.loop();
      } else {
        this.drawStatic();
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
  }

  private setup(): void {
    this.resize();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseleave', this.onMouseLeave);
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = Math.max(window.innerHeight * 1.15, 900);
    canvas.width = Math.floor(this.width * dpr);
    canvas.height = Math.floor(this.height * dpr);
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(90, Math.floor((this.width * this.height) / 16000));
    this.particles = Array.from({ length: count }, () => this.makeParticle());
  }

  private makeParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2.2 + 1.1,
    };
  }

  private loop = (): void => {
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private drawStatic(): void {
    this.draw(true);
  }

  private draw(frozen = false): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const linkDist = Math.min(160, this.width * 0.14);
    const mouseDist = 180;

    for (const p of this.particles) {
      if (!frozen) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseDist && dist > 1) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 1.2) {
            p.vx = (p.vx / speed) * 1.2;
            p.vy = (p.vy / speed) * 1.2;
          }
        }
      }

      ctx.beginPath();
      ctx.fillStyle = 'rgba(43, 106, 255, 0.75)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow on each node
      ctx.beginPath();
      ctx.fillStyle = 'rgba(91, 140, 255, 0.18)';
      ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > linkDist) continue;

        const alpha = (1 - dist / linkDist) * 0.45;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(43, 106, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Spider lines to cursor
      const p = this.particles[i];
      const mdx = this.mouseX - p.x;
      const mdy = this.mouseY - p.y;
      const md = Math.hypot(mdx, mdy);
      if (md < mouseDist) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(43, 106, 255, ${(1 - md / mouseDist) * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(this.mouseX, this.mouseY);
        ctx.stroke();
      }
    }
  }
}
