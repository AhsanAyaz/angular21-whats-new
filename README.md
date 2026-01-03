# Angular v21 Showcase Application

This project demonstrates the cutting-edge features of Angular v21, focusing on the shift to a Zoneless architecture, fine-grained reactivity with Signals, and the new "AI-first" developer experience.

## ✨ Key Features Demonstrated

### 1. Zoneless by Default

The application runs without `zone.js`. Change detection is triggered explicitly or via Signals, resulting in better performance and strictly typed async flows.

- **Demo:** [/zoneless](/zoneless)
- **Code:** `src/app/features/zoneless/`
- **Config:** `provideZonelessChangeDetection()` in `app.config.ts`.

### 2. Signals vs. Zone.js Pattern

A "Before and After" comparison showing how `signal()`, `computed()`, and `effect()` replace traditional variable mutations and automatic change detection.

- **Demo:** [/signals](/signals)
- **Code:** `src/app/features/signals/`

### 3. New Control Flow & Deferred Loading

Showcasing the new built-in syntax (`@if`, `@for`) and the powerful `@defer` block for declarative lazy loading of heavy components.

- **Demo:** [/control-flow](/control-flow)
- **Code:** `src/app/features/control-flow/`

### 4. Signal Forms (Native v21 API)

A look at the future of forms in Angular using the **native Signal Forms API** from `@angular/forms/signals`. Uses a model-driven approach allowing direct binding to signals without the boilerplate of `ControlValueAccessor`.

- **Demo:** [/signal-forms](/signal-forms)
- **Code:** `src/app/features/forms/`
- **API:** Imports `form()`, `Field`, `required()`, `email()` from `@angular/forms/signals`

> **Note:** Signal Forms are still experimental. See the [official guide](https://angular.dev/guide/forms/signals/overview) for details.

### 5. AI Integration (Resource API + linkedSignal)

Demonstrates the new reactive primitives designed for async data (like AI responses).

- **`resource()`**: Handles async loading state (`isLoading`, `value`, `error`) automatically.
- **`linkedSignal()`**: (Simulated) Resets state based on dependencies (e.g., changing draft content resets status to 'Unsaved').
- **Demo:** [/ai-audit](/ai-audit)
- **Code:** `src/app/features/ai-demos/`

### 6. Angular Aria (Headless UI)

Showcases the "Headless" approach to accessible components using the official `@angular/aria` package. Provides full accessibility (keyboard nav, focus management, ARIA roles) while leaving the DOM structure and styling completely up to you.

**Components Demonstrated:**
- **Menu** (`@angular/aria/menu`): Accessible dropdown menu with keyboard navigation
- **Listbox** (`@angular/aria/listbox`): Accessible list selection with arrow key navigation
- **Tree** (`@angular/aria/tree`): Accessible tree view with expand/collapse functionality

- **Demo:** [/aria](/aria)
- **Code:** `src/app/features/aria/`

## 🤖 AI Integrations

Angular v21 has enhanced AI-first developer experience. Learn more at [angular.dev/ai](https://angular.dev/ai).

### Gemini CLI Angular Extension

For AI-powered Angular development with Gemini CLI, install the official Angular extension:

```bash
gemini extensions install https://github.com/gemini-cli-extensions/angular
```

This provides Angular-aware context and best practices directly in your CLI workflow.

## 📚 Learn More: Mastering Angular Signals

<a href="https://leanpub.com/mastering-angular-signals/c/GO2026">
  <img src="public/mastering_angular_signals.png" alt="Mastering Angular Signals Book Cover" width="300" />
</a>

Dive deep into Angular's reactive future with **Mastering Angular Signals**!

🎉 **Get a huge discount** using [this link](https://leanpub.com/mastering-angular-signals/c/GO2026)! (Expires 31st of January)

After 31st Jan, you can use the coupon code: **CWA-50-OFF** or this [link](https://leanpub.com/mastering-angular-signals/c/CWA-50-OFF)

> **Coming Soon:** Signal Forms content will be added to the book!

## 🛠️ Tech Stack

- **Framework:** Angular v21 (next)
- **Styling:** TailwindCSS v4 + DaisyUI 5
- **Build Tool:** Angular CLI (Esbuild/Vite)
- **Testing:** Vitest (configured via `ng test`)

## 🚀 Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run the Application:**

   ```bash
   npm start
   ```

   Navigate to `http://localhost:4200`.

3. **Run Tests:**
   ```bash
   npm test
   ```

## 📝 Design Philosophy

This showcase emphasizes the **"Signal-First"** mental model. You will notice minimal usage of RxJS for view-layer logic, replaced by synchronous Signal reads and derived state.
