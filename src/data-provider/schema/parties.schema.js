export const PartiesSchema = {
  collection: 'parties',
  label: 'Parties',
  fields: {
    id: 'string',
    name: 'string',
    type: 'string',
    display_order: 'number',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'type'],
  defaults: { display_order: 0, status: 'Active' },
  indexes: ['type', 'status', 'display_order'],
};
