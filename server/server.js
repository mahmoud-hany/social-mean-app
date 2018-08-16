const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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

//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);

//if we are in production serve the static fiels
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    });
}

app.listen(port, () => console.log(`Server is running on port ${port}`));