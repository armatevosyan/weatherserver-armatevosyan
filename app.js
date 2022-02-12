const express = require('express');
const db = require('./models');
const user = require('./routers/user')
const city = require('./routers/city')
const weather = require('./routers/weather')
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');


dotenv.config()
const app = express();
app.use(cors({
  origin:`http://localhost:3000`,
  credentials:true,
  optionSuccessStatus:200
}))


app.use(express.json())
app.use('/api/user', user);
app.use('/api/city', city);
app.use('/api/weather', weather);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
require('./middleware/authMiddleWere')(passport)

const PORT =  3009;

app.listen(PORT,()=> {
  console.log(`Server Started on port ${PORT}....`)
})

try {
   db.sequelize.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
