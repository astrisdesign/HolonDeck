# JExTile Gantt — Development TODO

## Status: Initial Implementation Complete

`gantt/index.html` is a single-file, no-build Gantt editor extending the JExTile
JSON object model. It opens directly in a browser with sample data pre-loaded.

---

## What Works

- Split-panel layout: left row table (name, assigned, duration, %) + right timeline
- Task bars rendered from JSON startDate/endDate/duration
- Day/Week/Month zoom toggle on the timeline header
- Drag task bars horizontally to shift dates (snaps to day grid)
- Resize task bars by dragging the right edge (updates duration + endDate)
- Add row button (appends a 7-day task starting today)
- Delete row button (removes task and all its predecessor/successor links)
- Inline edit of task name and assignedTo via double-click
- Critical path highlighted in red (CPM forward/backward pass)
- % complete shown as a filled portion of the bar
- Collapsible JSON sidebar with live output
- Export button copies JSON to clipboard
- Import button accepts pasted JSON array and replaces state
- Dependency arrows rendered as SVG bezier curves, color-coded by type:
  - FS = blue, FF = green, SS = orange, SF = red
- Synchronized vertical scrolling between left and right panels
- Dark theme matching JExTile color palette

---

## Known Issues

### 1. Dependency arrow drawing (drag from connector) does not work
- **Expected:** Hover a task bar → right connector dot appears → mousedown on dot
  → drag to another bar's left connector dot → creates FS link
- **Actual:** The drag gesture does not register or complete the connection.
  The preview line may not appear or the drop target is not detected.
- **Workaround:** Edit predecessors directly in the JSON Import panel.
- **Likely cause:** The `.bar-cr` connector dot sits at `right: -6px` (outside
  the bar's overflow:visible area), and the mousedown may be captured by the
  parent bar's handler before the connector handler fires. Also,
  `document.elementFromPoint` at mouseup may return the SVG overlay rather than
  the target bar.

### 2. Inline editing limited to name and assignedTo fields
- **Expected:** Double-clicking duration (%), assigned, or other cells opens an
  inline editor.
- **Actual:** Only the name and assignedTo cells respond to double-click. The
  duration and % cells render as read-only text.
- **Workaround:** Use the JSON Import panel to edit any field directly.
- **Likely cause:** The `ondblclick="editCell(...)"` handler is only wired to
  `.lc-name` and `.lc-who` elements. The `.lc-dur` and `.lc-pct` cells were
  not given edit handlers in the initial implementation.

---

## Planned Fixes

- [ ] Fix connector dot drag-to-connect interaction
  - Move mousedown listener to connector dot only, use `stopPropagation`
  - Track drag via `pointerId` / `setPointerCapture` for reliable cross-element drop
  - Use element hit-testing on a specific layer rather than `elementFromPoint`
- [ ] Add `ondblclick` inline editing to duration and % cells
- [ ] Add inline date editing (startDate / endDate) directly in the left panel
- [ ] Right-click arrow deletion: confirm SVG `pointer-events: stroke` works
  cross-browser; provide a fallback delete button in a context menu div
- [ ] Scroll-to-today button (jump timeline to current date)
- [ ] Today marker line on the timeline
- [ ] Drag-to-reorder rows in the left panel
- [ ] Validate that import JSON merges predecessor/successor symmetry
- [ ] Test on Firefox (SVG pointer-events behavior may differ from Chrome)
