export const PrecedentsSchema = {
  collection: 'precedents',
  label: 'Precedent Vault',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    title: 'string',
    citation: 'string',
    court: 'string',
    date: 'string',
    bench: 'string',
    tags: 'text',
    is_favorite: 'boolean',
    case_name: 'string',
    notes: 'text',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['title', 'citation'],
  defaults: { status: 'Active', is_favorite: false, tags: '', notes: '' },
  relations: [],
  indexes: ['title', 'citation', 'court', 'status', 'is_favorite'],
};

export default PrecedentsSchema;
