export const PromptsSchema = {
  collection: 'prompts',
  label: 'Prompt Library',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    category: 'string',
    content: 'text',
    last_used: 'string',
    usage_count: 'number',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'category'],
  defaults: { status: 'Active', usage_count: 0, last_used: '', content: '' },
  relations: [],
  indexes: ['name', 'category', 'status'],
};

export default PromptsSchema;
