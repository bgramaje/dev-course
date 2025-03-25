/* eslint-disable import/extensions */
import app from './app.js';

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
