export const CourtsSchema = {
  collection: 'courts',
  label: 'Courts',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    short_code: 'string',
    description: 'string',
    level: 'number',
    parent_id: 'string',
    display_order: 'number',
    color: 'string',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { level: 1, parent_id: null, display_order: 0, color: '#6b7280', status: 'Active', short_code: '', description: '' },
  relations: [{ field: 'parent_id', references: 'courts', on: 'id' }],
  indexes: ['name', 'level', 'parent_id', 'status'],
};

export default CourtsSchema;
