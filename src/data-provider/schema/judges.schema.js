export const JudgesSchema = {
  collection: 'judges',
  label: 'Judges',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    short_code: 'string',
    description: 'string',
    designation: 'string',
    court: 'string',
    display_order: 'number',
    color: 'string',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { status: 'Active', display_order: 0, color: '#6b7280', description: '' },
  relations: [],
  indexes: ['name', 'short_code', 'status', 'display_order'],
};

export default JudgesSchema;
