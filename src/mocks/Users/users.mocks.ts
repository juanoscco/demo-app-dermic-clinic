interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  slug: string;
  dni: string;
  rol: string;
  telefono: string;
}

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "N");
}

function generateSlug(apellidos: string, nombre: string, dni: string, id: number): string {
  return `${removeAccents(apellidos).toLowerCase()}-${removeAccents(nombre).toLowerCase()}-${dni}-${id}`;
}


export const users: User[] = [
  {
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez",
    email: "juan.perez@example.com",
    slug: 'perez-juan-12345678A-1',
    dni: "12345678A",
    rol: "Admin",
    telefono: "123-456-789"
  },
  {
    id: 2,
    nombre: "María",
    apellidos: "González",
    email: "maria.gonzalez@example.com",
    slug: generateSlug("González", "María", "87654321B", 2),
    dni: "87654321B",
    rol: "Usuario",
    telefono: "987-654-321"
  },
  {
    id: 3,
    nombre: "Carlos",
    apellidos: "Sánchez",
    email: "carlos.sanchez@example.com",
    slug: generateSlug("Sánchez", "Carlos", "23456789C", 3),
    dni: "23456789C",
    rol: "Moderador",
    telefono: "456-789-123"
  },
  {
    id: 4,
    nombre: "Ana",
    apellidos: "Martínez",
    email: "ana.martinez@example.com",
    slug: generateSlug("Martínez", "Ana", "34567891D", 4),
    dni: "34567891D",
    rol: "Editor",
    telefono: "789-123-456"
  },
  {
    id: 5,
    nombre: "Pedro",
    apellidos: "López",
    email: "pedro.lopez@example.com",
    slug: generateSlug("López", "Pedro", "45678912E", 5),
    dni: "45678912E",
    rol: "Usuario",
    telefono: "321-654-987"
  },
  {
    id: 6,
    nombre: "Laura",
    apellidos: "Fernández",
    email: "laura.fernandez@example.com",
    slug: generateSlug("Fernández", "Laura", "56789123F", 6),
    dni: "56789123F",
    rol: "Admin",
    telefono: "654-987-321"
  },
  {
    id: 7,
    nombre: "Miguel",
    apellidos: "García",
    email: "miguel.garcia@example.com",
    slug: generateSlug("García", "Miguel", "67891234G", 7),
    dni: "67891234G",
    rol: "Usuario",
    telefono: "987-321-654"
  },
  {
    id: 8,
    nombre: "Sara",
    apellidos: "Rodríguez",
    email: "sara.rodriguez@example.com",
    slug: generateSlug("Rodríguez", "Sara", "78912345H", 8),
    dni: "78912345H",
    rol: "Editor",
    telefono: "321-987-654"
  },
  {
    id: 9,
    nombre: "David",
    apellidos: "Hernández",
    email: "david.hernandez@example.com",
    slug: generateSlug("Hernández", "David", "89123456I", 9),
    dni: "89123456I",
    rol: "Moderador",
    telefono: "987-654-321"
  },
  {
    id: 10,
    nombre: "Carmen",
    apellidos: "Pérez",
    email: "carmen.perez@example.com",
    slug: generateSlug("Pérez", "Carmen", "91234567J", 10),
    dni: "91234567J",
    rol: "Usuario",
    telefono: "654-321-987"
  },
  {
    id: 11,
    nombre: "Lucía",
    apellidos: "Martín",
    email: "lucia.martin@example.com",
    slug: generateSlug("Martín", "Lucía", "23456789K", 11),
    dni: "23456789K",
    rol: "Admin",
    telefono: "789-654-321"
  },
  {
    id: 12,
    nombre: "Pablo",
    apellidos: "Gómez",
    email: "pablo.gomez@example.com",
    slug: generateSlug("Gómez", "Pablo", "34567891L", 12),
    dni: "34567891L",
    rol: "Usuario",
    telefono: "987-321-654"
  },
  {
    id: 13,
    nombre: "Elena",
    apellidos: "Ruiz",
    email: "elena.ruiz@example.com",
    slug: generateSlug("Ruiz", "Elena", "45678912M", 13),
    dni: "45678912M",
    rol: "Moderador",
    telefono: "321-654-987"
  },
  {
    id: 14,
    nombre: "Diego",
    apellidos: "Herrero",
    email: "diego.herrero@example.com",
    slug: generateSlug("Herrero", "Diego", "56789123N", 14),
    dni: "56789123N",
    rol: "Editor",
    telefono: "654-987-321"
  },
  {
    id: 15,
    nombre: "Marina",
    apellidos: "Santos",
    email: "marina.santos@example.com",
    slug: generateSlug("Santos", "Marina", "67891234O", 15),
    dni: "67891234O",
    rol: "Usuario",
    telefono: "987-321-654"
  },
  {
    id: 16,
    nombre: "Mateo",
    apellidos: "Ortega",
    email: "mateo.ortega@example.com",
    slug: generateSlug("Ortega", "Mateo", "78912345P", 16),
    dni: "78912345P",
    rol: "Admin",
    telefono: "321-987-654"
  },
  {
    id: 17,
    nombre: "Julia",
    apellidos: "López",
    email: "julia.lopez@example.com",
    slug: generateSlug("López", "Julia", "89123456Q", 17),
    dni: "89123456Q",
    rol: "Moderador",
    telefono: "987-654-321"
  },
  {
    id: 18,
    nombre: "Hugo",
    apellidos: "Gutiérrez",
    email: "hugo.gutierrez@example.com",
    slug: generateSlug("Gutiérrez", "Hugo", "91234567R", 18),
    dni: "91234567R",
    rol: "Editor",
    telefono: "654-321-987"
  },
  {
    id: 19,
    nombre: "Olivia",
    apellidos: "García",
    email: "olivia.garcia@example.com",
    slug: generateSlug("García", "Olivia", "12345678S", 19),
    dni: "12345678S",
    rol: "Usuario",
    telefono: "321-654-987"
  },
  {
    id: 20,
    nombre: "Daniel",
    apellidos: "Muñoz",
    email: "daniel.munoz@example.com",
    slug: generateSlug("Muñoz", "Daniel", "23456789T", 20),
    dni: "23456789T",
    rol: "Admin",
    telefono: "987-321-654"
  }
];