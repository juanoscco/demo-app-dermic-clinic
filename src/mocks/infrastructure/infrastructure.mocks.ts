export const infrastructure = [
    {
        id: 1,
        slug: "lugar-1",
        lugar: "Lugar 1",
        codigoLocalizacion: "CL1",
        direccion: "Dirección 1",
        celular: "123-456-7890",
        estado: "Activo",
        cuartos: Array.from({ length: 10 }, (_, index) => ({
            cuarto: `Cuarto ${index + 1}`,
            piso: `Piso ${index + 1}`,
            estadoCuarto: "Habilitado",
        })),
    },
    {
        id: 2,
        slug: "lugar-2",
        lugar: "Lugar 2",
        codigoLocalizacion: "CL2",
        direccion: "Dirección 2",
        celular: "987-654-3210",
        estado: "Inactivo",
        cuartos: Array.from({ length: 15 }, (_, index) => ({
            cuarto: `Cuarto ${index + 1}`,
            piso: `Piso ${index + 1}`,
            estadoCuarto: "Deshabilitado",
        })),
    },
    {
        id: 3,
        slug: "lugar-3",
        lugar: "Lugar 3",
        codigoLocalizacion: "CL3",
        direccion: "Dirección 3",
        celular: "111-222-3333",
        estado: "Activo",
        cuartos: Array.from({ length: 24 }, (_, index) => ({
            cuarto: `Cuarto ${index + 1}`,
            piso: `Piso ${index + 1}`,
            estadoCuarto: index % 2 === 0 ? "Habilitado" : "Deshabilitado",
        })),
    },
];
