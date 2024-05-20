// Definición de interfaces para tipos
interface User {
  id: number;
  name: string;
  dni: string;
  telefono: string;
  email: string;
}

interface Appointment {
  id: number;
  user: User;
  fecha: string;
  horaInicio: string;
  HoraFinal: string;
  estado: string;
  distrito: string;
  sala: string;
  doctor: string;
  llegada: string;
  entrada: string;
  salida: string;
}

// Fechas específicas
const startDate = new Date(2024, 4, 16); // 12 de mayo de 2024
const endDate = new Date(2024, 4, 20); // 17 de mayo de 2024

// Función para generar un número aleatorio de 7 dígitos
const generateRandomDNI = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

// Función para crear una cita con datos de usuario
const createAppointment = (
  id: number,
  date: Date,
  hourStart: string,
  hourEnd: string,
  status: string,
  room: string,
  doctor: string,
  arrival: string,
  entry: string,
  exit: string
): Appointment => ({
  id,
  user: {
    id,
    name: `Usuario ${id}`,
    dni: generateRandomDNI(),
    telefono: `Telefono${id}`,
    email: `usuario${id}@ejemplo.com`,
  },
  fecha: date.toLocaleDateString('en-CA'), // Formato yyyy-MM-dd
  horaInicio: hourStart,
  HoraFinal: hourEnd,
  estado: status,
  distrito: Math.random() > 0.5 ? "Los Olivos" : "San Isidro", // Asignación aleatoria
  sala: room,
  doctor: doctor,
  llegada: arrival,
  entrada: entry,
  salida: exit,
});

// Crear citas para un rango de fechas
const createAppointmentsForDateRange = (startDate: Date, endDate: Date): Appointment[] => {
  const appointments: Appointment[] = [];
  let id = 1;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    for (let i = 0; i < 5; i++) {
      appointments.push(
        createAppointment(
          id,
          new Date(currentDate),
          `08:00 AM`,
          `09:00 AM`,
          `Estado ${id}`,
          `Sala ${i + 1}`,
          `Doctor ${i + 1}`,
          `07:45 AM`,
          `08:00 AM`,
          `09:00 AM`
        )
      );
      id++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return appointments;
};

// Crear todas las citas
export const appointments: Appointment[] = createAppointmentsForDateRange(startDate, endDate);
