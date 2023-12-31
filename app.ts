import dotenv from 'dotenv';
import Server from './src/models/server';

// Configurar dot.env
dotenv.config();

const server = new Server();

export const app = server.getApp();

server.listen();
