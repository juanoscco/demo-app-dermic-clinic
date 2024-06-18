# Usar la imagen de Node.js versión 20 como base
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
