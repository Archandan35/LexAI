import React, { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { Input } from './Field.jsx';

export default function InlineEntityManager({ open, onClose, title, fields, onSave }) {
  const [values, setValues] = useState({});

  const handleSave = () => {
    onSave({ ...values });
    setValues({});
  };

  return (
    <Modal open={open} title={title} onClose={onClose} size="sm"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button icon="plus" onClick={handleSave}>Save</Button></>}>
      {fields.map((f) => (
        <div className="field" key={f.key} style={{ marginBottom: 10 }}>
          <label>{f.label}</label>
          {f.type === 'color' ? (
            <input type="color" className="input" value={values[f.key] || f.default || ''} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          ) : (
            <Input value={values[f.key] || ''} placeholder={f.placeholder || f.label} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
    </Modal>
  );
}
