**JExTile** is a universal structured-data viewer and editor built with **Tauri 2.0, React, and TypeScript**. It treats any JSON object as a set of recursive "Tile" widgets, allowing users to navigate complex data structures through a unified UI paradigm that functions identically at every depth of the document tree.

### Core User Experience: Recursive Tiles
The application reimagines standard file tree navigation as a recursive drill-down interface.
*   **The Tile Metaphor:** Every object is presented as a "Tile" containing a compact summary (selected fields, truncated values) for lists, and a full inspection view for detailed editing.
*   **Recursive Context:** Double-clicking into a tile establishes that object as the new top-level context. This allows the user to traverse deep hierarchies without changing the UI paradigm or losing focus.
*   **Schema-Driven Extensions:** While the default view is a raw recursive editor, the app supports specialized "Editors." By detecting specific schema definitions within the JSON, JExTile can render domain-specific views—such as Tech Trees or Gantt charts.

