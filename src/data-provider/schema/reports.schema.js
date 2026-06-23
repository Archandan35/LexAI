export const ReportsSchema = {
  collection: 'reports',
  label: 'Custom Reports',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    report_type: 'string',
    description: 'text',
    config: 'text',
    status: 'string',
    last_generated: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'report_type'],
  defaults: { status: 'Active', description: '', config: '{}', last_generated: '' },
  relations: [],
  indexes: ['name', 'report_type', 'status'],
};

export default ReportsSchema;
