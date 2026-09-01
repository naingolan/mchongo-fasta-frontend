import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../environments/environment';

export type JobStatus = 'Matching' | 'In progress' | 'Needs review' | 'Completed';

export interface DashboardJob {
  id: string;
  title: string;
  category: string;
  area: string;
  budget: string;
  status: JobStatus;
  applicants: number;
  scheduledFor?: string;
  employerName?: string;
  employerPhone?: string;
}

export interface DashboardWorker {
  id: string;
  name: string;
  skill: string;
  rating: string;
  jobs: number;
  status: 'Verified' | 'Reviewing' | 'Flagged';
  phone?: string;
  area?: string;
  hourlyRate?: string;
}

export interface VerificationItem {
  id: string;
  workerId?: string;
  workerName: string;
  phone: string;
  category: string;
  nidaNumber: string;
  region: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  documentType?: string;
  skillCert?: string;
}

export interface TransactionItem {
  id: string;
  jobId: string;
  jobTitle: string;
  amountTzs: number;
  platformFeeTzs: number;
  workerPayoutTzs: number;
  employerName: string;
  workerName: string;
  status: 'Escrow Held' | 'Disbursed' | 'Refunded';
  paymentMethod: string;
  timestamp: string;
}

export interface FinanceSummary {
  monthlyRevenueTzs: number;
  totalTransactionVolumeTzs: number;
  totalPlatformFeesTzs: number;
  workerMonthlyEarningsAverageTzs: number;
  activeEscrowHoldTzs: number;
  escrowDisbursedTzs: number;
}

export interface FinancesResponse {
  transactions: TransactionItem[];
  summary: FinanceSummary;
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
  verifications: VerificationItem[];
  finances?: FinancesResponse;
}

interface AnalyticsResponse {
  activeUsers: number;
  matchedJobs: number;
  monthlyRevenueTzs: number;
  verifiedWorkers: number;
  verificationQueue: number;
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
    scheduledFor?: string;
    employerName?: string;
    employerPhone?: string;
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
    phone?: string;
    area?: string;
    hourlyRateTzs?: number;
  }>;
}

interface VerificationsResponse {
  verifications: VerificationItem[];
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
      verifications: this.http.get<VerificationsResponse>(this.url('/api/verification')),
      finances: this.http.get<FinancesResponse>(this.url('/api/finances')),
    }).pipe(
      map(({ analytics, jobs, workers, verifications, finances }) => ({
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
          scheduledFor: job.scheduledFor,
          employerName: job.employerName,
          employerPhone: job.employerPhone,
        })),
        workers: workers.workers.map((worker) => ({
          id: worker.id,
          name: worker.name,
          skill: worker.category,
          rating: worker.rating.toFixed(1),
          jobs: worker.completedJobs,
          status: worker.verified ? 'Verified' : 'Reviewing',
          phone: worker.phone,
          area: worker.area,
          hourlyRate: worker.hourlyRateTzs ? `TZS ${worker.hourlyRateTzs.toLocaleString('en-US')}/hr` : undefined,
        })),
        categories: analytics.categories.map((category) => ({
          name: category.name,
          value: category.demandPercent,
        })),
        verifications: verifications.verifications,
        finances,
      })),
    );
  }

  getVerifications(): Observable<VerificationItem[]> {
    return this.http
      .get<VerificationsResponse>(this.url('/api/verification'))
      .pipe(map((res) => res.verifications));
  }

  updateVerification(id: string, status: 'Approved' | 'Rejected' | 'Pending'): Observable<any> {
    return this.http.post(this.url('/api/verification'), { id, status });
  }

  getFinances(): Observable<FinancesResponse> {
    return this.http.get<FinancesResponse>(this.url('/api/finances'));
  }

  postJob(job: any): Observable<any> {
    return this.http.post(this.url('/api/jobs'), job);
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private mapJobStatus(status: string): JobStatus {
    switch (status.toLowerCase()) {
      case 'matching':
        return 'Matching';
      case 'in_progress':
      case 'in progress':
        return 'In progress';
      case 'review':
      case 'needs review':
        return 'Needs review';
      case 'completed':
        return 'Completed';
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
