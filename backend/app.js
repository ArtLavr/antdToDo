const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 7000;
const cors = require('cors');

const url = 'mongodb://localhost:27017/todo';

const app = express();
app.use(cors());
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
  console.log('connected...');
});

app.use(express.json());

const todoRouter = require('./routes/todos');
app.use('/todoData', todoRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
