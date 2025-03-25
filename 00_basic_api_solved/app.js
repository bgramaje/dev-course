/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
// app.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware para parsear JSON
app.use(express.json());

const openFile = async () => {
  const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

/**
 * GET /ejercicios
 * Leer todos los ejercicios
 * @param {object} req
 * @param {object} res
 * @returns {array} Ejercicios
 */
app.get('/ejercicios', async (req, res) => {
  try {
    const ejercicios = await openFile();
    return res.status(200).json(ejercicios);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return res.status(500).json({ message: 'Error al leer el archivo' });
  }
});

/**
 * GET /ejercicios/:id
 * Lee un ejercicio por ID
 * @param {object} req
 * @param {object} res
 * @returns {object} ejercicio
 */
app.get('/ejercicios/:id', async (req, res) => {
  try {
    const ejercicios = await openFile();
    const id = parseInt(req.params.id, 10);
    const ejercicio = ejercicios.find((e) => e.id === id);
    if (!ejercicio) {
      res.status(404).json({ message: 'Ejercicio no encontrado' });
    } else {
      res.json(ejercicio);
    }
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).json({ message: 'Error al leer el archivo' });
  }
});

/**
 * POST /ejercicios
 * Crear un nuevo ejercicio
 * @param {object} req
 * @param {object} res
 * @returns {object} ejercicio
 */
app.post('/ejercicios', async (req, res) => {
  try {
    const ejercicios = await openFile();
    const {
      nombre, grupoMuscular, equipo, dificultad, repeticiones, series,
    } = req.body;
    if (!nombre || !grupoMuscular) {
      res.status(400).json({ message: 'Nombre y grupo muscular son obligatorios' });
    } else {
      const nuevoEjercicio = {
        id: req.body.id ?? ejercicios.length + 1,
        nombre,
        grupoMuscular,
        equipo,
        dificultad,
        repeticiones,
        series,
      };
      ejercicios.push(nuevoEjercicio);
      const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.status(201).json(nuevoEjercicio);
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

/**
 * PUT /ejercicios/:id
 * Actualizar un ejercicio
 * @param {object} req
 * @param {object} res
 * @returns {object} ejercicio
 */
app.put('/ejercicios/:id', async (req, res) => {
  try {
    const ejercicios = await openFile();
    const id = parseInt(req.params.id, 10);
    const ejercicio = ejercicios.find((e) => e.id === id);
    if (!ejercicio) {
      res.status(404).json({ message: 'Ejercicio no encontrado' });
    } else {
      const {
        nombre, grupoMuscular, equipo, dificultad, repeticiones, series,
      } = req.body;
      if (nombre) ejercicio.nombre = nombre;
      if (grupoMuscular) ejercicio.grupoMuscular = grupoMuscular;
      if (equipo) ejercicio.equipo = equipo;
      if (dificultad) ejercicio.dificultad = dificultad;
      if (repeticiones) ejercicio.repeticiones = repeticiones;
      if (series) ejercicio.series = series;
      const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.json(ejercicio);
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

/**
 * DELETE /ejercicios/:id
 * Eliminar un ejercicio
 * @param {object} req
 * @param {object} res
 * @returns {object} ejercicio
 */
app.delete('/ejercicios/:id', async (req, res) => {
  try {
    const ejercicios = await openFile();

    const id = parseInt(req.params.id, 10);
    const index = ejercicios.findIndex((e) => e.id === id);
    if (index === -1) {
      res.status(404).json({ message: 'Ejercicio no encontrado' });
    } else {
      ejercicios.splice(index, 1);
      const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.status(204).json();
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

export default app; // Exportar la app para testing
