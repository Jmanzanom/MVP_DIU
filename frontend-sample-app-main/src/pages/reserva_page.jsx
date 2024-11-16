import React, { useState } from 'react';

const createTimeSlots = (startHour, endHour) => {
  const timeSlots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    timeSlots.push({
      time: `${hour < 10 ? `0${hour}` : hour}:00`,
      available: Math.random() > 0.3, // 70% de disponibilidad
    });
  }
  return timeSlots;
};

const dummyAvailability = {
  "Biblioteca Campus San Joaquín": {
    "2-4 personas": [
      { name: "Estación 1", slots: createTimeSlots(8, 20) },
      { name: "Estación 2", slots: createTimeSlots(8, 20) },
      { name: "Estación 3", slots: createTimeSlots(8, 20) },
      { name: "Estación 4", slots: createTimeSlots(8, 20) },
      { name: "Estación 5", slots: createTimeSlots(8, 20) },
      { name: "Estación 6", slots: createTimeSlots(8, 20) },
    ],
    "6+ personas": [
      { name: "Sala 1", slots: createTimeSlots(8, 20) },
      { name: "Sala 2", slots: createTimeSlots(8, 20) },
    ],
  },
};

export const ReservaPage = () => {
  const [location] = useState('Biblioteca Campus San Joaquín');
  const [capacity, setCapacity] = useState('');
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [rol, setRol] = useState('');

  const handleShowAvailability = () => {
    if (capacity && date) {
      setAvailability(dummyAvailability[location][capacity]);
      setSelectedBlocks([]); // Reiniciar selección
    } else {
      alert('Por favor, selecciona la capacidad y la fecha.');
    }
  };

  const handleBlockSelect = (stationIndex, time) => {
    const blockId = `${stationIndex}-${time}`;
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId));
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const handleReserve = () => {
    if (!/^\d{9}-[0-9Kk]$/.test(rol)) {
      alert('Por favor, introduce un rol válido en el formato: 9 números - 0-9 o K/k');
      return;
    }

    if (selectedBlocks.length > 0) {
      alert(`Reserva realizada para los bloques: ${selectedBlocks.join(', ')} con el rol: ${rol}`);
    } else {
      alert('Por favor, selecciona al menos un bloque para reservar.');
    }
  };

  return (
    <div className="reservation-system">
      <h1>Nueva reserva</h1>

      {/* Localización */}
      <label>
        Localización:
        <select value={location} disabled>
          <option value="Biblioteca Campus San Joaquín">Biblioteca Campus San Joaquín</option>
        </select>
      </label>
      <br />

      {/* Capacidad */}
      <label>
        Capacidad:
        <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
          <option value="">Seleccione la capacidad</option>
          <option value="2-4 personas">2 - 4 personas máximo</option>
          <option value="6+ personas">6+ personas</option>
        </select>
      </label>
      <br />

      {/* Fecha */}
      <label>
        Fecha:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br /><br />

      {/* Botón para mostrar disponibilidad */}
      <button onClick={handleShowAvailability}>Mostrar disponibilidad</button>

      {/* Tabla de disponibilidad */}
      {availability.length > 0 && (
        <div className="availability">
          <h2>{capacity} @ {location}</h2>
          <p>Opciones disponibles para el {date}:</p>

          {/* Leyenda de colores */}
          <div className="legend">
            <span style={{ display: 'inline-block', backgroundColor: 'green', color: 'white', padding: '5px', marginRight: '10px' }}>
              Disponible
            </span>
            <span style={{ display: 'inline-block', backgroundColor: 'red', color: 'white', padding: '5px', marginRight: '10px' }}>
              Ocupado
            </span>
            <span style={{ display: 'inline-block', backgroundColor: 'orange', color: 'white', padding: '5px', marginRight: '10px' }}>
              Seleccionado
            </span>
          </div>
          <br />

          <table className="availability-table">
            <thead>
              <tr>
                <th>Estación</th>
                {availability[0].slots.map((slot, index) => (
                  <th key={index}>{slot.time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {availability.map((station, stationIndex) => (
                <tr key={stationIndex}>
                  <td>{station.name}</td>
                  {station.slots.map((slot, timeIndex) => (
                    <td
                      key={timeIndex}
                      style={{
                        backgroundColor: selectedBlocks.includes(`${stationIndex}-${slot.time}`)
                          ? 'orange'
                          : slot.available
                          ? 'green'
                          : 'red',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        color: 'white',
                        textAlign: 'center',
                      }}
                      onClick={() =>
                        slot.available && handleBlockSelect(stationIndex, slot.time)
                      }
                    >
                      {slot.available ? 'Disponible' : 'Ocupado'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rol y botón de reserva */}
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

          <button onClick={handleReserve}>Solicitar reserva</button>
        </div>
      )}
    </div>
  );
};

export default ReservaPage;
