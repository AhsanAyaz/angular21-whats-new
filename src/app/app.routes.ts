import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'signals', pathMatch: 'full' },
  {
    path: 'signals',
    loadComponent: () =>
      import('./features/signals/signals.component').then((m) => m.SignalsDemoComponent),
  },
  {
    path: 'zoneless',
    loadComponent: () =>
      import('./features/zoneless/zoneless.component').then((m) => m.ZonelessDemoComponent),
  },
  {
    path: 'control-flow',
    loadComponent: () =>
      import('./features/control-flow/control-flow.component').then(
        (m) => m.ControlFlowDemoComponent
      ),
  },
  {
    path: 'signal-forms',
    loadComponent: () =>
      import('./features/forms/signal-forms.component').then((m) => m.SignalFormsDemoComponent),
  },
  {
    path: 'ai-audit',
    loadComponent: () =>
      import('./features/ai-demos/ai-audit.component').then((m) => m.AiAuditComponent),
  },
  {
    path: 'aria',
    loadComponent: () =>
      import('./features/aria/aria-demo.component').then((m) => m.AriaDemoComponent),
  },
];
