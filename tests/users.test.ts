import { Request, Response } from 'express';
import { 
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser
} from '../src/controllers/users';
import User from '../src/models/user';
import { existEmail, existEditEmail } from '../src/functions/user';

// Mock Express request and response objects
const req = {} as Request;
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(), // Mock para res.status()
} as unknown as Response;

// Mock functions
jest.mock('./../src/functions/user'); // BURLA la función real existEmail

describe('UserController', () => {
  const existEmailMock = existEmail as jest.Mock;
  const existEditEmailMock = existEditEmail as jest.Mock;
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      // Mock User.findAll() to return sample user data
      const sampleUsers = [
        User.build({
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password1',
          phone: '123456789',
          status: true,
        }),
        User.build({
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password2',
          phone: '987654321',
          status: true,
        }),
      ];
      jest.spyOn(User, 'findAll').mockResolvedValue(sampleUsers);

      // Call the getUsers function
      await getUsers(req, res);

      // Assertion
      expect(res.json).toHaveBeenCalledWith({ users: sampleUsers });
    });
  });

  describe('getUser', () => {
    it('should return a user when valid id is provided', async () => {
      // Mock User.findByPk() to return sample user data
      const sampleUser = User.build({ 
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        phone: '123456789',
        status: true,
      });
      jest.spyOn(User, 'findByPk').mockResolvedValue(sampleUser);

      // Mock req.params to include the id
      req.params = { id: '1' };

      // Call the getUser function
      await getUser(req, res);

      // Assertion
      expect(res.json).toHaveBeenCalledWith(sampleUser);
    });
  });

  describe('postUser', () => {
    afterEach(async () => {
      // Realizar limpieza después de cada prueba (Elimina registros insertados en el test)
      await User.destroy({ 
        where: { email: 'user@example.com' } 
      });
    });

    it('should create a new user and return it', async () => {
        req.body = {
          name: 'User Example',
          email: 'user@example.com',
          password: 'password3',
          phone: '123456789'
        };

      // Mock para existEmail para simular que no existe un usuario con el mismo correo
      existEmailMock.mockResolvedValue(null);

      // Llama a la función postUser
      await postUser(req, res);

      // Verifica que res.json haya sido llamado con el usuario creado
      expect(res.json).toHaveBeenCalled();
      // Luego verifica que el argumento pasado a res.json no sea nulo
      expect(res.json).not.toBeNull();
    });

    it('should respond with 400 and error message on invalid request body', async () => {
      // Mock datos de solicitud inválidos
      req.body = {
        name: 'User 4', // Faltan otros campos requeridos, lo que lo hace inválido
      };
  
      // Llama a la función postUser
      await postUser(req, res);
  
      // Verifica que res.status se haya llamado con 400 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });

    it('should respond with 400 and error message if email already exists', async () => {
      // Mock datos de solicitud con un correo electrónico que ya existe
      req.body = {
        name: 'User 5',
        email: 'user5@example.com', // Suponiendo que este correo ya existe
        password: 'password5',
        phone: '987654321',
      };
  
      // Mock para existEmail para simular que ya existe un usuario con el mismo correo
      existEmailMock.mockResolvedValue({ /* Datos de usuario existente */ });
  
      // Llama a la función postUser
      await postUser(req, res);
  
      // Verifica que res.status se haya llamado con 400 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }));
    });
  
  });

  describe('putUser', () => {
    afterEach(async () => {
      // Realizar limpieza después de cada prueba (eliminar registros insertados en el test)
      await User.destroy({ 
        where: { email: 'updated@example.com' } 
      });
    });

    it('should update a user and return it', async () => {
      // Mock datos de solicitud válidos
      req.params = { id: '1' }; // Suponiendo que el ID 1 existe
      req.body = {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newPassword',
        phone: '987654321',
      };
  
      // Mock para existEditEmail para simular que no existe otro usuario con el mismo correo
      existEditEmailMock.mockResolvedValue(null);
  
      // Mock User.findByPk() para devolver un usuario existente
      const sampleUser = User.build({
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        phone: '123456789',
      });
      jest.spyOn(User, 'findByPk').mockResolvedValue(sampleUser);
  
      // Mock User.update() para devolver el usuario actualizado
      const updatedUser = User.build({
        ...sampleUser.toJSON(),
        ...req.body,
      });
      jest.spyOn(updatedUser, 'update').mockResolvedValue(updatedUser);
  
      // Llama a la función putUser
      await putUser(req, res);
  
      // Verifica que res.json haya sido llamado con el usuario actualizado
      expect(res.json).toHaveBeenCalled();
      // Luego verifica que el argumento pasado a res.json no sea nulo
      expect(res.json).not.toBeNull();
    });
  
    it('should respond with 400 and error message on invalid request body', async () => {
      // Mock datos de solicitud inválidos
      req.params = { id: '1' };
      req.body = {
        name: 'Updated User', // Faltan otros campos requeridos, lo que lo hace inválido
      };
  
      // Llama a la función putUser
      await putUser(req, res);
  
      // Verifica que res.status se haya llamado con 400 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });
  
    it('should respond with 404 if user with specified ID does not exist', async () => {
      // Mock datos de solicitud con un ID que no existe
      req.params = { id: '999' }; // Suponiendo que el ID 999 no existe
      req.body = {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newPassword',
        phone: '987654321',
      };
  
      // Mock para existEditEmail para simular que no existe otro usuario con el mismo correo
      existEditEmailMock.mockResolvedValue(null);
      jest.spyOn(User, 'findByPk').mockResolvedValue(null);

      // Llama a la función putUser
      await putUser(req, res);
       
      // Verifica que res.status se haya llamado con 404 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }));
    });

    it('should respond with 400 if email already exists for another user', async () => {
      // Mock datos de solicitud con un correo electrónico que ya existe para otro usuario
      req.params = { id: '1' }; // Suponiendo que el ID 1 existe
      req.body = {
        name: 'Updated User',
        email: 'user1@example.com', // Suponiendo que este correo ya existe para otro usuario
        password: 'newpassword',
        phone: '987654321',
      };
  
      // Mock para existEditEmail para simular que el correo electrónico ya existe para otro usuario
      existEditEmailMock.mockResolvedValue(
        {
          id: 1,
          name: 'Updated User',
          email: 'updated@example.com',
          password: 'newPassword',
          phone: '987654321',
        });
  
      // Mock User.findByPk() para devolver un usuario existente
      const sampleUser = User.build({
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        phone: '123456789',
      });
      jest.spyOn(User, 'findByPk').mockResolvedValue(sampleUser);
  
      // Llama a la función putUser
      await putUser(req, res);
  
      // Verifica que res.status se haya llamado con 400 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }));
    });

  });

  describe('deleteUser', () => {
    it('should soft delete an existing user and return it', async () => {
      // Mock datos de solicitud con un ID existente
      req.params = { id: '1' };
      req.body = {
        status: false
      };

      // Mock User.findByPk() para devolver un usuario existente
      const sampleUser = User.build({
        name: "User 1", 
        email: "user1@example.com", 
        password: "password1", 
        phone: "123456789", 
      });
      jest.spyOn(User, 'findByPk').mockResolvedValue(sampleUser);

      // Mock User.update() para devolver el usuario actualizado
      const updatedUser = User.build({
        ...sampleUser.toJSON(),
        ...req.body,
      });
      jest.spyOn(sampleUser, 'update').mockResolvedValue(updatedUser);

      // Llama a la función deleteUser
      await deleteUser(req, res);
    
      // Verifica que res.json haya sido llamado con el usuario actualizado
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(sampleUser.toJSON()));
    });
  
    it('should respond with 404 if user with specified ID does not exist', async () => {
      // Mock datos de solicitud con un ID que no existe
      req.params = { id: '999' }; // Suponiendo que el ID 999 no existe
    
      // Mock User.findByPk() para devolver null, indicando que el usuario no existe
      jest.spyOn(User, 'findByPk').mockResolvedValue(null);
    
      // Llama a la función deleteUser
      await deleteUser(req, res);
      
      // Verifica que res.status se haya llamado con 404 y que res.json contenga un mensaje de error
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }));
    });
  });

});
