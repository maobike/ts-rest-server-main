# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de tu aplicación al directorio de trabajo en la imagen
COPY package*.json ./
COPY tsconfig.json ./
COPY .env* ./
COPY src/ ./src/
COPY dist/ ./dist/

# Instala las dependencias de la aplicación
RUN npm install
RUN npm run build

# Expón el puerto en el que se ejecutará tu aplicación Node.js
EXPOSE 8000

# Comando para iniciar tu aplicación Node.js
CMD [ "npm", "start" ]
