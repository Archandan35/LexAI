export const ReminderTypesSchema = {
  collection: 'reminder_types',
  label: 'Reminder Types',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    description: 'string',
    display_order: 'number',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { display_order: 0, status: 'Active', description: '' },
  relations: [],
  indexes: ['name', 'status'],
};

export default ReminderTypesSchema;
