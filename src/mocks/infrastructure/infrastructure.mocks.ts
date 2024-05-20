export const infrastructure = [
    {
        id: 1,
        slug: "san-isidro",
        lugar: "San Isidro",
        codigoLocalizacion: "CL1",
        direccion: "Dirección San Isidro",
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
        slug: "los-olivos",
        lugar: "Los Olivos",
        codigoLocalizacion: "CL2",
        direccion: "Dirección Los Olivos",
        celular: "987-654-3210",
        estado: "Activo",
        cuartos: Array.from({ length: 15 }, (_, index) => ({
            cuarto: `Cuarto ${index + 1}`,
            piso: `Piso ${index + 1}`,
            estadoCuarto: "Habilitado",
        })),
    },
];
