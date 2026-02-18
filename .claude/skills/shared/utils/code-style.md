# Code Style

## Philosophy

- Code must read like a book.
- Logic must flow from top to bottom.
- A developer should understand intent without jumping across the file.
- Readability is more important than cleverness.
- Readability is more important than brevity.
- Predictability is more important than abstraction.

## Core Rules

- Use early returns for guard clauses.
- Handle edge cases first.
- Keep the happy path at the bottom.
- Do not compress logic into fewer lines.
- Do not write clever code.
- No nested ternaries.
- No complex inline expressions.
- Keep files visually scannable.
- Maintain logical spacing between blocks of code.

## Naming

- No single-letter variable names.
- Always use descriptive words.
- Boolean values must start with: `is`, `has`, `should`, `can`, `are`
- Avoid ambiguous names.
- Constants must be uppercase.
- No magic numbers.
- Extract spacing, animation durations, and layout values into constants.

```ts
const GAP = 4 as const
const ANIMATION_DURATION = 300 as const
```

## Exports

- Do not use default exports.
- Always use named exports.

```ts
export const WizardCard = () => {}
```
