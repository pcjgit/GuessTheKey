## 2024-05-24 - [Accessibility]
**Learning:** The feedback overlay (correct/incorrect message) in the flashcard app is a critical interactive state that wasn't being announced to screen readers. Adding `role="alert"` and `aria-live="assertive"` fixes this. Also, the "Try Again" button requires `autoFocus` so keyboard users don't get stuck tabbing through the options again.
**Action:** Always ensure dynamic, assertive feedback states have `role="alert"` and carefully manage keyboard focus (`autoFocus` or programmatic `.focus()`) to maintain user flow after mistakes.
## 2026-05-02 - [Disabled States and Tooltips]
When implementing disabled states for UI elements without adding new CSS classes, use inline styling overrides (e.g., `opacity: 0.5` and `cursor: 'not-allowed'`) alongside the HTML `disabled` attribute to ensure reliable visual feedback. For accessibility, use the native HTML `title` attribute to provide tooltips that explain hidden logic constraints, such as why a specific UI element (e.g., the final active clef) is disabled or cannot be toggled.
## 2024-05-24 - [Accessibility]
**Learning:** Purely decorative icons (like those adjacent to textual labels) are often announced redundantly or unhelpfully by screen readers.
**Action:** Always add `aria-hidden="true"` to UI icons whose meaning is already conveyed by adjacent text, reducing cognitive load for visually impaired users.

## 2024-05-18 - [Add Keyboard Shortcut Hints]
**Learning:** Adding `aria-keyshortcuts` and CSS hover-state `<kbd>` hints for multiple choice options provides excellent keyboard accessibility and a polished micro-UX for desktop users while hiding clutter on mobile (`@media (hover: hover) and (pointer: fine)`).
**Action:** Use this pattern to provide visible, screen-reader friendly keyboard shortcuts that gracefully degrade on touch devices.
