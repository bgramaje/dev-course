/* eslint-disable no-underscore-dangle */
// app.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware para parsear JSON
app.use(express.json());

// Ruta para leer los ejercicios
app.get('/ejercicios', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ejercicios = JSON.parse(data);
    res.json(ejercicios);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).json({ message: 'Error al leer el archivo' });
  }
});

// CRUD Endpoints

// GET: Leer un ejercicio por ID
app.get('/ejercicios/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'ejercicios_gym.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ejercicios = JSON.parse(data);
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

// POST: Crear un nuevo ejercicio
app.post('/ejercicios', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'ejercicios_gym.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ejercicios = JSON.parse(data);
    const {
      nombre, grupoMuscular, equipo, dificultad, repeticiones, series,
    } = req.body;
    if (!nombre || !grupoMuscular) {
      res.status(400).json({ message: 'Nombre y grupo muscular son obligatorios' });
    } else {
      const nuevoEjercicio = {
        id: ejercicios.length + 1,
        nombre,
        grupoMuscular,
        equipo,
        dificultad,
        repeticiones,
        series,
      };
      ejercicios.push(nuevoEjercicio);
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.status(201).json(nuevoEjercicio);
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

// PUT: Actualizar un ejercicio
app.put('/ejercicios/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'ejercicios_gym.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ejercicios = JSON.parse(data);
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
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.json(ejercicio);
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

// DELETE: Eliminar un ejercicio
app.delete('/ejercicios/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'ejercicios_gym.json');
    const data = await fs.readFile(filePath, 'utf8');
    const ejercicios = JSON.parse(data);
    const id = parseInt(req.params.id);
    const index = ejercicios.findIndex((e) => e.id === id);
    if (index === -1) {
      res.status(404).json({ message: 'Ejercicio no encontrado' });
    } else {
      ejercicios.splice(index, 1);
      await fs.writeFile(filePath, JSON.stringify(ejercicios, null, 2));
      res.status(204).json();
    }
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

export default app; // Exportar la app para testing
