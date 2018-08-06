const express = require('express');
const bodyParser = require('body-parser');

//db connection
const { mongoose } = require('./db/connect'); 

const userRoutes = require('./api/routes/users');
const postRoutes = require('./api/routes/posts');
const profileRoutes = require('./api/routes/profiles');

const app = express();

const port = process.env.PORT || 5000;

//body parser middleware
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

//Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('Hello weorls');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));