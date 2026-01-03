import {
  Component,
  NgZone,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Reactivity: Before vs After</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- BEFORE: Zone.js -->
          <div class="p-4 border rounded-lg bg-base-200">
            <h3 class="text-xl font-bold mb-2">Before (Zone.js)</h3>
            <p class="mb-4 text-sm opacity-70">
              Relying on Zone.js to monkey-patch events. Changes detected automatically (sometimes
              too often).
            </p>

            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Counter</div>
                <div class="stat-value">{{ counter }}</div>
                <div class="stat-desc">Double: {{ doubleCounter }}</div>
              </div>
            </div>

            <button class="btn btn-primary mt-4" (click)="incrementZone()">Increment (Zone)</button>
            <p class="mt-2 text-xs">Check console for "Zone Check"</p>
          </div>

          <!-- AFTER: Signals -->
          <div class="p-4 border rounded-lg bg-base-200 border-primary">
            <h3 class="text-xl font-bold mb-2 text-primary">After (Signals)</h3>
            <p class="mb-4 text-sm opacity-70">
              Fine-grained reactivity. No Zone.js magic needed (in Zoneless mode).
            </p>

            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Signal Count</div>
                <div class="stat-value">{{ signalCount() }}</div>
                <div class="stat-desc">Computed Double: {{ signalDouble() }}</div>
              </div>
            </div>

            <button class="btn btn-accent mt-4" (click)="incrementSignal()">
              Increment (Signal)
            </button>
            <p class="mt-2 text-xs">Updates are granular!</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SignalsDemoComponent {
  // Legacy / Zone approach
  counter = 0;
  get doubleCounter() {
    console.log('Zone Check: Calculating doubleCounter');
    return this.counter * 2;
  }

  // Modern / Signal approach
  signalCount = signal(0);
  signalDouble = computed(() => {
    console.log('Signal Check: Calculating double');
    return this.signalCount() * 2;
  });

  constructor(private ngZone: NgZone) {
    // Visualize Zone triggers
    this.ngZone.onStable.subscribe(() => {
      // This runs when Zone stabilizes
    });
  }

  incrementZone() {
    this.counter++;
  }

  incrementSignal() {
    this.signalCount.update((c) => c + 1);
  }
}
