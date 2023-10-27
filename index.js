const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/UserRoutes');

const app = express();

async function connectDB() {
 await mongoose.connect('mongodb://localhost:27017/testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});   
}

connectDB();

app.use(express.json());
app.use('/', router);

app.listen(3001, () => {
    console.log('app is running');
});

module.exports = app;