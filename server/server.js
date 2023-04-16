const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const goalsRouter = require('./routes/goalsRouter');
const stepsRouter = require('./routes/stepsRouter');
const authRouter = require('./routes/authRouter');
const folderRouter = require('./routes/folderRouter');

const app = express();
mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
const cors = require('cors');
db.on('error', (error) => console.error(error));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use('/goals', goalsRouter);
app.use('/steps', stepsRouter);
app.use('/auth', authRouter);
app.use('/folder', folderRouter);


app.listen('4000'); 