import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule],
  template: `
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
          <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/" title="MchongoFasta - Rudi Tovuti Kuu">
          <img src="app_icon.png" alt="MchongoFasta Logo" class="topbar-brand-img" />
          <span class="brand-title-sakai">MchongoFasta</span>
        </a>
      </div>

      <div class="layout-topbar-actions">
        <div class="layout-config-menu">
          <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()" title="Dark/Light Mode">
            <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
          </button>
        </div>

        <div class="layout-topbar-user">
          <div class="user-avatar-sakai">HQ</div>
          <div class="user-meta-sakai">
            <strong>Admin Ops</strong>
            <small>Tanzania</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .topbar-brand-img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      margin-right: 8px;
      flex-shrink: 0;
      vertical-align: middle;
      box-shadow: 0 2px 8px rgba(43, 106, 255, 0.25);
    }
    .brand-title-sakai {
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .layout-topbar-user {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 12px;
      padding-left: 12px;
      border-left: 1px solid var(--surface-border);
    }
    .user-avatar-sakai {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #1a2b56;
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 0.75rem;
    }
    .user-meta-sakai strong {
      display: block;
      font-size: 0.82rem;
      line-height: 1.1;
    }
    .user-meta-sakai small {
      display: block;
      font-size: 0.7rem;
      color: var(--text-color-secondary);
    }
    .public-site-btn {
      color: #2b6aff;
    }
  `],
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
