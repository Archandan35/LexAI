export const DraftTypesSchema = {
  collection: 'draft_types',
  label: 'Draft Types',
  primaryKey: 'id',
  core: false,
  fields: {
    id: 'string',
    name: 'string',
    label: 'string',
    group: 'string',
    display_order: 'number',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'label'],
  defaults: { group: 'General', display_order: 0 },
  indexes: ['name', 'group'],
};

export default DraftTypesSchema;
