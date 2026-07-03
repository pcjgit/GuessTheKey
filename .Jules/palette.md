## 2024-05-24 - [Accessibility]
**Learning:** The feedback overlay (correct/incorrect message) in the flashcard app is a critical interactive state that wasn't being announced to screen readers. Adding `role="alert"` and `aria-live="assertive"` fixes this. Also, the "Try Again" button requires `autoFocus` so keyboard users don't get stuck tabbing through the options again.
**Action:** Always ensure dynamic, assertive feedback states have `role="alert"` and carefully manage keyboard focus (`autoFocus` or programmatic `.focus()`) to maintain user flow after mistakes.
## 2026-05-02 - [Disabled States and Tooltips]
When implementing disabled states for UI elements without adding new CSS classes, use inline styling overrides (e.g., `opacity: 0.5` and `cursor: 'not-allowed'`) alongside the HTML `disabled` attribute to ensure reliable visual feedback. For accessibility, use the native HTML `title` attribute to provide tooltips that explain hidden logic constraints, such as why a specific UI element (e.g., the final active clef) is disabled or cannot be toggled.
## 2024-05-24 - [Accessibility]
**Learning:** Purely decorative icons (like those adjacent to textual labels) are often announced redundantly or unhelpfully by screen readers.
**Action:** Always add `aria-hidden="true"` to UI icons whose meaning is already conveyed by adjacent text, reducing cognitive load for visually impaired users.
## 2026-05-12 - Dynamic Main Heading Context
**Learning:** Updating a single static page heading based on the active state/route is a critical UX pattern. In an SPA, users can lose context when switching between different exercises if the main heading doesn't change.
**Action:** Always ensure the primary heading (`<h1>`) reflects the current context or task to improve spatial orientation and screen reader experience.
## 2024-05-24 - [Accessibility] Dynamic Document Titles
**Learning:** In a Single Page Application (SPA), the page content changes without a full page reload, meaning the `<title>` tag doesn't automatically update. This leaves screen reader users without crucial context about their current state, and makes browser tabs indistinguishable.
**Action:** Always dynamically update `document.title` to reflect the active route, task, or context (e.g., `document.title = \`\${currentContext} | App Name\``) to improve spatial orientation and tab navigation.
## 2024-05-24 - [Accessible Control Groups]
**Learning:** Grouped interactive elements (like custom toggle buttons behaving as radio groups) are often indistinguishable to screen readers without proper grouping semantics, leaving users confused about context.
**Action:** Always wrap custom control groups in `role="group"` and associate them with their respective heading using `aria-labelledby` to provide immediate context upon focus.

## 2024-05-18 - [Add icons to stats badges]
**Learning:** Visual consistency in top-level status bars goes a long way. The "Streak" badge had an icon, while "Score" and "Total" lacked one. By filling in the gaps with semantic icons (`Star` and `Hash`) using the same design patterns (`aria-hidden="true"`, correct spacing, consistent colors), the header feels substantially more balanced and complete without any layout shift or major effort.
**Action:** Always scan adjacent visual elements for symmetry or implied patterns, and use existing iconography systems (`lucide-react`) to bring stragglers in line.
## 2024-05-25 - [Programmatic Focus Management]
**Learning:** When disabling elements dynamically (e.g. while displaying a feedback overlay), keyboard users lose their focus position. This can force them to start tabbing from the top of the document once the element is re-enabled.
**Action:** Always programmatically restore focus using `ref.current?.focus()` to a logical position (like the first option in a group) when transitioning out of a temporarily disabled state, and use `:not(:disabled)` in CSS for hover states to prevent confusing visual interactions when elements shouldn't be interacted with.

## 2026-05-20 - [Action Button Icons]
**Learning:** Adding context-specific icons to action buttons and toggles (e.g., 'Try Again', 'Next Question', 'Sound') improves rapid recognition, especially during quick-paced practice sessions. It balances out the visual weight of text-only buttons and creates consistency across the UI.
**Action:** Always scan for heavily-used text buttons and consider adding semantic icons with `aria-hidden="true"` using `inline-flex` and `gap` for proper alignment.
## 2024-05-25 - [Accessibility] Respect user motion preferences
**Learning:** Users with vestibular disorders or motion sensitivities can experience nausea, dizziness, or headaches from CSS animations (like `bounce`, `slideIn`, or `popIn`). These should be disabled for users who have requested reduced motion in their OS settings.
**Action:** Always include a global `@media (prefers-reduced-motion: reduce)` block in the root CSS file (like `index.css`) that aggressively disables `animation-duration`, `transition-duration`, and `scroll-behavior` for `*, *::before, *::after` using `!important`.

## $(date +%Y-%m-%d) - [Contextual Iconography]
**Learning:** In a Single Page Application (SPA) where the main interface and layout remain static while internal task modes change (like different practice modes), static main heading icons can leave the interface feeling disconnected from the current user flow.
**Action:** Always use contextual iconography consistently across navigation controls (e.g., toggle buttons) and primary headings. Mirroring the active mode's icon in the main heading reinforces the visual context and improves spatial orientation.
## 2026-05-23 - [Tooltip Explanations for Disabled Controls]
**Learning:** Disabling an element to prevent invalid states is good, but without explaining *why* it's disabled, the user is left guessing. The native `title` attribute is a lightweight, zero-dependency way to add this context for mouse users, improving clarity instantly.
**Action:** When conditionally disabling user controls (like answer options during a feedback overlay), add a descriptive `title` attribute so users understand the constraint.
## 2024-05-24 - [Consolidating Binary Options into Single Toggle Buttons]
**Learning:** Using separate buttons for binary ON/OFF settings (like sound) increases cognitive load and clutters the UI, especially when using standard icons that can communicate state natively.
**Action:** When a binary state is presented, consolidate it into a single toggle button utilizing `aria-pressed` and dynamic tooltips, which improves both spatial UI efficiency and accessibility semantics for screen readers.
## 2026-05-26 - [Visual Tracking of Incorrect Guesses]
**Learning:** When users make a mistake in a multiple-choice question, visually tracking and disabling the incorrectly guessed options significantly reduces cognitive load and frustration by preventing repeated mistakes. However, when returning from a feedback overlay, focus must be carefully restored to the *first available* (non-guessed) option to prevent focus-loss bugs for keyboard users.
**Action:** Always visually distinguish and disable previously failed attempts in interactive guessing games, and ensure programmatic focus management () respects these newly disabled states.
## 2026-05-26 - [Visual Tracking of Incorrect Guesses]
**Learning:** When users make a mistake in a multiple-choice question, visually tracking and disabling the incorrectly guessed options significantly reduces cognitive load and frustration by preventing repeated mistakes. However, when returning from a feedback overlay, focus must be carefully restored to the *first available* (non-guessed) option to prevent focus-loss bugs for keyboard users.
**Action:** Always visually distinguish and disable previously failed attempts in interactive guessing games, and ensure programmatic focus management (`ref.current?.focus()`) respects these newly disabled states.

## 2026-05-26 - Dynamic aria-labels for Musical Notation SVG
**Learning:** Translating an SVG/canvas visual puzzle (like VexFlow output) into an equivalent logic puzzle description for screen readers using a dynamic `aria-label` allows visually impaired users to engage with spatial or visual-heavy content.
**Action:** Use context-aware `aria-label` descriptions generated from state rather than generic fallbacks when replacing complex visual output.

## 2026-05-27 - [Visual Elimination States]
**Learning:** When users make an incorrect guess and the option is visually eliminated (e.g., via `textDecoration: 'line-through'`), screen readers only perceive the button as `disabled`. This missing context leaves users wondering why an option is disabled and whether it was their previous guess.
**Action:** Always complement visual elimination states (like line-throughs or grayed-out text) with an explicit `<span className="sr-only">` explaining the state change to screen readers.

## 2026-05-28 - [Accessible Visual Puzzles]
**Learning:** While setting `aria-label` on dynamic visual content (like a VexFlow SVG wrapper) is good, it isn't enough for users to actually consume it during rapid state changes. A visually impaired user must be able to discover the element via tab navigation (`tabIndex={0}`) AND be notified when the content changes automatically.
**Action:** When dynamically generating complex visual output that represents a core task/puzzle, always make the wrapper keyboard-focusable (`tabIndex={0}`) with a clear `:focus-visible` outline. Additionally, pair this with an `aria-live` region elsewhere in the DOM to announce the new puzzle when the state changes so users don't have to manually re-focus to hear the update.

## 2026-06-12 - [Natural Language ARIA Labels]
**Learning:** Technical descriptions in `aria-label` (e.g., "3 flats") are functional but can be improved with natural language (e.g., "3 flats") and proper pluralization ("1 sharp" vs "2 sharps") to sound more human and clear for screen reader users. Handling the "zero" case with descriptive phrases like "no sharps or flats" is much more intuitive than "0 none".
**Action:** Always apply natural language and grammar-aware logic (pluralization, zero-case descriptions) when generating dynamic `aria-label` strings from application state.

## 2026-06-12 - [Visual Affordance for Tooltips]
**Learning:** Non-interactive elements that provide information via the `title` attribute (tooltips) are often missed by users because there is no visual cue that more info is available.
**Action:** Use `cursor: help` on elements with informative `title` attributes to signal to the user that additional context is available on hover.

## 2026-06-19 - [Delight and Accessibility]
**Learning:** Combining randomized feedback messages with improved visual contrast and cursor affordances () on disabled elements creates a much more "polished" and accessible feel with minimal code.
**Action:** Always check if a disabled state has a 'why' (e.g., a title) and use `cursor: help` to guide the user to that information.

## 2025-05-15 - [Delight and Accessibility]
**Learning:** Combining randomized feedback messages with improved visual contrast and cursor affordances (cursor: help) on disabled elements creates a much more "polished" and accessible feel with minimal code.
**Action:** Always check if a disabled state has a 'why' (e.g., a title) and use `cursor: help` to guide the user to that information.

## 2026-07-03 - [Micro-UX: Consistency and Thematic Polish]
**Learning:** Small thematic touches, like adding clef symbols (𝄞, 𝄢) to selection buttons, provide immediate visual context and reinforce the musical theme. Similarly, maintaining a consistent layout by avoiding conditional rendering of global toggles (like "Sound") prevents layout shifts and improves the sense of stability in the UI.
**Action:** Always look for opportunities to add thematic icons and ensure global settings are persistent across different application modes to minimize cumulative layout shift (CLS).
