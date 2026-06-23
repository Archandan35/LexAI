export const LegalNoticesSchema = {
  collection: 'legal_notices',
  label: 'Legal Notices',
  primaryKey: 'id',
  core: true,
  fields: {
    id: 'string',
    notice_number: 'string',
    recipient: 'string',
    date: 'string',
    status: 'string',
    content: 'text',
    case_ref: 'string',
    sent_date: 'string',
    acknowledged_date: 'string',
    replied_date: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['notice_number', 'recipient'],
  defaults: { status: 'Draft', content: '' },
  relations: [],
  indexes: ['notice_number', 'recipient', 'status', 'date'],
};

export default LegalNoticesSchema;
