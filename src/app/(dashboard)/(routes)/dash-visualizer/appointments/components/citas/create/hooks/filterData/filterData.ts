"use client"
import { useState, useEffect, useMemo, useCallback } from 'react';

interface FormattedProcedure {
  id_proc: number;
  name_proc: string;
  rooms: {
    id_rooms: number;
    name_rooms: string;
  }[];
}

interface Procedure {
  procedimiento: {
    id_procedimiento: number;
    nombres: string;
  };
  procedimiento_sala_detalle: {
    sala_tratamiento: {
      id_sala_tratamiento: number;
      nombres: string;
      sede: {
        id_sede: number;
      };
    };
  }[];
}

interface LocationProcedure {
  sede: {
    id_sede: number;
  };
  procedimiento_sede_detalle: {
    procedimiento: {
      id_procedimiento: number;
    };
  }[];
}

interface TitleProcedure {
  titulo: {
    id_cabecera_detalle: number;
  };
  procedimiento_personales_detalle: {
    procedimiento: {
      id_procedimiento: number;
    };
  }[];
}

interface RoomProcedure {
  procedimiento: {
    id_procedimiento: number;
    nombres: string;
  };
  procedimiento_sala_detalle: {
    sala_tratamiento: {
      id_sala_tratamiento: number;
      nombres: string;
      sede: {
        id_sede: number;
      };
    };
  }[];
}

interface UseFilteredProceduresParams {
  location: number;
  idTitle: number;
  locationProcedures: LocationProcedure[];
  titleProcedures: TitleProcedure[];
  roomProcedures: RoomProcedure[];
}

export const useFilteredProcedures = ({
  location,
  idTitle,
  locationProcedures,
  titleProcedures,
  roomProcedures,
}: UseFilteredProceduresParams) => {
  const [filteredProcedure, setFilteredProcedure] = useState<FormattedProcedure[]>([]);

  const filteredProceduresKey = useMemo(() =>
    locationProcedures
      ?.filter((item) => item.sede.id_sede === location)
      ?.flatMap((item) => item.procedimiento_sede_detalle.map((detail) => detail.procedimiento.id_procedimiento)) || [],
    [locationProcedures, location]
  );

  const filteredTitleProcedures = useMemo(() =>
    titleProcedures
      ?.filter((data) => data.titulo.id_cabecera_detalle === idTitle)
      ?.flatMap((item) => item.procedimiento_personales_detalle.map((detail) => detail.procedimiento.id_procedimiento)) || [],
    [titleProcedures, idTitle]
  );

  const filteredRoomProceduresKey = useMemo(() =>
    roomProcedures
      ?.filter((item) => item.procedimiento_sala_detalle.some((detail) => detail.sala_tratamiento.sede.id_sede === location))
      ?.map((item) => item.procedimiento.id_procedimiento) || [],
    [roomProcedures, location]
  );

  const findIntersection = useCallback((array1: any[], array2: any[]) => {
    return array1.filter((value) => array2.includes(value));
  }, []);

  const combinedProcedures = useMemo(() =>
    findIntersection(filteredProceduresKey, findIntersection(filteredTitleProcedures, filteredRoomProceduresKey)),
    [filteredProceduresKey, filteredTitleProcedures, filteredRoomProceduresKey, findIntersection]
  );

  useEffect(() => {
    if (roomProcedures) {
      const filtered = roomProcedures.filter((item) =>
        combinedProcedures.includes(item.procedimiento.id_procedimiento)
      );

      const formattedProcedures: FormattedProcedure[] = filtered.map((proc) => ({
        id_proc: proc.procedimiento.id_procedimiento,
        name_proc: proc.procedimiento.nombres,
        rooms: proc.procedimiento_sala_detalle
          .filter((roomsDetail) =>
            roomsDetail.sala_tratamiento.sede.id_sede === location
          )
          .map((roomsDetail) => ({
            id_rooms: roomsDetail.sala_tratamiento.id_sala_tratamiento,
            name_rooms: roomsDetail.sala_tratamiento.nombres,
          })),
      }));

      setFilteredProcedure(formattedProcedures);
    }
  }, [roomProcedures, combinedProcedures, location]);

  return { filteredProcedure };
};
