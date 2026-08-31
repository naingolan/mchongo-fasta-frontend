import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, DashboardJob, DashboardStat } from '../../api.service';
import { NetworkParticles } from '../../network-particles';
import {
  CATEGORY_TRANSLATIONS,
  JOB_TITLE_TRANSLATIONS,
  Language,
  STATUS_TRANSLATIONS,
  TRANSLATIONS,
} from '../../translations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, NetworkParticles],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly elementRef = inject(ElementRef);

  protected readonly currentLang = signal<Language>('sw');
  protected readonly langMenuOpen = signal(false);
  protected readonly loading = signal(true);
  protected readonly jobs = signal<DashboardJob[]>([]);
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly loginOpen = signal(false);

  protected readonly t = computed(() => TRANSLATIONS[this.currentLang()]);

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.langMenuOpen()) {
      const target = event.target as HTMLElement | null;
      if (!this.elementRef.nativeElement.querySelector('.lang-dropdown-wrapper')?.contains(target)) {
        this.langMenuOpen.set(false);
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.langMenuOpen.set(false);
    this.loginOpen.set(false);
  }

  ngOnInit(): void {
    const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('mf_lang') : null;
    if (savedLang === 'en' || savedLang === 'sw') {
      this.currentLang.set(savedLang);
    }

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

  protected toggleLangMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.langMenuOpen.update((open) => !open);
  }

  protected selectLanguage(lang: Language): void {
    this.currentLang.set(lang);
    this.langMenuOpen.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('mf_lang', lang);
    }
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

  protected getJobTitle(title: string): string {
    const lang = this.currentLang();
    return JOB_TITLE_TRANSLATIONS[lang]?.[title] || title;
  }

  protected getCategory(category: string): string {
    const lang = this.currentLang();
    return CATEGORY_TRANSLATIONS[lang]?.[category] || category;
  }

  protected getStatus(status: string): string {
    const lang = this.currentLang();
    return STATUS_TRANSLATIONS[lang]?.[status] || status;
  }

  protected getStatLabel(rawLabel: string): string {
    const dict = this.t().stats;
    const lower = rawLabel.toLowerCase();
    if (lower.includes('active') || lower.includes('kazi')) return dict.activeJobs;
    if (lower.includes('worker') || lower.includes('verified')) return dict.verifiedWorkers;
    if (lower.includes('rate') || lower.includes('match')) return dict.matchingRate;
    if (lower.includes('volume') || lower.includes('revenue') || lower.includes('daily')) return dict.dailyVolume;
    return rawLabel;
  }
}
