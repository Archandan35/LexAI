export const JurisdictionsSchema = {
  collection: 'jurisdictions',
  label: 'Jurisdictions',
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
  relations: [],
  indexes: ['name', 'short_code', 'status'],
};

export default JurisdictionsSchema;
