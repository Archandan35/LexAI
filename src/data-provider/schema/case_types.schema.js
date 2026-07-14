export const CaseTypesSchema = {
  collection: 'case_types',
  label: 'Case Types',
  primaryKey: 'id',
  core: false,
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
  required: ['name', 'short_code'],
  defaults: { display_order: 0, color: '#6b7280', status: 'Active', description: '' },
  relations: [],
  indexes: ['short_code', 'status', 'display_order'],
};

export default CaseTypesSchema;
