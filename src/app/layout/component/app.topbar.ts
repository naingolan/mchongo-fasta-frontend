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
          <div class="brand-badge-sakai">
            <svg width="18" height="22" viewBox="0 0 1005 1407" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M292.945 721.123C297.247 711.333 300.886 699.042 304.586 688.675L331.756 610.933L442.367 295.127L489.78 159.03C495.738 141.318 501.816 123.646 508.015 106.016C510.621 98.6398 513.246 91.2682 515.952 83.9316C516.472 81.6913 519.686 79.082 521.964 79.0785C535.794 79.0545 549.593 79.3609 563.408 78.4829C567.81 78.2033 572.394 78.2363 576.818 78.2115C626.31 78.1964 675.799 77.473 725.268 76.0426C749.297 75.4477 773.299 74.1321 797.411 74.7792C803.387 74.94 816.934 73.9789 822.127 75.1894L822.244 76.257C820.726 76.0763 821.193 75.9849 819.771 76.3099C815.745 84.4427 813.121 93.0221 809.164 101.062C800.468 118.699 792.451 136.624 784.139 154.391L696.78 340.205L660.129 417.957C656.427 425.617 641.362 454.709 640.107 460.478C643.013 462.779 706.707 454.55 718.206 453.364L851.068 439.282C862.691 437.97 874.026 436.545 885.745 435.74C890.135 435.438 896.049 433.206 900.397 433.866L900.762 434.597C893.507 445.511 886.617 457.569 879.775 468.846L842.275 530.643L741.349 696.342L485.585 1116.48L430.869 1205.59C418.236 1226.41 400.836 1257.42 386.474 1278.31C386.919 1277.66 384.176 1280.45 384.536 1280.09C385.758 1284.99 351.527 1332.65 348.431 1343.41L347.702 1343.88C346.967 1342.38 347.303 1339.77 347.844 1338.22C350.802 1330.65 354.413 1310.74 356.181 1302.23C359.194 1287.74 362.519 1273.34 365.66 1258.87L406.736 1068.63L464.603 801.64L481.708 722.318C483.702 712.7 487.684 695.889 488.784 686.607L390.215 703.075C383.912 704.181 377.516 705.857 371.258 706.901L315.824 716.616C308.031 718.052 300.569 718.787 292.945 721.123Z" fill="white"/>
            </svg>
          </div>
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
