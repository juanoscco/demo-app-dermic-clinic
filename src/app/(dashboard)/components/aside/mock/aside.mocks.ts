import { Section } from "@/app/(dashboard)/models/aside/aside.models"

export const sectionsAdmin = [
  {
    id: 1,
    label: 'Clinica',
    information: [
      {
        id: 2,
        onClick: 'handleMenuItemIdClick',
        href: "/dash-admin/home",
        iconClass: "icon-dashboard",
        text: "Panel Principal",
        subMenu: []
      },
      {
        id: 3,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-doctor",
        text: "Personas",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 4,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/persons/create",
            text: "Crear Personas"
          },
          {
            id: 5,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/persons/list",
            text: "Lista de Personas"
          },
          {
            id: 6,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/persons/exceptions",
            text: "Lista de Excepciones"
          },
          {
            id: 7,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/persons/agenda-opening",
            text: "Aperturas de agenda"
          },
          {
            id: 8,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/persons/schedules",
            text: "Lista de Horarios"
          }
        ]
      },
      {
        id: 9,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-infrastructure",
        text: "Infraestructura",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 10,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/infrastructure/create",
            text: "Crear infraestructura"
          },
          {
            id: 11,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/infrastructure/list",
            text: "Lista de infraestructuras"
          }
        ]
      },
      {
        id: 12,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-procedures",
        text: "Procedimientos",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 13,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/procedures/create",
            text: "Crear Procedimiento"
          },
          {
            id: 14,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/procedures/list",
            text: "Lista de Procedimientos"
          }
        ]
      },
    ]
  },
  {
    id: 15,
    label: 'Servicios',
    information: [
      {
        id: 16,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-person-circle",
        text: "Pacientes",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 17,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/patients/create",
            text: "Crear Pacientes"
          },
          {
            id: 18,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/patients/list",
            text: "Lista de Pacientes"
          }
        ]
      },
      {
        id: 19,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-appointments",
        text: "Citas",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 20,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/appointments/list",
            text: "Lista de Citas"
          },
          {
            id: 21,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/appointments/waiting-patient",
            text: "Pacientes en Espera"
          },
          {
            id: 22,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/appointments/appointment-reports",
            text: "Reporte de citas"
          },
          {
            id: 23,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/appointments/appointment-calendar",
            text: "Calendario de Citas"
          },
          {
            id: 24,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-admin/appointments/appointment-extras",
            text: "Calendario de Citas Extra"
          }
        ]
      }
    ]
  }
]


export const sectionsEmployee = [
  {
    id: 1,
    label: 'Clinica',
    information: [
      {
        id: 2,
        onClick: 'handleMenuItemIdClick',
        href: "/dash-employee/home",
        iconClass: "icon-dashboard",
        text: "Panel Principal",
        arrowClass: "",
        subMenu: []
      },
      {
        id: 3,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-doctor",
        text: "Personas",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 4,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/persons/exceptions",
            text: "Lista de Excepciones"
          },
          {
            id: 5,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/persons/agenda-opening",
            text: "Aperturas de agenda"
          },
          {
            id: 6,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/persons/schedules",
            text: "Lista de Horarios"
          }
        ]
      },
    ]
  },

  {
    id: 7,
    label: 'Servicios',
    information: [
      {
        id: 8,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-person-circle",
        text: "Pacientes",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 9,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/patients/create",
            text: "Crear Pacientes"
          },
          {
            id: 10,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/patients/list",
            text: "Lista de Pacientes"
          }
        ]
      },
      {
        id: 11,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-appointments",
        text: "Citas",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 12,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/appointments/list",
            text: "Lista de Citas"
          },
          {
            id: 13,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/appointments/waiting-patient",
            text: "Pacientes en Espera"
          },
          {
            id: 14,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/appointments/appointment-reports",
            text: "Reporte de citas"
          },
          {
            id: 15,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-employee/appointments/appointment-calendar",
            text: "Calendario de Citas"
          },
        ]
      }
    ]
  }
];


export const sectionsVisualizer = [
  {
    id: 1,
    label: "Clinica",
    information: [
      {
        id: 2,
        onClick: 'handleMenuItemIdClick',
        href: "/dash-visualizer/home",
        iconClass: "icon-dashboard",
        text: "Panel Principal",
        arrowClass: "",

        subMenu: []
      },
    ]
  },
  {
    id: 3,
    label: "Servicios",
    information: [
      {
        id: 4,
        onClick: 'handleMenuItemClick',
        href: "/dash-visualizer/patients/list",
        iconClass: "icon icon-person-circle",
        text: "Pacientes",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: []
      },
      {
        id: 5,
        onClick: 'handleMenuItemClick',
        href: "#",
        iconClass: "icon icon-appointments",
        text: "Citas",
        arrowClass: "arrow ph-bold ph-caret-down",
        subMenu: [
          {
            id: 6,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-visualizer/appointments/list",
            text: "Lista de Citas"
          },
          {
            id: 7,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-visualizer/appointments/waiting-patient",
            text: "Pacientes en Espera"
          },
          {
            id: 8,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-visualizer/appointments/appointment-reports",
            text: "Reporte de citas"
          },
          {
            id: 9,
            onClick: 'handleMenuItemIdClick',
            href: "/dash-visualizer/appointments/appointment-calendar",
            text: "Calendario de Citas"
          },
        ]
      }
    ]
  }
];

export const sectionsDoctor = [
  {
    id: 1,
    label: 'Clinica',
    information: [
      {
        id: 2,
        onClick: 'handleMenuItemIdClick',
        href: "/dash-doctor/home",
        iconClass: "icon-doctor",
        text: "Panel Principal",
        arrowClass: "",
        subMenu: []
      },
    ]
  },
  {
    id: 3,
    label: 'Servicios',
    information: [
      {
        id: 4,
        onClick: 'handleMenuItemClick',
        href: "/dash-doctor/appointments/appointment-calendar",
        iconClass: "icon icon-appointments",
        text: "Citas",
        arrowClass: "",
        subMenu: []
      }
    ]
  }
];