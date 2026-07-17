export const TypeOfProceedingSchema = {
  collection: 'type_of_proceeding',
  label: 'Type of Proceeding',
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
  relations: [],
};

export default TypeOfProceedingSchema;
