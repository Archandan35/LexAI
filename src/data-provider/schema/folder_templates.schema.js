export const FolderTemplatesSchema = {
  collection: 'folder_templates',
  label: 'Folder Templates',
  primaryKey: 'id',
  core: false,
  fields: {
    id: 'string',
    name: 'string',
    kind: 'string',
    system: 'boolean',
    display_order: 'number',
    created_at: 'datetime',
    updated_at: 'datetime',
  },
  required: ['name'],
  defaults: { kind: 'document', system: false, display_order: 0 },
  indexes: ['name', 'kind'],
};

export default FolderTemplatesSchema;
