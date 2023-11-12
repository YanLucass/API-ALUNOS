const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./db/pool');
//import routes
const studentRoutes = require('./routes/studentRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to define routes
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
})