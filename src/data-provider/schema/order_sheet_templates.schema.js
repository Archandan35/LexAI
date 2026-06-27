// Universal schema — orderSheetTemplates (order-sheet rendering definitions).
export const OrderSheetTemplatesSchema = {
  collection: 'order_sheet_templates',
  label: 'Order Sheet Templates',
  primaryKey: 'id',
  core: false,
  fields: {
    id: 'string',
    name: 'string',
    isDefault: 'boolean',
    fields: 'array',
    historyFormat: 'string',
  },
  required: ['name'],
  defaults: { isDefault: false, fields: [] },
  relations: [],
  indexes: [],
};

export default OrderSheetTemplatesSchema;
