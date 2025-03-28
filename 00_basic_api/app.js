/* eslint-disable no-unused-vars */
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

const writeFile = async (data) => {
  const filePath = path.join(__dirname, 'data/ejercicios_gym.json');
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
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
    /**
     * TODO: Leer un ejercicio dado el ID
     */
    res.status(200).json(/* TODO: Ejercicio encontrado */);
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

    /**
     * TODO: Crear un nuevo ejercicio
     */
    await writeFile(ejercicios);
    res.status(201).json(/* TODO: Nuevo ejercicio */);
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
    /**
     * TODO: Editar un ejercicio dado el ID
     */
    await writeFile(ejercicios);
    res.status(204).json(/* TODO: Ejercicio actualizado */);
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
    /**
     * TODO: Borrar un ejercicio dado el ID
     */
    await writeFile(ejercicios);
    res.status(204).json();
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ message: 'Error al escribir en el archivo' });
  }
});

export default app; // Exportar la app para testing
