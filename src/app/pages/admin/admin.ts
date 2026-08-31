import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly activeTab = signal<'overview' | 'workers' | 'jobs' | 'verifications' | 'finances'>('overview');
  protected readonly loading = signal(true);
  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal('All');
  protected readonly selectedStatus = signal('All');

  // Stats & Data
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly workers = signal<DashboardWorker[]>([]);
  protected readonly categories = signal<DashboardCategory[]>([]);

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

  // System Notifications / Alert
  protected readonly systemAlert = signal<string | null>(null);

  // Filtered Workers
  protected readonly filteredWorkers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const status = this.selectedStatus();

    return this.workers().filter((worker) => {
      const matchesQuery =
        !query ||
        worker.name.toLowerCase().includes(query) ||
        worker.skill.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || worker.skill === category;
      const matchesStatus = status === 'All' || worker.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
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
    this.refreshData();
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
        // Fallback default mock data for offline/standalone preview
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

  protected approveVerification(id: string): void {
    this.verifications.update((list) =>
      list.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
    this.triggerAlert('Mhudumu amethibitishwa kikamilifu na kupokea verified badge! 🎉');
  }

  protected rejectVerification(id: string): void {
    this.verifications.update((list) =>
      list.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
    this.triggerAlert('Maombi ya uthibitisho yamekataliwa (taarifa zimetumwa kwa mtumiaji).');
  }

  protected toggleWorkerVerification(workerId: string): void {
    this.workers.update((list) =>
      list.map((w) =>
        w.id === workerId
          ? { ...w, status: w.status === 'Verified' ? 'Reviewing' : 'Verified' }
          : w
      )
    );
    this.triggerAlert('Hadhi ya mfanyakazi imesasishwa!');
  }

  private triggerAlert(msg: string): void {
    this.systemAlert.set(msg);
    setTimeout(() => {
      this.systemAlert.set(null);
    }, 4000);
  }
}
