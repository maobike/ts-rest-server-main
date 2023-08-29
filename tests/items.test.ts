import supertest from 'supertest';
import {app} from '../app';
import Item from '../src/models/item';

// Crea una instancia de supertest pasando tu servidor Express
const request = supertest(app);
// Antes de ejecutar las pruebas, puedes configurar una conexión a una base de datos de prueba (opcional)

describe('Test for items controller', () => {
    afterEach(async () => {
        // Realizar limpieza después de cada prueba (Elimina registros insertados en el test)
        await Item.destroy({ 
            where: { name: 'Item prueba' } 
        });
    });
  
  // Prueba para la ruta GET /api/items
  it('You should get a list of items', async () => {
    //jest.setTimeout(20000);

    const response = await request.get('/api/items');    

    // Realiza las pruebas en la respuesta
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  // Prueba para la ruta GET /api/items/:id
  it('You should get one item per valid ID', async () => {
    const itemId = 1; // Reemplaza con un ID válido existente en tu base de datos de prueba

    const response = await request.get(`/api/items/${itemId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', itemId);
    // Puedes agregar más aserciones según tu lógica
  });

  // Prueba para la ruta POST /api/items
  it('Should create a new valid item', async () => {
    const newItem = {
        name: "Item prueba",
        description: "Item de prueba #nx",
        price: 5000,
        quantity: 2

      // Proporciona datos válidos para crear un nuevo item según tu esquema
    };

    const response = await request.post('/api/items').send(newItem);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    // Puedes agregar más aserciones según tu lógica
  });

});