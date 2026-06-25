export const CaseTagsSchema = {
  collection: 'case_tags',
  label: 'Case Tags',
  primaryKey: 'id',
  core: false,
  fields: {
    id: 'string',
    name: 'string',
    color: 'string',
    display_order: 'number',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { display_order: 0 },
  indexes: ['name'],
};

export default CaseTagsSchema;
