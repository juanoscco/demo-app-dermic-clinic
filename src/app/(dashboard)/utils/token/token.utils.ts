// ****************
// ******* Interfaz para el token decodificado
"use client"
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id_usuario: number | any;
  id_empresa: number | any;
  sub: string | any;
  role: string | any;
  empleado: string | any
  id_empleado: number | any;
  id_sede: any;
  sede: any
  titulo: {
    id_cabecera_detalle: any,
    descripcion: any,
    valor: any
  },
}

interface Props {
  token?: string | any;
}

// Función para obtener el token JWT desde las cookies
export const getToken = (): string | any => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
  return null;
};

// Función para preparar los encabezados con el token JWT
export const prepareHeaders = (headers: Headers): Headers => {
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// Función para obtener y decodificar el token JWT desde localStorage o desde las props
// export const decodeToken = ({ token }: Props = {}): DecodedToken | null => {
//   const jwtToken = token || getToken();

//   if (!jwtToken) {
//     console.error('Token is required');
//     return null;
//   }

//   try {
//     return jwtDecode<DecodedToken>(jwtToken);
//   } catch (error) {
//     console.error('Failed to decode token:', error);
//     return null;
//   }
// };

// Function to get and decode the JWT token from localStorage or props
export const decodeToken = ({ token }: Props = {}): DecodedToken | null => {
  const jwtToken = token || getToken();

  if (!jwtToken) {
    console.error('Token is required');
    return null;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(jwtToken);

    // Ensure only properties defined in DecodedToken interface are returned
    const filteredDecoded: DecodedToken = {
      id_usuario: decoded.id_usuario,
      id_empresa: decoded.id_empresa,
      sub: decoded.sub,
      role: decoded.role,
      empleado: decoded.empleado,
      id_empleado: decoded.id_empleado,
      id_sede: decoded.id_sede,
      sede: decoded.sede,
      titulo: {
        id_cabecera_detalle: decoded.titulo.id_cabecera_detalle,
        descripcion: decoded.titulo.descripcion,
        valor: decoded.titulo.valor
      }
    };

    // Save filtered decoded token to localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem('decodedToken', JSON.stringify(filteredDecoded));
    }

    return filteredDecoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};