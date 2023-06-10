const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const livrosRouter = require('./routes/livros');

app.use('/livros', livrosRouter);


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/livraria', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3030, () => {
  console.log('Servidor rodando na porta 3030');
});
