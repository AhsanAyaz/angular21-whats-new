import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, Field, required, email, submit } from '@angular/forms/signals';

interface LoginData {
  username: string;
  email: string;
}

@Component({
  selector: 'app-signal-forms-demo',
  imports: [CommonModule, ReactiveFormsModule, Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Evolution of Forms</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- LEGACY: Reactive Forms -->
          <div class="border p-4 rounded-box bg-base-200">
            <h3 class="font-bold text-lg mb-2">Legacy (Reactive Forms)</h3>
            <p class="text-xs mb-2">
              Requires ControlValueAccessor, manual subscriptions, boilerplate.
            </p>

            <form [formGroup]="legacyForm">
              <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">Username</span></label>
                <input
                  type="text"
                  formControlName="username"
                  class="input input-bordered bg-base-100 w-full max-w-xs"
                />
              </div>

              <div class="form-control w-full max-w-xs mt-2">
                <label class="label"><span class="label-text">Email</span></label>
                <input
                  type="text"
                  formControlName="email"
                  class="input input-bordered bg-base-100 w-full max-w-xs"
                />
              </div>

              <div class="mt-4">
                <p>Value: {{ legacyForm.value | json }}</p>
                <p>Valid: {{ legacyForm.valid }}</p>
              </div>
            </form>
          </div>

          <!-- NEW: Signal Forms -->
          <div class="border p-4 rounded-box border-primary bg-primary/5">
            <h3 class="font-bold text-lg mb-2 text-primary">Signal Forms (v21)</h3>
            <p class="text-xs mb-2">Model-driven, type-safe, default signals.</p>

            <form (submit)="onSubmit($event)" class="mt-4">
              <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">Username</span></label>
                <!-- The [field] directive binds signal to input -->
                <input
                  type="text"
                  [field]="signalForm.username"
                  class="input input-bordered input-primary w-full max-w-xs"
                  [class.input-error]="signalForm.username().invalid()"
                />
                @if (signalForm.username().invalid()) {
                <div class="label"><span class="label-text-alt text-error">Required</span></div>
                }
              </div>

              <div class="form-control w-full max-w-xs mt-2">
                <label class="label"><span class="label-text">Email</span></label>
                <input
                  type="text"
                  [field]="signalForm.email"
                  class="input input-bordered input-primary w-full max-w-xs"
                  [class.input-error]="signalForm.email().invalid()"
                />
                @if (signalForm.email().invalid()) {
                <div class="label"><span class="label-text-alt text-error">Invalid Email</span></div>
                }
              </div>

              <div class="flex gap-2 mt-4">
                <button [disabled]="signalForm().pending() || signalForm().invalid()" type="submit" class="btn btn-primary disabled:btn-disabled">
                  Submit (Signal)
                </button>
                <button type="button" class="btn btn-outline btn-accent" (click)="programmaticUpdate()">
                  Simulate API Update
                </button>
              </div>
            </form>

            <div class="mt-6">
              <div class="mockup-code bg-primary text-primary-content p-2 text-xs">
                <pre><code>name: {{ signalUser().username }}
email: {{ signalUser().email }}
isValid: {{ signalForm().valid() }}

// Access via FieldState
username.value(): {{ signalForm.username().value() }}
email.value(): {{ signalForm.email().value() }}
username.valid(): {{ signalForm.username().valid() }}
email.valid(): {{ signalForm.email().valid() }}</code></pre>
              </div>

              @if (lastSubmission()) {
                <div class="alert alert-success mt-4 shadow-sm text-sm">
                  <span>Last successful submission: {{ lastSubmission() | json }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SignalFormsDemoComponent {
  // Legacy
  legacyForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Signal approach (Native Angular v21 Signal Forms)
  signalUser = signal<LoginData>({
    username: '',
    email: '',
  });

  signalForm = form(this.signalUser, (schemaPath) => {
    required(schemaPath.username, { message: 'Required' });
    required(schemaPath.email, { message: 'Required' });
    email(schemaPath.email, { message: 'Invalid email' });
  });

  lastSubmission = signal<LoginData | null>(null);

  programmaticUpdate() {
    // Demonstrate setting value programmatically via field
    this.signalForm.username().value.set('GenericUser_' + Math.floor(Math.random() * 100));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.signalForm, async () => {
      // simulate network request
      console.log('Form is valid, submitting...', this.signalUser());
      this.lastSubmission.set({ ...this.signalUser() });
    });
  }
}
