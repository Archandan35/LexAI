export const ClientsSchema = {
  collection: 'clients',
  label: 'Clients',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    name: 'string',
    contact_person: 'string',
    email: 'string',
    phone: 'string',
    address: 'string',
    client_type: 'string',
    linked_cases: 'number',
    payment_status: 'string',
    notes: 'text',
    status: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { status: 'Active', client_type: 'Individual', linked_cases: 0, payment_status: 'Pending', notes: '' },
  relations: [],
  indexes: ['name', 'email', 'status', 'client_type'],
};

export default ClientsSchema;
