import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

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
      const reservedTimes = selectedBlocks.map(block => block.split('-')[1]);
      const selectedStations = selectedBlocks.map(block => {
        const [stationIndex, time] = block.split('-');
        return {
          station: availability[stationIndex].name,
          time,
        };
      });

      setReservationDetails({
        rol,
        selectedStations,
        date,
      });
      setShowConfirmModal(true);
    } else {
      alert('Por favor, selecciona al menos un bloque para reservar.');
    }
  };

  const handleConfirmReservation = () => {
    // Actualizar la disponibilidad a "ocupado"
    const updatedAvailability = [...availability];
    selectedBlocks.forEach(block => {
      const [stationIndex, time] = block.split('-');
      updatedAvailability[stationIndex].slots = updatedAvailability[stationIndex].slots.map(slot => 
        slot.time === time ? { ...slot, available: false } : slot
      );
    });

    setAvailability(updatedAvailability); // Actualizar disponibilidad en el estado
    setReservations([
      ...reservations,
      {
        rol,
        selectedStations: reservationDetails?.selectedStations,
        date,
      },
    ]);
    setSelectedBlocks([]); // Deseleccionar los bloques después de la confirmación
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCancelReservation = (reservation) => {
    setReservationToDelete(reservation);
    setShowDeleteModal(true);
  };

  const handleDeleteReservation = () => {
    // Eliminar la reserva de la lista
    setReservations(reservations.filter((reservation) => reservation !== reservationToDelete));
    setShowDeleteModal(false);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
  };
  
  const isTimeAvailable = (time) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const [hour, minute] = time.split(':').map(Number);
    // Compara si el horario es posterior al horario actual
    return hour > hours || (hour === hours && minute > minutes);
  };
  

  return (
    <div className="reservation-system">
      <h1>Nueva reserva</h1>
      <hr />
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Bloquear fechas anteriores a hoy
        />
      </label>
      <br /><br />

      {/* Botón para mostrar disponibilidad */}
      <button onClick={handleShowAvailability}>Mostrar disponibilidad</button>

      {/* Tabla de disponibilidad */}
      {availability.length > 0 && (
        <div className="availability">
          <h2>{capacity} @ {location}</h2>
          <p>Opciones disponibles para el {date}:</p>

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
          <div className='scroll-container'>
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
          </div>

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

      {/* Modal de confirmación */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha:</strong> {reservationDetails?.date}</p>
          {reservationDetails?.selectedStations.map((station, index) => (
            <p key={index}><strong>Sala/Estación:</strong> {station.station} <strong>Horario:</strong> {station.time}</p>
          ))}
          <p><strong>Rol:</strong> {reservationDetails?.rol}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleConfirmReservation}>Confirmar</button>
          <button onClick={() => setShowConfirmModal(false)}>Cancelar</button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reserva Confirmada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Su reserva ha sido confirmada con éxito!</p>
          <p><strong>Fecha:</strong> {reservationDetails?.date}</p>
          {reservationDetails?.selectedStations.map((station, index) => (
            <p key={index}><strong>Sala/Estación:</strong> {station.station} <strong>Horario:</strong> {station.time}</p>
          ))}
          <p><strong>Rol:</strong> {reservationDetails?.rol}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseSuccessModal}>Cerrar</button>
        </Modal.Footer>
      </Modal>

      {/* Lista de reservas */}
      <br />
      <h3>Mis Reservas:</h3>
      <hr />
      {reservations.length === 0 ? (
        <p>Aún no has realizado ninguna reserva</p>
      ) : (
        <ul>
          {reservations.map((reservation, index) => (
            <li key={index}>
              <p><strong>Fecha:</strong> {reservation.date}</p>
              {reservation.selectedStations.map((station, idx) => (
                <p key={idx}><strong>Sala/Estación:</strong> {station.station} <strong>Horario:</strong> {station.time}</p>
              ))}
              <p><strong>Rol:</strong> {reservation.rol}</p>
              <button
                className="cancel-reservation-btn"
                onClick={() => handleCancelReservation(reservation)}
              >
                Cancelar reserva
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta reserva?
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleDeleteReservation}>Confirmar</button>
          <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default ReservaPage;
