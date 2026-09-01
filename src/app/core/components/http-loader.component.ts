import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-http-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.isLoading()) {
      <div class="global-http-loader">
        <div class="loader-bar-track">
          <div class="loader-bar-fill"></div>
        </div>

        <div class="loader-floating-badge animate-fadein">
          <div class="loader-spinner"></div>
          <span>Inapakia taarifa...</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .global-http-loader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
      pointer-events: none;
    }

    .loader-bar-track {
      width: 100%;
      height: 3.5px;
      background: rgba(43, 106, 255, 0.15);
      overflow: hidden;
      position: relative;
    }

    .loader-bar-fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        rgba(43, 106, 255, 0) 0%,
        #2b6aff 30%,
        #93c5fd 50%,
        #2b6aff 70%,
        rgba(43, 106, 255, 0) 100%
      );
      background-size: 200% 100%;
      animation: loaderSlide 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      box-shadow: 0 0 14px rgba(43, 106, 255, 0.9), 0 0 4px #2b6aff;
    }

    @keyframes loaderSlide {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .loader-floating-badge {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(10px);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 99px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
      z-index: 99999;
    }

    .loader-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.25);
      border-top-color: #2b6aff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes fadein {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class HttpLoaderComponent {
  public readonly loadingService = inject(LoadingService);
}
