import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage('');

    try {
      const response = await fetch('https://flzzwcwm-5005.brs.devtunnels.ms/api/send_arrival_msg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
      });

      if (response.ok) {
        setMessage('Mensaje enviado correctamente');
      } else {
        setMessage('Error al enviar el mensaje');
      }
    } catch (error) {
      setMessage('Error al enviar el mensaje: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="App">
      <h1>MATE SELECTO</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" disabled={sending}>
          {sending ? 'Enviando mensaje...' : 'Enviar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
