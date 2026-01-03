import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a routerLink="/signals" routerLinkActive="active">Signals vs Zone</a></li>
            <li><a routerLink="/zoneless" routerLinkActive="active">Zoneless</a></li>
            <li><a routerLink="/control-flow" routerLinkActive="active">Control Flow</a></li>
            <li><a routerLink="/signal-forms" routerLinkActive="active">Signal Forms</a></li>
            <li><a routerLink="/ai-audit" routerLinkActive="active">AI Audit</a></li>
            <li><a routerLink="/aria" routerLinkActive="active">Angular Aria</a></li>
          </ul>
        </div>
        <a routerLink="/" class="btn btn-ghost text-xl">Angular 21</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a routerLink="/signals" routerLinkActive="active">Signals vs Zone</a></li>
          <li><a routerLink="/zoneless" routerLinkActive="active">Zoneless</a></li>
          <li><a routerLink="/control-flow" routerLinkActive="active">Control Flow</a></li>
          <li><a routerLink="/signal-forms" routerLinkActive="active">Signal Forms</a></li>
          <li><a routerLink="/ai-audit" routerLinkActive="active">AI Audit</a></li>
          <li><a routerLink="/aria" routerLinkActive="active">Angular Aria</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <a
          class="btn btn-primary"
          href="https://github.com/angular/angular/releases"
          target="_blank"
          >Download v21</a
        >
      </div>
    </div>
  `,
})
export class NavbarComponent {}
