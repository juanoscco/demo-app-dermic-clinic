import { Section } from "@/app/(dash-admin)/models/aside/aside.models"

export const sections: Section[] = [
  {
    id: 'one',
    title: 'Panel Principal',
    icon: 'icon-dashboard',
    link: '/dash-admin/home',
  },
  {
    id: 'two',
    title: 'Personas',
    icon: 'icon-doctor',
    links: [
      { href: '/dash-admin/persons/create', text: 'Crear usuario' },
      { href: '/dash-admin/persons/list', text: 'Ver usuarios' },
      { href: '/dash-admin/persons/exceptions', text: 'Excepciones' },
      { href: '/dash-admin/persons/agenda-opening', text: 'Apertura de agenda' },
      { href: '/dash-admin/persons/schedules', text: 'Horarios' }
    ],
  },

  {
    id: 'three',
    title: 'Pacientes',
    icon: 'icon-person-circle',
    // link: '/dash-admin/patients/list'
    links: [
      { href: '/dash-admin/patients/create', text: 'Crear pacientes' },
      { href: '/dash-admin/patients/list', text: 'Ver pacientes' }
    ]
  },
  {
    id: 'four',
    title: 'Infraestructura',
    icon: 'icon-infrastructure',
    links: [
      { href: '/dash-admin/infrastructure/create', text: 'Crear infraestructura' },
      { href: '/dash-admin/infrastructure/list', text: 'Ver infraestructura' },
    ],
  },
  {
    id: 'five',
    title: 'Procedimientos',
    icon: 'icon-procedures',
    links: [
      { href: '/dash-admin/procedures/create', text: 'Crear procedimientos' },
      { href: '/dash-admin/procedures/list', text: 'Ver procedimientos' },
    ],
  },
  {
    id: 'six',
    title: 'Citas',
    icon: 'icon-appointments',
    links: [
      { href: '/dash-admin/appointments/list', text: 'Ver citas' },
      { href: '/dash-admin/appointments/waiting-patient', text: 'Paciente en espera' },
      { href: '/dash-admin/appointments/appointment-reports', text: 'Reporte de citas' },
      { href: '/dash-admin/appointments/appointment-calendar', text: 'Calendario de citas' },
      { href: '/dash-admin/appointments/appointment-extras', text: 'Calendario de extras' },
    ],
  },
  {
    id: 'seven',
    title: 'Configuracion',
    icon: 'icon-config',
    link: '/dash-admin/config',
  },
];