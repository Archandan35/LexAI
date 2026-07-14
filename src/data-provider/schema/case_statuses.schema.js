export const CaseStatusesSchema = {
  collection: 'case_statuses',
  label: 'Case Statuses',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    short_code: 'string',
    description: 'string',
    display_order: 'number',
    color: 'string',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { display_order: 0, color: '#6b7280', status: 'Active', description: '' },
  indexes: ['name', 'short_code', 'status', 'display_order'],
};

export default CaseStatusesSchema;
