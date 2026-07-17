export const ProvisionsSchema = {
  collection: 'provisions',
  label: 'Legal Provisions',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    short_code: 'string',
    description: 'text',
    display_order: 'number',
    color: 'string',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { display_order: 0, color: '#6b7280', status: 'Active', description: '' },
  indexes: ['name', 'short_code', 'status', 'display_order'],
  relations: [],
};

export default ProvisionsSchema;
