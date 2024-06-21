import Cookies from 'js-cookie';

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
