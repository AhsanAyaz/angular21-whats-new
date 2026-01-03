import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <div class="container mx-auto p-4">
      <router-outlet />
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular21-whats-new');
}
