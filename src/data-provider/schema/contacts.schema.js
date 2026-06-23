export const ContactsSchema = {
  collection: 'contacts',
  label: 'Contacts',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    type: 'string',
    phone: 'string',
    email: 'string',
    organization: 'string',
    address: 'string',
    notes: 'text',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name', 'type'],
  defaults: { status: 'Active', notes: '' },
  relations: [],
  indexes: ['name', 'type', 'email', 'status'],
};

export default ContactsSchema;
