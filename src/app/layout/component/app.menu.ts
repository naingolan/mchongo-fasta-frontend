import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul>
  `,
})
export class AppMenu implements OnInit {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            svg: 'overview',
            routerLink: ['/admin'],
          },
          {
            label: 'Wafanyakazi',
            icon: 'pi pi-fw pi-users',
            svg: 'workers',
            routerLink: ['/admin/workers'],
          },
          {
            label: 'Michongo',
            icon: 'pi pi-fw pi-briefcase',
            svg: 'jobs',
            routerLink: ['/admin/jobs'],
          },
          {
            label: 'Uhakiki wa NIDA',
            icon: 'pi pi-fw pi-shield',
            svg: 'verifications',
            routerLink: ['/admin/verifications'],
          },
          {
            label: 'Mapato na Malipo',
            icon: 'pi pi-fw pi-wallet',
            svg: 'finances',
            routerLink: ['/admin/finances'],
          },
        ],
      },
    ];
  }
}
