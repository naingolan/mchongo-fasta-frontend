import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {
  ApiService,
  DashboardCategory,
  DashboardJob,
  DashboardStat,
  DashboardWorker,
  FinanceSummary,
  TransactionItem,
  VerificationItem,
} from '../../api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    TagModule,
    InputTextModule,
    ChartModule,
    DialogModule,
    ProgressBarModule,
    SelectModule,
    SkeletonModule,
    TabsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  protected readonly activeTab = signal<'overview' | 'workers' | 'jobs' | 'verifications' | 'finances'>('overview');
  protected readonly loading = signal(true);
  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal('All');

  // Stats & Data loaded live from backend
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly workers = signal<DashboardWorker[]>([]);
  protected readonly categories = signal<DashboardCategory[]>([]);
  protected readonly verifications = signal<VerificationItem[]>([]);
  protected readonly transactions = signal<TransactionItem[]>([]);
  protected readonly financeSummary = signal<FinanceSummary | null>(null);

  // Chart Data for Sakai NG
  protected chartData: any;
  protected chartOptions: any;

  // Selected item for modal inspect
  protected selectedVerification: VerificationItem | null = null;
  protected verificationDialogVisible = false;

  // Filtered Workers
  protected readonly filteredWorkers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.workers().filter((worker) => {
      const matchesQuery =
        !query ||
        worker.name.toLowerCase().includes(query) ||
        worker.skill.toLowerCase().includes(query) ||
        (worker.area && worker.area.toLowerCase().includes(query));
      const matchesCategory = category === 'All' || worker.skill.toLowerCase() === category.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  });

  // Filtered Jobs
  protected readonly filteredJobs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.jobs().filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.area.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || job.category.toLowerCase() === category.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  });

  // Finances Search & Filter
  protected readonly financeSearchQuery = signal('');
  protected readonly financeStatusFilter = signal<string>('All');
  protected readonly transactionStatusOptions = [
    { label: 'Hadhi Zote (All)', value: 'All' },
    { label: 'Zilizolipwa (Disbursed / Paid)', value: 'Disbursed' },
    { label: 'Zinazoshikiliwa (Escrow Held)', value: 'Escrow Held' },
  ];

  protected readonly filteredTransactions = computed(() => {
    const query = this.financeSearchQuery().toLowerCase().trim();
    const status = this.financeStatusFilter();

    return this.transactions().filter((tx) => {
      const matchesQuery =
        !query ||
        tx.id.toLowerCase().includes(query) ||
        tx.jobTitle.toLowerCase().includes(query) ||
        tx.employerName.toLowerCase().includes(query) ||
        tx.workerName.toLowerCase().includes(query) ||
        (tx.paymentMethod && tx.paymentMethod.toLowerCase().includes(query));

      const matchesStatus =
        status === 'All' ||
        (status === 'Disbursed' && tx.status === 'Disbursed') ||
        (status === 'Escrow Held' && tx.status === 'Escrow Held');

      return matchesQuery && matchesStatus;
    });
  });

  // Pending Verifications Count
  protected readonly pendingVerificationsCount = computed(() => {
    return this.verifications().filter((v) => v.status === 'Pending').length;
  });

  ngOnInit(): void {
    this.updateTabFromUrl(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTabFromUrl(event.urlAfterRedirects || event.url);
      });

    this.refreshData();
  }

  private updateTabFromUrl(url: string): void {
    if (url.includes('/admin/workers')) {
      this.activeTab.set('workers');
    } else if (url.includes('/admin/jobs')) {
      this.activeTab.set('jobs');
    } else if (url.includes('/admin/verifications')) {
      this.activeTab.set('verifications');
    } else if (url.includes('/admin/finances')) {
      this.activeTab.set('finances');
    } else {
      this.activeTab.set('overview');
    }
  }

  protected initCharts(categories: DashboardCategory[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';

    const labels = categories.map((c) => `${c.name} (${c.value}%)`);
    const data = categories.map((c) => c.value);

    this.chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#2B6AFF', '#60A5FA', '#93C5FD', '#F59E0B', '#10B981'],
          hoverBackgroundColor: ['#1D4ED8', '#3B82F6', '#60A5FA', '#D97706', '#059669'],
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
          position: 'bottom',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  protected refreshData(): void {
    this.loading.set(true);
    this.api.loadDashboard().subscribe({
      next: (data) => {
        this.stats.set(data.stats);
        this.jobs.set(data.jobs);
        this.workers.set(data.workers);
        this.categories.set(data.categories);
        this.verifications.set(data.verifications);
        if (data.finances) {
          this.transactions.set(data.finances.transactions);
          this.financeSummary.set(data.finances.summary);
        }
        this.initCharts(data.categories);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching dashboard from backend:', err);
        this.loading.set(false);
      },
    });
  }

  protected setTab(tab: 'overview' | 'workers' | 'jobs' | 'verifications' | 'finances'): void {
    this.activeTab.set(tab);
    this.searchQuery.set('');
    this.selectedCategory.set('All');
  }

  protected inspectVerification(item: VerificationItem): void {
    this.selectedVerification = item;
    this.verificationDialogVisible = true;
  }

  protected approveVerification(id: string): void {
    this.api.updateVerification(id, 'Approved').subscribe({
      next: () => {
        this.verifications.update((list) =>
          list.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
        );
        this.verificationDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Uhakiki Umethibitishwa',
          detail: 'Mhudumu amethibitishwa kwenye database na kupewa verified badge! 🎉',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hitilafu',
          detail: 'Imeshindwa kusasisha uhakiki kwenye seva.',
        });
      }
    });
  }

  protected rejectVerification(id: string): void {
    this.api.updateVerification(id, 'Rejected').subscribe({
      next: () => {
        this.verifications.update((list) =>
          list.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item))
        );
        this.verificationDialogVisible = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Maombi Yamekataliwa',
          detail: 'Maombi ya uhakiki yamekataliwa kwenye mfumo.',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hitilafu',
          detail: 'Imeshindwa kusasisha hadhi kwenye seva.',
        });
      }
    });
  }

  protected toggleWorkerVerification(workerId: string): void {
    const worker = this.workers().find((w) => w.id === workerId);
    if (!worker) return;

    const newStatus = worker.status === 'Verified' ? 'Reviewing' : 'Verified';
    this.workers.update((list) =>
      list.map((w) => (w.id === workerId ? { ...w, status: newStatus } : w))
    );
    this.messageService.add({
      severity: 'info',
      summary: 'Hadhi Imesasishwa',
      detail: `Mfanyakazi sasa ana hadhi ya: ${newStatus}`,
    });
  }

  protected getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'approved':
      case 'completed':
      case 'matching':
      case 'in progress':
      case 'disbursed':
        return 'info';
      case 'reviewing':
      case 'needs review':
      case 'pending':
      case 'escrow held':
        return 'warn';
      case 'rejected':
      case 'flagged':
      case 'refunded':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  protected getInitials(name: string): string {
    if (!name) return 'MF';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}
