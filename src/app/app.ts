import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApiService,
  DashboardCategory,
  DashboardJob,
  DashboardStat,
  DashboardWorker,
} from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly darkMode = signal(false);
  protected readonly selectedQueue = signal('All');
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly workers = signal<DashboardWorker[]>([]);
  protected readonly categories = signal<DashboardCategory[]>([]);

  protected readonly filteredJobs = computed(() => {
    const queue = this.selectedQueue();
    const jobs = this.jobs();

    if (queue === 'Matching') {
      return jobs.filter((job) => job.status === 'Matching');
    }

    if (queue === 'Review') {
      return jobs.filter((job) => job.status === 'Needs review');
    }

    return jobs;
  });

  ngOnInit(): void {
    this.api.loadDashboard().subscribe({
      next: (data) => {
        this.stats.set(data.stats);
        this.jobs.set(data.jobs);
        this.workers.set(data.workers);
        this.categories.set(data.categories);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not reach the MchongoFasta API. Check that the backend is running.');
        this.loading.set(false);
      },
    });
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value);
  }

  protected setQueue(queue: string): void {
    this.selectedQueue.set(queue);
  }
}
