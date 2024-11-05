import React, { useState } from 'react';

const createTimeSlots = (startHour, endHour) => {
  const timeSlots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    const nextHour = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
    timeSlots.push({ time: `${formattedHour} - ${nextHour}`, available: Math.random() >= 0.5 });
  }
  return timeSlots;
};

const dummyAvailability = {
  "Biblioteca Campus San Joaquín": {
    "2-4 personas": createTimeSlots(8, 20),
    "6+ personas": createTimeSlots(8, 20), 
  }
};

export const ReservaPage = () => {
  const [location] = useState('Biblioteca Campus San Joaquín');
  const [capacity, setCapacity] = useState('');
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [rol, setRol] = useState('');

  const handleShowAvailability = () => {
    if (capacity && date) {
      setAvailability(dummyAvailability[location][capacity]);
      setSelectedTimes([]); // Reiniciar selección
    } else {
      alert('Por favor, selecciona la capacidad y la fecha.');
    }
  };

  const handleTimeSelect = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const isValidRol = (rol) => {
    const rolRegex = /^\d{9}-[0-9Kk]$/; // Acepta 'K' o 'k'
    return rolRegex.test(rol);
  };

  const handleReserve = () => {
    if (!isValidRol(rol)) {
      alert('Por favor, introduce un rol válido en el formato: 9 números - 0-9 o K/k');
      return;
    }
    
    if (selectedTimes.length > 0) {
      alert(`Reserva realizada para los horarios: ${selectedTimes.join(', ')} con el rol: ${rol}`);
    } else {
      alert('Por favor, selecciona al menos un horario para reservar.');
    }
  };

  return (
    <div className='reservation-system'>
      <h1>Nueva reserva</h1>

      <label>
        Localización:
        <select value={location} disabled>
          <option value="Biblioteca Campus San Joaquín">Biblioteca Campus San Joaquín</option>
        </select>
      </label>
      <br />

      <label>
        Capacidad:
        <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
          <option value="">Seleccione la capacidad</option>
          <option value="2-4 personas">2 - 4 personas máximo</option>
          <option value="6+ personas">Space For 6+ people</option>
        </select>
      </label>
      <br />

      <label>
        Fecha:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br /><br />

      <button onClick={handleShowAvailability}>
        Mostrar disponibilidad
      </button>

      {availability.length > 0 && (
        <div className='availability'>
          <h2>{capacity} @ {location}</h2>
          <p>Opciones disponibles para el {date}:</p>
          <table className='availability-table'>
            <thead>
              <tr>
                <th>Horario</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.time}</td>
                  <td>
                    {slot.available ? (
                      <input
                        type="checkbox"
                        checked={selectedTimes.includes(slot.time)}
                        onChange={() => handleTimeSelect(slot.time)}
                      />
                    ) : (
                      'No Disponible'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {}
          <label>
            Rol:
            <input
              type="text"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              placeholder="Ej: 202173666-K"
            />
          </label>
          <br /><br />

          <button onClick={handleReserve}>
            Solicitar reserva
          </button>
        </div>
      )}
    </div>
  );
};
export default ReservaPage;
