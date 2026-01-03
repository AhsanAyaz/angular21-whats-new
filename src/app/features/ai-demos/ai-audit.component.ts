import {
  Component,
  effect,
  linkedSignal,
  resource,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI, Type } from '@google/genai';
import { debounceTime } from 'rxjs/operators';

// Shim for experimental signals form import if needed,
// but for this demo, we'll use standard signals + linkedSignal + resource
// as the "AI Integration" showcase.

export interface AiReport {
  sentiment: string;
  confidence: number;
  readability: string;
  score: number;
  gradeLevel: string;
  adverbs: number;
  passiveVoice: number;
  complexSentences: number;
  suggestions: string[];
}

enum Status {
  Unsaved = 'Unsaved',
  Saved = 'Saved',
}

@Component({
  selector: 'app-ai-audit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">AI Content Audit</h2>
        <p class="mb-4">
          Draft your content below. The "AI" will analyze sentiment and readability.
          <br />
          <span class="text-xs opacity-75"
            >Demonstrates: <code>resource</code> API for async AI, and <code>linkedSignal</code> for
            optimistic state.</span
          >
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Input Area -->
          <div class="form-control flex flex-col gap-2">
            <label class="label"><span class="label-text">Content Draft</span></label>
            <textarea
              class="textarea textarea-bordered h-48 transition-colors duration-500 w-full"
              [class.textarea-error]="aiResource.value()?.sentiment === 'Negative'"
              [class.textarea-success]="aiResource.value()?.sentiment === 'Positive'"
              [class.textarea-info]="aiResource.value()?.sentiment === 'Neutral'"
              [ngModel]="content()"
              (ngModelChange)="content.set($event)"
              placeholder="Type something here..."
            ></textarea>

            <div class="mt-2 flex gap-2">
              <button
                class="btn btn-primary"
                [disabled]="aiResource.isLoading()"
                (click)="analyzeContent()"
              >
                {{ aiResource.isLoading() ? 'Analyzing...' : 'Audit Content' }}
              </button>
            </div>
          </div>

          <!-- Analysis Result -->
          <div class="border rounded-box p-4 bg-base-200 relative">
            @if (aiResource.isLoading()) {
            <div
              class="absolute inset-0 bg-base-200/50 flex items-center justify-center z-10 backdrop-blur-sm rounded-box"
            >
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            }

            <h3 class="font-bold text-lg mb-4">Audit Report</h3>

            @if (aiResource.error()) {
            <div class="alert alert-error">
              <span>Failed to contact AI service.</span>
            </div>
            } @if (aiResource.value(); as report) {
            <div class="stats stats-vertical shadow w-full bg-base-100">
              <div class="stat">
                <div class="stat-title">Sentiment</div>
                <div
                  class="stat-value text-lg"
                  [class.text-success]="report.sentiment === 'Positive'"
                >
                  {{ report.sentiment }}
                </div>
                <div class="stat-desc">Confidence: {{ report.confidence * 100 }}%</div>
              </div>

              <div class="stat">
                <div class="stat-title">Readability</div>
                <div class="stat-value text-lg">{{ report.readability }}</div>
                <div class="stat-desc">Grade: {{ report.gradeLevel }}</div>
              </div>

              <div class="stat">
                <div class="stat-title">Hemingway</div>
                <div class="stat-value text-lg">{{ report.score }}/100</div>
                <div class="stat-desc text-xs">
                  Adv: {{ report.adverbs }} | Pass: {{ report.passiveVoice }} | Cmplx:
                  {{ report.complexSentences }}
                </div>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="font-bold text-sm mb-2">AI Suggestions:</h4>
              <ul class="list-disc list-inside text-sm">
                @for (suggestion of report.suggestions; track suggestion) {
                <li>{{ suggestion }}</li>
                }
              </ul>
            </div>
            } @else {
            <div class="text-center opacity-50 mt-10">Waiting for analysis...</div>
            }
          </div>
        </div>

        <!-- Linked Signal Demo -->
        <div class="divider"></div>
        <div class="alert alert-info text-info-content">
          <div>
            <h4 class="font-bold text-xs uppercase">Linked Signal Magic</h4>
            <p class="text-sm">
              The "Draft Status" below automatically resets to "Unsaved" when you type, but changes
              to "Saved" when AI analysis completes.
            </p>
          </div>

          <div
            class="badge badge-lg"
            [class.badge-primary]="status() === Status.Saved"
            [class.badge-warning]="status() === Status.Unsaved"
          >
            {{ status() }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AiAuditComponent {
  // Source signal
  content = signal('Angular 21 is absolutely amazing! I love the new zoneless features.');

  // Actual Linked Signal
  // Resets to 'Unsaved' whenever 'content' changes
  status = linkedSignal({
    source: this.content,
    computation: () => Status.Unsaved,
  });

  Status = Status;

  // Trigger signal for resource
  triggerAnalysis = signal(0);

  // Debounced content for AI
  debouncedContent = toSignal(toObservable(this.content).pipe(debounceTime(800)), {
    initialValue: this.content(),
  });

  // Resource API
  aiResource = resource({
    params: () => ({ tick: this.triggerAnalysis(), text: this.debouncedContent() }),
    loader: async ({ params: request }) => {
      if (request.tick === 0) return undefined;

      // Initialize Gemini (Replace YOUR_API_KEY with actual key)
      const client = new GoogleGenAI({ apiKey: '' });

      try {
        const result = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: request.text,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING, enum: ['Positive', 'Neutral', 'Negative'] },
                confidence: { type: Type.NUMBER },
                readability: { type: Type.STRING },
                score: { type: Type.NUMBER },
                gradeLevel: { type: Type.STRING },
                adverbs: { type: Type.NUMBER },
                passiveVoice: { type: Type.NUMBER },
                complexSentences: { type: Type.NUMBER },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
        });

        const report = result.candidates?.[0]?.content?.parts?.[0]?.text;
        return report ? (JSON.parse(report) as AiReport) : undefined;
      } catch (e) {
        console.error('Gemini API Error:', e);
        // Fallback or re-throw
        throw e;
      }
    },
  });

  constructor() {
    effect(() => {
      if (this.aiResource.value()) {
        this.status.set(Status.Saved);
      }
    });
  }

  analyzeContent() {
    this.triggerAnalysis.update((v) => v + 1);
  }
}
