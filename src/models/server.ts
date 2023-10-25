import express, { Application } from 'express';
import userRoutes from '../routes/user';
import itemRoutes from '../routes/item';
import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        items: '/api/items'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error : unknown) {
            if (typeof error === "string") {
                throw new Error(error as string);
            }
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.users, userRoutes )
        this.app.use( this.apiPaths.items, itemRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

    getApp(): Application {
        return this.app;
    }
}

export default Server;