
import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.get('/users', (req, res) => {
    return res.send('Método GET en el recurso usuario');
  });
  
  app.post('/users', (req, res) => {
    return res.send('Método POST en el recurso usuario');
  });
  
  app.put('/users', (req, res) => {
    return res.send('Método PUT en el recurso usuario');
  });
  
  app.delete('/users', (req, res) => {
    return res.send('Método DELETE en el recurso usuario');
  });
  app.listen(process.env.PORT, () =>
    console.log(`¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`),
  );
