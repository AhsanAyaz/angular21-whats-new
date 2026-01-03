import { Component, ChangeDetectorRef, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zoneless-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Zoneless Experience</h2>

        <div class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span
            >This application is running <strong>without Zone.js</strong>. Notice how traditional
            updates fail without Signals.</span
          >
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <!-- Traditional (Fails in Zoneless) -->
          <div class="p-4 border rounded-lg bg-error/10 border-error">
            <h3 class="text-xl font-bold mb-2 text-error">Traditional Variable</h3>
            <p class="mb-4 text-sm">
              Updating a plain property via setTimeout or async event.
              <strong>won't trigger change detection</strong> automatically.
            </p>

            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Value</div>
                <div class="stat-value text-error">{{ traditionalValue }}</div>
              </div>
            </div>

            <button class="btn btn-error mt-4 text-white" (click)="updateTraditional()">
              Update (Async 1s)
            </button>
            <p class="mt-2 text-xs">
              Clicking this waits 1s then updates property. UI won't change!
            </p>
          </div>

          <!-- Signals (Works) -->
          <div class="p-4 border rounded-lg bg-success/10 border-success">
            <h3 class="text-xl font-bold mb-2 text-success">Signal</h3>
            <p class="mb-4 text-sm">Updating a signal notifies Angular immediately.</p>

            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Value</div>
                <div class="stat-value text-success">{{ signalValue() }}</div>
              </div>
            </div>

            <button class="btn btn-success mt-4 text-white" (click)="updateSignal()">
              Update (Async 1s)
            </button>
            <p class="mt-2 text-xs">Works perfectly without Zone.js</p>
          </div>
        </div>

        <div class="divider"></div>
        <button class="btn btn-outline" (click)="forceCheck()">
          Force CDR Check (Fixes usage of Traditional)
        </button>
      </div>
    </div>
  `,
})
export class ZonelessDemoComponent {
  traditionalValue = 0;
  signalValue = signal(0);

  constructor(private cdr: ChangeDetectorRef) {}

  updateTraditional() {
    setTimeout(() => {
      this.traditionalValue++;
      console.log('Updated traditional value to:', this.traditionalValue);
      // In Zoneless, this won't reflect in UI unless we call cdr.markForCheck()
    }, 1000);
  }

  updateSignal() {
    setTimeout(() => {
      this.signalValue.update((v) => v + 1);
    }, 1000);
  }

  forceCheck() {
    this.cdr.detectChanges();
  }
}
