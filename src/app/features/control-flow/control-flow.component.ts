import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heavy-content',
  template: `
    <div class="p-4 bg-secondary text-secondary-content rounded-lg my-2">
      <h3 class="font-bold">Heavy Content Loaded!</h3>
      <p>This component was deferred until you scrolled or clicked.</p>
    </div>
  `,
})
export class HeavyContentComponent {
  constructor() {
    console.log('Heavy content loaded');
  }
}

@Component({
  selector: 'app-control-flow-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeavyContentComponent],
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">New Control Flow & Defer</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- @if / @else -->
          <div class="border p-4 rounded-box">
            <h3 class="font-bold text-lg mb-2">&#64;if syntax</h3>
            <button class="btn btn-sm btn-outline mb-2" (click)="toggleLogin()">
              Toggle Login
            </button>

            @if (isLoggedIn()) {
            <div class="alert alert-success mt-2">
              <span>User is logged in</span>
            </div>
            } @else {
            <div class="alert alert-warning mt-2">
              <span>Please log in</span>
            </div>
            }
          </div>

          <!-- @for -->
          <div class="border p-4 rounded-box">
            <h3 class="font-bold text-lg mb-2">&#64;for syntax</h3>
            <ul class="menu bg-base-200 w-full rounded-box h-48 overflow-y-auto">
              @for (item of items(); track item.id; let i = $index) {
              <li>
                <a>{{ i + 1 }}. {{ item.name }}</a>
              </li>
              } @empty {
              <li>No items found</li>
              }
            </ul>
            <button class="btn btn-xs mt-2" (click)="addItems()">Add Items</button>
          </div>
        </div>

        <div class="divider"></div>

        <!-- @defer -->
        <h3 class="font-bold text-lg">Deferred Loading (&#64;defer)</h3>
        <p class="mb-4">Scroll down or interact to load heavy content.</p>

        <div class="h-32 bg-base-200 flex items-center justify-center rounded-lg mb-4">
          Scroll Spacer
        </div>

        @defer (on viewport) {
        <app-heavy-content />
        } @placeholder {
        <div class="p-4 bg-neutral-content text-neutral rounded-lg my-2 opacity-50">
          Placeholder for Heavy Content (Scroll to view)
        </div>
        } @loading {
        <span class="loading loading-spinner loading-lg"></span>
        }

        <div class="mt-4">
          <h4 class="font-bold">Interaction Trigger</h4>
          <button #triggerBtn class="btn btn-primary">Hover or Click Me</button>

          @defer (on hover(triggerBtn); ) {
          <div class="chat chat-start mt-4">
            <div class="chat-bubble chat-bubble-primary">Hello from deferred content!</div>
          </div>
          } @placeholder {
          <div class="mt-2 text-sm opacity-50">Content hidden...</div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ControlFlowDemoComponent {
  isLoggedIn = signal(false);
  items = signal<{ id: number; name: string }[]>([
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Svelte' },
    { id: 4, name: 'Vue' },
  ]);

  toggleLogin() {
    this.isLoggedIn.update((v) => !v);
  }

  addItems() {
    this.items.update((list) => [
      ...list,
      { id: list.length + 1, name: `Framework ${list.length + 1}` },
    ]);
  }
}
