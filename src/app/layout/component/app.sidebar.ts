import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenu } from './app.menu';
import { LayoutService } from '../service/layout.service';

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

                <button
                    type="button"
                    class="sidebar-theme-btn"
                    (click)="toggleDarkMode()"
                    [title]="layoutService.isDarkTheme() ? 'Washa Hali Nyeupe' : 'Washa Hali ya Giza'"
                    aria-label="Badili mandhari"
                >
                    <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
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
            justify-content: space-between;
            gap: 12px;
        }
        .sidebar-user {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
        }
        .user-avatar-sakai {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #1a2b56;
            color: #ffffff;
            display: grid;
            place-items: center;
            font-weight: 700;
            font-size: 0.78rem;
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(26, 43, 86, 0.2);
        }
        .user-meta-sakai {
            min-width: 0;
        }
        .user-meta-sakai strong {
            display: block;
            font-size: 0.88rem;
            font-weight: 700;
            color: var(--text-color, #0f172a);
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .user-meta-sakai small {
            display: block;
            font-size: 0.72rem;
            color: var(--text-color-secondary, #64748b);
            font-weight: 500;
        }
        .sidebar-theme-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid var(--surface-border, #e2e8f0);
            background: var(--surface-card, #ffffff);
            color: var(--text-color, #334155);
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: all 0.18s ease;
            flex-shrink: 0;

            &:hover {
                background: rgba(43, 106, 255, 0.08);
                color: #2b6aff;
                border-color: rgba(43, 106, 255, 0.2);
                transform: scale(1.05);
            }

            i {
                font-size: 1rem;
            }
        }
    `]
})
export class AppSidebar {
    constructor(
        public el: ElementRef,
        public layoutService: LayoutService
    ) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
