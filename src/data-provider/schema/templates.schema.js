export const TemplatesSchema = {
  collection: 'templates',
  label: 'Templates Library',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    category: 'string',
    description: 'text',
    content: 'text',
    is_active: 'boolean',
    last_updated: 'string',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'category'],
  defaults: { status: 'Active', is_active: true, content: '' },
  relations: [],
  indexes: ['name', 'category', 'status'],
};

export default TemplatesSchema;
