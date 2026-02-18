# Project Structure

- Each feature or component has its own folder.
- The main file name must match the feature/component name.
- Each folder must contain `index.ts` that re-exports the public API.
- Do not import deep internal files from outside the folder.
- Treat each folder as a strict API boundary.
- No cross-feature deep imports.
- No circular dependencies.
- Keep structure flat and predictable.
- Allowed internal subfolders:
  - `components`
  - `hooks`
  - `consts`
