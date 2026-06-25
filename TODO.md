# TODO — Courts management fixes & enhancements

- [ ] Update courts schema to include `short_code`
- [ ] Update courtsLogic create/update:
  - [ ] auto-fill `short_code` from `name` when missing
  - [ ] support `parent_name` -> resolve `parent_id`
- [ ] Refactor `src/app/pages/Courts.jsx`:
  - [ ] Replace inline edit row controls with modal-based edit (fix parent dropdown click/render)
  - [ ] Keep hierarchy drag/drop for display_order + parent_id
  - [ ] Add bulk add/delete/import:
    - [ ] Normal text paste bulk add (supports parent name)
    - [ ] CSV import (via existing CrudManager)
    - [ ] JSON import (custom parser)
- [ ] Implement auto-fill short_code when court name changes in UI
- [ ] Quick manual test checklist:
  - [ ] Edit parent dropdown opens reliably
  - [ ] No extra dropdown after saving/cancelling
  - [ ] Bulk add works with text/CSV/JSON
  - [ ] Short codes persist and auto-generate
