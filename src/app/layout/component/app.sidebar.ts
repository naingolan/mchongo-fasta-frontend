import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenu],
    template: `
        <div class="layout-sidebar">
            <div class="sidebar-menu-wrapper">
                <app-menu></app-menu>
            </div>

            <div class="sidebar-footer">
                <div class="sidebar-user">
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
        .sidebar-menu-wrapper {
            flex: 1;
            overflow-y: auto;
            min-height: 0;
            padding-right: 4px;
        }
        .sidebar-footer {
            margin-top: auto;
            padding-top: 1rem;
            border-top: 1px solid var(--surface-border, #e2e8f0);
            display: flex;
            align-items: center;
        }
        .sidebar-user {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
        }
        .user-avatar-sakai {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #2b6aff;
            color: #ffffff;
            display: grid;
            place-items: center;
            font-weight: 800;
            font-size: 0.85rem;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(43, 106, 255, 0.35);
        }
        .user-meta-sakai {
            min-width: 0;
        }
        .user-meta-sakai strong {
            display: block;
            font-size: 0.92rem;
            font-weight: 700;
            color: var(--text-color, #0f172a);
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .user-meta-sakai small {
            display: block;
            font-size: 0.75rem;
            color: var(--text-color-secondary, #64748b);
            font-weight: 500;
        }
    `]
})
export class AppSidebar {
    constructor(public el: ElementRef) {}
}
