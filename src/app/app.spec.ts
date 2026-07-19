import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the landing headline and login', () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    http.expectOne('/api/analytics').flush({
      activeUsers: 50200,
      matchedJobs: 12800,
      monthlyRevenueTzs: 50000000,
      verifiedWorkers: 8400,
      categories: [{ name: 'Domestic', demandPercent: 42 }],
    });
    http.expectOne('/api/jobs').flush({ jobs: [] });
    http.expectOne('/api/workers').flush({ workers: [] });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Where verified workers meet real jobs',
    );
    expect(compiled.textContent).toContain('Log in');
    http.verify();
  });
});
