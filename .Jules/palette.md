## 2024-05-24 - [Accessibility]
**Learning:** The feedback overlay (correct/incorrect message) in the flashcard app is a critical interactive state that wasn't being announced to screen readers. Adding `role="alert"` and `aria-live="assertive"` fixes this. Also, the "Try Again" button requires `autoFocus` so keyboard users don't get stuck tabbing through the options again.
**Action:** Always ensure dynamic, assertive feedback states have `role="alert"` and carefully manage keyboard focus (`autoFocus` or programmatic `.focus()`) to maintain user flow after mistakes.

## 2024-05-02 - Disable Interactive Controls During Async Wait States
**Learning:** Disabling buttons during audio playback or async validation explicitly prevents accidental duplicate events that might cause race conditions, and providing tooltips on hidden disabled logic (like not being able to uncheck the last active item) gives clarity.
**Action:** Always map disabled boolean props directly to UI elements along with inline opacity/cursor overrides when custom class styling is restricted.
