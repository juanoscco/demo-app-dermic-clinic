// Definición de interfaces para tipos
interface User {
  id: number;
  name: string;
  dni: string;
  telefono: string;
  email: string;
}

export interface Appointment {
  id: number;
  user: User;
  fecha: string;
  horaInicio: string;
  HoraFinal: string;
  estado: string;
  distrito: string;
  sala: string;
  typeDoctor: string;
  doctor: string;
  llegada: string;
  entrada: string;
  salida: string;
}

export const appointments: Appointment[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Usuario 1",
      dni: "1234567",
      telefono: "123456789",
      email: "usuario1@ejemplo.com",
    },
    fecha: "2024-05-17",
    horaInicio: "08:00 AM",
    HoraFinal: "09:00 AM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 1",
    typeDoctor: "doctor",
    doctor: "Dr. Carlos Pérez",
    llegada: "07:45 AM",
    entrada: "08:00 AM",
    salida: "09:00 AM",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Usuario 2",
      dni: "2345678",
      telefono: "234567890",
      email: "usuario2@ejemplo.com",
    },
    fecha: "2024-05-17",
    horaInicio: "09:00 AM",
    HoraFinal: "10:00 AM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 2",
    typeDoctor: "cosmetra",
    doctor: "Dra. Ana Gómez",
    llegada: "08:45 AM",
    entrada: "09:00 AM",
    salida: "10:00 AM",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Usuario 3",
      dni: "3456789",
      telefono: "345678901",
      email: "usuario3@ejemplo.com",
    },
    fecha: "2024-05-17",
    horaInicio: "10:00 AM",
    HoraFinal: "11:00 AM",
    estado: "Confirmada",
    distrito: "San Isidro",
    sala: "Sala 3",
    typeDoctor: "doctor",
    doctor: "Dr. Javier Martínez",
    llegada: "09:45 AM",
    entrada: "10:00 AM",
    salida: "11:00 AM",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Usuario 4",
      dni: "0983843",
      telefono: "99990992",
      email: "usuario4@ejemplo.com",
    },
    fecha: "2024-05-20",
    horaInicio: "11:00 AM",
    HoraFinal: "01:00 PM",
    estado: "Confirmada",
    distrito: "San Isidro",
    sala: "Sala 3",
    typeDoctor: "doctor",
    doctor: "Dr. Lujan Carrion",
    llegada: "09:45 AM",
    entrada: "10:00 AM",
    salida: "11:00 AM",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Usuario 5",
      dni: "4536271",
      telefono: "987654321",
      email: "usuario5@ejemplo.com",
    },
    fecha: "2024-05-20",
    horaInicio: "01:00 PM",
    HoraFinal: "03:00 PM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 2",
    typeDoctor: "cosmetra",
    doctor: "Dra. María López",
    llegada: "12:45 PM",
    entrada: "01:00 PM",
    salida: "03:00 PM",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Usuario 6",
      dni: "3748295",
      telefono: "987654321",
      email: "usuario6@ejemplo.com",
    },
    fecha: "2024-05-20",
    horaInicio: "03:00 PM",
    HoraFinal: "05:00 PM",
    estado: "Confirmada",
    distrito: "San Isidro",
    sala: "Sala 1",
    typeDoctor: "doctor",
    doctor: "Dr. Alejandro Fernández",
    llegada: "02:45 PM",
    entrada: "03:00 PM",
    salida: "05:00 PM",
  },
  {
    id: 7,
    user: {
      id: 7,
      name: "Usuario 7",
      dni: "8392847",
      telefono: "987654321",
      email: "usuario7@ejemplo.com",
    },
    fecha: "2024-05-21",
    horaInicio: "08:00 AM",
    HoraFinal: "10:00 AM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 3",
    typeDoctor: "cosmetra",
    doctor: "Dra. Sofía Ramírez",
    llegada: "07:45 AM",
    entrada: "08:00 AM",
    salida: "10:00 AM",
  },
  {
    id: 8,
    user: {
      id: 8,
      name: "Usuario 8",
      dni: "6483927",
      telefono: "987654321",
      email: "usuario8@ejemplo.com",
    },
    fecha: "2024-05-21",
    horaInicio: "10:00 AM",
    HoraFinal: "12:00 PM",
    estado: "Confirmada",
    distrito: "San Isidro",
    sala: "Sala 2",
    typeDoctor: "doctor",
    doctor: "Dr. Pedro Díaz",
    llegada: "09:45 AM",
    entrada: "10:00 AM",
    salida: "12:00 PM",
  },
  {
    id: 9,
    user: {
      id: 9,
      name: "Usuario 9",
      dni: "1298347",
      telefono: "987654321",
      email: "usuario9@ejemplo.com",
    },
    fecha: "2024-05-20",
    horaInicio: "12:00 PM",
    HoraFinal: "02:00 PM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 1",
    typeDoctor: "doctor",
    doctor: "Dra. Andrea Sánchez",
    llegada: "11:45 AM",
    entrada: "12:00 PM",
    salida: "02:00 PM",
  },
  {
    id: 10,
    user: {
      id: 10,
      name: "Usuario 10",
      dni: "6574829",
      telefono: "987654321",
      email: "usuario10@ejemplo.com",
    },
    fecha: "2024-05-20",
    horaInicio: "02:00 PM",
    HoraFinal: "04:00 PM",
    estado: "Confirmada",
    distrito: "Los Olivos",
    sala: "Sala 3",
    typeDoctor: "doctor",
    doctor: "Dr. Daniel Vargas",
    llegada: "01:45 PM",
    entrada: "02:00 PM",
    salida: "04:00 PM",
  }
  

];
