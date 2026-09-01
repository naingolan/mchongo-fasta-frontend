import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ApiService, DashboardCategory, DashboardJob, DashboardStat, DashboardWorker } from '../../api.service';

export interface VerificationItem {
  id: string;
  workerName: string;
  phone: string;
  category: string;
  nidaNumber: string;
  region: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

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

  // Stats & Data
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly workers = signal<DashboardWorker[]>([]);
  protected readonly categories = signal<DashboardCategory[]>([]);

  // Chart Data for Sakai NG
  protected chartData: any;
  protected chartOptions: any;

  // Verification Queue
  protected readonly verifications = signal<VerificationItem[]>([
    {
      id: 'ver_001',
      workerName: 'Baraka Emmanuel',
      phone: '+255 754 123 456',
      category: 'Technical',
      nidaNumber: '19920815-11105-00001-24',
      region: 'Mikocheni B, DSM',
      submittedAt: '10 mins ago',
      status: 'Pending',
    },
    {
      id: 'ver_002',
      workerName: 'Salma Juma',
      phone: '+255 689 443 210',
      category: 'Domestic',
      nidaNumber: '19950322-21104-00002-18',
      region: 'Kariakoo, DSM',
      submittedAt: '35 mins ago',
      status: 'Pending',
    },
    {
      id: 'ver_003',
      workerName: 'Emmanuel Lyimo',
      phone: '+255 713 889 001',
      category: 'Logistics',
      nidaNumber: '19891104-31109-00003-72',
      region: 'Sinza, DSM',
      submittedAt: '2 hours ago',
      status: 'Pending',
    },
    {
      id: 'ver_004',
      workerName: 'Fatma Bakari',
      phone: '+255 777 654 321',
      category: 'Care',
      nidaNumber: '19970619-41108-00004-90',
      region: 'Masaki, DSM',
      submittedAt: 'Yesterday',
      status: 'Approved',
    },
  ]);

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
        worker.skill.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || worker.skill === category;
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
      const matchesCategory = category === 'All' || job.category === category;
      return matchesQuery && matchesCategory;
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
    this.initCharts();
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

  protected initCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';

    this.chartData = {
      labels: ['Domestic (42%)', 'Logistics (28%)', 'Care (16%)', 'Technical (14%)'],
      datasets: [
        {
          data: [42, 28, 16, 14],
          backgroundColor: ['#2B6AFF', '#60A5FA', '#93C5FD', '#F59E0B'],
          hoverBackgroundColor: ['#1D4ED8', '#3B82F6', '#60A5FA', '#D97706'],
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
        this.loading.set(false);
      },
      error: () => {
        this.stats.set([
          { label: 'Active Users', value: '50.2K', delta: '+18%' },
          { label: 'Jobs Matched', value: '12.8K', delta: '+32%' },
          { label: 'Monthly Revenue', value: 'TZS 50M', delta: '+24%' },
          { label: 'Verified Workers', value: '8.4K', delta: '+41%' },
        ]);
        this.jobs.set([
          {
            id: 'job_001',
            title: 'House Cleaning & Laundry',
            category: 'Domestic',
            area: 'Mikocheni',
            budget: 'TZS 35,000',
            status: 'Matching',
            applicants: 12,
          },
          {
            id: 'job_002',
            title: 'Kariakoo Package Dispatch',
            category: 'Logistics',
            area: 'Kariakoo',
            budget: 'TZS 18,000',
            status: 'In progress',
            applicants: 9,
          },
          {
            id: 'job_003',
            title: 'Office Wall Repaint & Touchup',
            category: 'Technical',
            area: 'Masaki',
            budget: 'TZS 95,000',
            status: 'Matching',
            applicants: 4,
          },
          {
            id: 'job_004',
            title: 'Elderly Day Caregiver',
            category: 'Care',
            area: 'Kinondoni',
            budget: 'TZS 45,000',
            status: 'Needs review',
            applicants: 6,
          },
        ]);
        this.workers.set([
          {
            id: 'w_01',
            name: 'Asha Mwinyi',
            skill: 'Domestic',
            rating: '4.9',
            jobs: 128,
            status: 'Verified',
          },
          {
            id: 'w_02',
            name: 'Juma Said',
            skill: 'Logistics',
            rating: '4.8',
            jobs: 86,
            status: 'Reviewing',
          },
          {
            id: 'w_03',
            name: 'Rehema Ally',
            skill: 'Care',
            rating: '4.7',
            jobs: 72,
            status: 'Verified',
          },
          {
            id: 'w_04',
            name: 'Daudi Makonda',
            skill: 'Technical',
            rating: '4.95',
            jobs: 210,
            status: 'Verified',
          },
        ]);
        this.categories.set([
          { name: 'Domestic', value: 42 },
          { name: 'Logistics', value: 28 },
          { name: 'Care', value: 16 },
          { name: 'Technical', value: 14 },
        ]);
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
    this.verifications.update((list) =>
      list.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
    this.verificationDialogVisible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Uhakiki Umethibitishwa',
      detail: 'Mhudumu amethibitishwa na kupewa verified badge! 🎉',
    });
  }

  protected rejectVerification(id: string): void {
    this.verifications.update((list) =>
      list.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
    this.verificationDialogVisible = false;
    this.messageService.add({
      severity: 'warn',
      summary: 'Maombi Yamekataliwa',
      detail: 'Maombi ya uhakiki yamekataliwa na ujumbe umetumwa.',
    });
  }

  protected toggleWorkerVerification(workerId: string): void {
    this.workers.update((list) =>
      list.map((w) =>
        w.id === workerId
          ? { ...w, status: w.status === 'Verified' ? 'Reviewing' : 'Verified' }
          : w
      )
    );
    this.messageService.add({
      severity: 'info',
      summary: 'Hadhi Imesasishwa',
      detail: 'Taarifa za mfanyakazi zimesasishwa.',
    });
  }

  protected getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'approved':
      case 'completed':
      case 'matching':
      case 'in progress':
        return 'info';
      case 'reviewing':
      case 'needs review':
      case 'pending':
        return 'warn';
      case 'rejected':
      case 'flagged':
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
