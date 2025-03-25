/* eslint-disable import/extensions */
import supertest from 'supertest';
import { expect } from 'chai';
import {
  beforeEach, describe, it, before,
} from 'mocha';
import app from '../app.js'; // Path to your Express app

const api = supertest(app);

describe('Ejercicios API', () => {
  before(async () => {
    const port = 4000;
    app.listen(port);
  });
  beforeEach(async () => {
    // Clean up before each test
    // Example: Remove all exercises from the database
  });

  describe('GET /ejercicios', () => {
    it('should return a list of exercises', async () => {
      const response = await api.get('/ejercicios');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /ejercicios/:id', () => {
    it('should return a single exercise by id', async () => {
      // Assuming you have an exercise with id 1
      const response = await api.get('/ejercicios/2');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', 2);
    });
  });

  describe('POST /ejercicios', () => {
    it('should create a new exercise', async () => {
      const ejercicio = {
        nombre: 'Nuevo Ejercicio',
        grupoMuscular: 'Piernas',
        equipo: 'Barra',
        dificultad: 'Media',
        repeticiones: 12,
        series: 3,
      };
      const response = await api.post('/ejercicios').send(ejercicio);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('nombre', ejercicio.nombre);
      expect(response.body).to.have.property('grupoMuscular', ejercicio.grupoMuscular);
    });
  });

  describe('PUT /ejercicios/:id', () => {
    it('should update an exercise', async () => {
      const updatedEjercicio = {
        nombre: 'Ejercicio Actualizado',
        grupoMuscular: 'Brazos',
      };
      const response = await api.put('/ejercicios/11').send(updatedEjercicio);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('nombre', updatedEjercicio.nombre);
      expect(response.body).to.have.property('grupoMuscular', updatedEjercicio.grupoMuscular);
    });
  });

  describe('DELETE /ejercicios/:id', () => {
    it('should delete an exercise', async () => {
      const response = await api.delete('/ejercicios/11');
      expect(response.status).to.equal(204);
    });
  });
});
