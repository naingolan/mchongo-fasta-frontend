import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../environments/environment';

export type JobStatus = 'Matching' | 'In progress' | 'Needs review';

export interface DashboardJob {
  id: string;
  title: string;
  category: string;
  area: string;
  budget: string;
  status: JobStatus;
  applicants: number;
}

export interface DashboardWorker {
  id: string;
  name: string;
  skill: string;
  rating: string;
  jobs: number;
  status: 'Verified' | 'Reviewing' | 'Flagged';
}

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
}

export interface DashboardCategory {
  name: string;
  value: number;
}

export interface DashboardData {
  stats: DashboardStat[];
  jobs: DashboardJob[];
  workers: DashboardWorker[];
  categories: DashboardCategory[];
}

interface AnalyticsResponse {
  activeUsers: number;
  matchedJobs: number;
  monthlyRevenueTzs: number;
  verifiedWorkers: number;
  categories: Array<{ name: string; demandPercent: number }>;
}

interface JobsResponse {
  jobs: Array<{
    id: string;
    title: string;
    category: string;
    area: string;
    budgetTzs: number;
    status: string;
    applicants: number;
  }>;
}

interface WorkersResponse {
  workers: Array<{
    id: string;
    name: string;
    category: string;
    rating: number;
    completedJobs: number;
    verified: boolean;
  }>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/$/, '');

  loadDashboard(): Observable<DashboardData> {
    return forkJoin({
      analytics: this.http.get<AnalyticsResponse>(this.url('/api/analytics')),
      jobs: this.http.get<JobsResponse>(this.url('/api/jobs')),
      workers: this.http.get<WorkersResponse>(this.url('/api/workers')),
    }).pipe(
      map(({ analytics, jobs, workers }) => ({
        stats: [
          {
            label: 'Active users',
            value: this.formatCompact(analytics.activeUsers),
            delta: '+18%',
          },
          {
            label: 'Jobs matched',
            value: this.formatCompact(analytics.matchedJobs),
            delta: '+32%',
          },
          {
            label: 'Monthly revenue',
            value: `TZS ${this.formatCompact(analytics.monthlyRevenueTzs)}`,
            delta: '+24%',
          },
          {
            label: 'Verified workers',
            value: this.formatCompact(analytics.verifiedWorkers),
            delta: '+41%',
          },
        ],
        jobs: jobs.jobs.map((job) => ({
          id: job.id,
          title: job.title.replace(/\s+in\s+.+$/i, ''),
          category: job.category,
          area: job.area,
          budget: `TZS ${job.budgetTzs.toLocaleString('en-US')}`,
          status: this.mapJobStatus(job.status),
          applicants: job.applicants,
        })),
        workers: workers.workers.map((worker) => ({
          id: worker.id,
          name: worker.name,
          skill: worker.category,
          rating: worker.rating.toFixed(1),
          jobs: worker.completedJobs,
          status: worker.verified ? 'Verified' : 'Reviewing',
        })),
        categories: analytics.categories.map((category) => ({
          name: category.name,
          value: category.demandPercent,
        })),
      })),
    );
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private mapJobStatus(status: string): JobStatus {
    switch (status) {
      case 'matching':
        return 'Matching';
      case 'in_progress':
        return 'In progress';
      case 'review':
        return 'Needs review';
      default:
        return 'Matching';
    }
  }

  private formatCompact(value: number): string {
    if (value >= 1_000_000) {
      const millions = value / 1_000_000;
      return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
    }

    if (value >= 1_000) {
      const thousands = value / 1_000;
      return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
    }

    return value.toLocaleString('en-US');
  }
}
