import React, { useState } from 'react';

export const ReservaPage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Sala 1'); // Sala por defecto
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const handleReservation = () => {
    if (name && room && date && time && duration > 0) {
      setReservationConfirmed(true);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className='study-room-reservations-page'>
      <h2>Reserva de Salas de Estudio - USM</h2>
      <p>Completa los datos para reservar una sala de estudio</p>
      
      <label>
        Nombre:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ingresa tu nombre" 
        />
      </label>
      <br />

      <label>
        Sala de Estudio:
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="Sala 1">Sala 1</option>
          <option value="Sala 2">Sala 2</option>
          <option value="Sala 3">Sala 3</option>
          {/* Agrega más opciones de sala según disponibilidad */}
        </select>
      </label>
      <br />

      <label>
        Fecha:
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </label>
      <br />

      <label>
        Hora:
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
      </label>
      <br />

      <label>
        Duración (horas):
        <input 
          type="number" 
          value={duration} 
          onChange={(e) => setDuration(Number(e.target.value))} 
          min="1" 
          max="8" 
        />
      </label>
      <br /><br />

      <button onClick={handleReservation}>
        Confirmar Reserva
      </button>

      {reservationConfirmed && (
        <div>
          <h3>¡Reserva confirmada!</h3>
          <p>Gracias, {name}. Tu reserva para la {room} el {date} a las {time} por {duration} hora(s) ha sido confirmada.</p>
        </div>
      )}
    </div>
  );
};

export default ReservaPage;
