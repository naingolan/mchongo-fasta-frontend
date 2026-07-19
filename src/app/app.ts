import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService, DashboardJob, DashboardStat } from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly loading = signal(true);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly loginOpen = signal(false);

  protected readonly fallbackJobs: DashboardJob[] = [
    {
      id: '1',
      title: 'House cleaning',
      category: 'Domestic',
      area: 'Mikocheni',
      budget: 'TZS 35,000',
      status: 'Matching',
      applicants: 12,
    },
    {
      id: '2',
      title: 'Errand delivery',
      category: 'Logistics',
      area: 'Kariakoo',
      budget: 'TZS 18,000',
      status: 'Matching',
      applicants: 9,
    },
    {
      id: '3',
      title: 'Office painting',
      category: 'Technical',
      area: 'Masaki',
      budget: 'TZS 95,000',
      status: 'In progress',
      applicants: 4,
    },
  ];

  ngOnInit(): void {
    this.api.loadDashboard().subscribe({
      next: (data) => {
        this.jobs.set(data.jobs.slice(0, 3));
        this.stats.set(data.stats);
        this.loading.set(false);
      },
      error: () => {
        this.jobs.set(this.fallbackJobs);
        this.loading.set(false);
      },
    });
  }

  protected openLogin(): void {
    this.loginOpen.set(true);
  }

  protected closeLogin(): void {
    this.loginOpen.set(false);
  }

  protected previewJobs(): DashboardJob[] {
    return this.jobs().length ? this.jobs() : this.fallbackJobs;
  }
}
