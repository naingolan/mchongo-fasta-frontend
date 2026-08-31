import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  template: `
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
          <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/" title="MchongoFasta - Rudi Tovuti Kuu">
          <div class="brand-badge-sakai">MF</div>
          <span class="brand-title-sakai">MchongoFasta</span>
        </a>
      </div>

      <div class="layout-topbar-actions">
        <div class="layout-config-menu">
          <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()" title="Dark/Light Mode">
            <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
          </button>

          <div class="relative">
            <button
              class="layout-topbar-action layout-topbar-action-highlight"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
              title="Theme Settings"
            >
              <i class="pi pi-palette"></i>
            </button>
            <app-configurator />
          </div>
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
    .brand-badge-sakai {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #2b6aff, #1a2b56);
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 0.85rem;
      margin-right: 8px;
    }
    .brand-title-sakai {
      font-weight: 800;
      font-size: 1.15rem;
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
