import React, { useState } from 'react';

export default function AddUserForm({ onAdd }) {
  const [name, setName] = useState('');
  const submit = (e) => {
    e?.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
  };
  return (
    <div className="panel-card">
      <h4 style={{margin:'0 0 8px 0'}}>Add User</h4>
      <form className="add-form" onSubmit={submit}>
        <input placeholder="New user name" value={name} onChange={e=>setName(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
