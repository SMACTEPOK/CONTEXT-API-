import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    await updateProfile({ name });
    setIsSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Профіль</h1>
      
      <div className="lab-card">
        <h2 className="lab-card__title">Редагування профілю (Індивідуальне)</h2>
        
        {success && <div className="status-msg status-msg--success" style={{ marginBottom: '20px' }}>Профіль успішно оновлено!</div>}

        <form onSubmit={handleSave}>
          <div className="form-field">
            <label>Email (не можна змінити)</label>
            <input type="email" value={user.email} className="lab-input" disabled style={{ opacity: 0.5 }} />
          </div>
          <div className="form-field">
            <label>Ім'я</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="lab-input" />
          </div>
          
          <button type="submit" className="btn" disabled={isSaving || name === user.name}>
            {isSaving ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </form>
      </div>

      <div className="lab-card">
        <h2 className="lab-card__title">Зміна пароля</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Пароль змінено (імітація)'); }}>
          <div className="form-field"><label>Поточний пароль</label><input type="password" className="lab-input" required /></div>
          <div className="form-field"><label>Новий пароль</label><input type="password" className="lab-input" required /></div>
          <div className="form-field"><label>Підтвердження</label><input type="password" className="lab-input" required /></div>
          <button type="submit" className="btn">Змінити пароль</button>
        </form>
      </div>
    </div>
  );
}
