import { Request, Response } from 'express';
import { postUser } from '../src/controllers/users';
import User from '../src/models/user';
import { existEmail, existEditEmail } from '../src/functions/user';

// Mock Express request and response objects
const req = {} as Request;
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(), // Mock para res.status()
} as unknown as Response;

// Mock functions
//jest.mock('../models/user'); // Burla el modelo User

describe('Functions Users', () => {
    afterEach(async () => {
        // Realizar limpieza después de cada prueba (Elimina registros insertados en el test)
        await User.destroy({ 
          where: { email: 'user@example.com' } 
        });
        
        jest.clearAllMocks();
    });

    describe('Function existEmail', () => {
        it('should return a email exist', async () => {
            req.body = {
                name: 'User prueba Uno',
                email: 'user@example.com',
                password: '1a1b1c1d1e1f',
                phone: '1111111111'
            };
            // Llama a la función postUser
            await postUser(req, res);

            const email = 'user@example.com'
            const resp = await existEmail(email);

            expect(resp).not.toBeNull();
        });
        
        it('should return null if the email does not exist', async () => {
            const email = 'nonexistent@example.com'
            const resp = await existEmail(email);
    
            expect(resp).toBeNull();
        });
    });
    
    describe('Function existEditEmail', () => {
        it('should return null if the email does not exist', async () => {
            const email = 'nonexistent@example.com'
            const resp = await existEditEmail(email, 0);
    
            expect(resp).toBeNull();
        });
    });
});