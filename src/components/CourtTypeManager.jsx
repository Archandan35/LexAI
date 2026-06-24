import React from 'react';
import EntityManager from './EntityManager.jsx';
import { courtLogic } from '@/logic/courtLogic.js';

export default function CourtTypeManager({ open, onClose, courts, onChanged }) {
  return (
    <EntityManager
      open={open}
      onClose={onClose}
      title="Court Types"
      logic={courtLogic}
      items={courts}
      onChanged={onChanged}
      fields={[]}
    />
  );
}
