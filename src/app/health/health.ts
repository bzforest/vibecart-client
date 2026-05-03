import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HealthResponse, HealthService } from './health.service';

type HealthState = 'loading' | 'connected' | 'error';

@Component({
  selector: 'app-health',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-svh bg-slate-950 px-6 py-10 text-slate-100">
      <section class="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-3xl flex-col justify-center">
        <div class="border-l-4 border-emerald-400 pl-6">
          <p class="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
            Vibecart Health
          </p>
          <h1 class="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Connected
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            This page calls the Gin API health endpoint through the Angular local proxy.
          </p>
        </div>

        <div class="mt-10 rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-sm text-slate-400">Endpoint</p>
              <p class="mt-1 font-mono text-sm text-slate-100">GET /api/v1/health</p>
            </div>

            <button
              type="button"
              class="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-wait disabled:opacity-70"
              [disabled]="state() === 'loading'"
              (click)="checkHealth()"
            >
              @if (state() === 'loading') {
                Checking...
              } @else {
                Retry
              }
            </button>
          </div>

          <div class="mt-8 border-t border-slate-800 pt-6">
            @switch (state()) {
              @case ('loading') {
                <div class="flex items-center gap-3 text-slate-300" role="status" aria-live="polite">
                  <span class="h-3 w-3 animate-pulse rounded-full bg-sky-300"></span>
                  Checking backend connection...
                </div>
              }
              @case ('connected') {
                <div class="space-y-3" aria-live="polite">
                  <p class="inline-flex items-center gap-3 text-lg font-semibold text-emerald-300">
                    <span class="h-3 w-3 rounded-full bg-emerald-300"></span>
                    Connected
                  </p>
                  <p class="text-slate-200">{{ response()?.message }}</p>
                  <p class="text-sm text-slate-400">Status: {{ response()?.status }}</p>
                </div>
              }
              @case ('error') {
                <div class="space-y-3" aria-live="assertive">
                  <p class="inline-flex items-center gap-3 text-lg font-semibold text-red-300">
                    <span class="h-3 w-3 rounded-full bg-red-300"></span>
                    Connection failed
                  </p>
                  <p class="text-slate-200">{{ errorMessage() }}</p>
                  <p class="text-sm text-slate-400">
                    Make sure the Gin server is running on http://localhost:8080.
                  </p>
                </div>
              }
            }

            @if (checkedAt()) {
              <p class="mt-6 text-xs text-slate-500">Last checked: {{ checkedAt() }}</p>
            }
          </div>
        </div>
      </section>
    </main>
  `,
})
export class HealthComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly healthService = inject(HealthService);

  protected readonly state = signal<HealthState>('loading');
  protected readonly response = signal<HealthResponse | null>(null);
  protected readonly errorMessage = signal('');
  protected readonly checkedAt = signal('');

  constructor() {
    afterNextRender(() => {
      this.checkHealth();
    });
  }

  protected checkHealth(): void {
    this.state.set('loading');
    this.errorMessage.set('');

    this.healthService
      .check()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.response.set(response);
          this.checkedAt.set(new Date().toLocaleString());
          this.state.set('connected');
        },
        error: (error: unknown) => {
          this.response.set(null);
          this.checkedAt.set(new Date().toLocaleString());
          this.errorMessage.set(this.getErrorMessage(error));
          this.state.set('error');
        },
      });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'The frontend could not reach the backend API.';
      }

      return `Backend returned HTTP ${error.status}.`;
    }

    return 'Unexpected error while checking backend health.';
  }
}
