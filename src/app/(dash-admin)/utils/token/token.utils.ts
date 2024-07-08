import { jwtDecode } from 'jwt-decode';

// Función para obtener el token JWT desde las cookies
export const getToken = (): string | any => {
  return localStorage.getItem("token")
};

// Función para preparar los encabezados con el token JWT
export const prepareHeaders = (headers: Headers): Headers => {
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// ****************
// Interfaz para el token decodificado
export interface DecodedToken {
  id_usuario: number | any;
  id_empresa: number | any;
  sub: string | any;
  role: string | any;
  empleado: string | any
  id_empleado: number | any
}

interface Props {
  token?: string;
}

// Función para obtener y decodificar el token JWT desde localStorage o desde las props
export const decodeToken = ({ token }: Props = {}): DecodedToken | null => {
  const jwtToken = token || getToken();

  if (!jwtToken) {
    console.error('Token is required');
    return null;
  }

  try {
    return jwtDecode<DecodedToken>(jwtToken);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};