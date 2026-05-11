## 2024-05-24 - [Accessibility]
**Learning:** The feedback overlay (correct/incorrect message) in the flashcard app is a critical interactive state that wasn't being announced to screen readers. Adding `role="alert"` and `aria-live="assertive"` fixes this. Also, the "Try Again" button requires `autoFocus` so keyboard users don't get stuck tabbing through the options again.
**Action:** Always ensure dynamic, assertive feedback states have `role="alert"` and carefully manage keyboard focus (`autoFocus` or programmatic `.focus()`) to maintain user flow after mistakes.
## 2026-05-02 - [Disabled States and Tooltips]
When implementing disabled states for UI elements without adding new CSS classes, use inline styling overrides (e.g., `opacity: 0.5` and `cursor: 'not-allowed'`) alongside the HTML `disabled` attribute to ensure reliable visual feedback. For accessibility, use the native HTML `title` attribute to provide tooltips that explain hidden logic constraints, such as why a specific UI element (e.g., the final active clef) is disabled or cannot be toggled.
## 2024-05-24 - [Accessibility]
**Learning:** Purely decorative icons (like those adjacent to textual labels) are often announced redundantly or unhelpfully by screen readers.
**Action:** Always add `aria-hidden="true"` to UI icons whose meaning is already conveyed by adjacent text, reducing cognitive load for visually impaired users.
## 2024-05-19 - Keyboard Shortcuts for Multiple Choice Options
**Learning:** Adding keyboard shortcuts (1-4 keys) directly into a quiz/multiple choice format dramatically speeds up user workflow and improves accessibility. By adding `<kbd>` visual hints with a `@media (hover: hover) and (pointer: fine)` query, we ensure mobile users don't see confusing prompts while desktop users immediately discover the shortcut. Combined with `aria-keyshortcuts`, it provides excellent context for screen readers.
**Action:** Re-use this `<kbd>` structure wrapped in the touch-device media query for other instances where numeric shortcuts correspond to sequential UI elements.
