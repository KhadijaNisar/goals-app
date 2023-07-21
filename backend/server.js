const { urlencoded } = require('body-parser');
const express=require('express')
const {errorHandler} =require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
require('dotenv').config()
const PORT=5000;

connectDB()
const app = express();



app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(errorHandler);

app.use('/api/goals',require('./routes/routes'))
app.use('/api/user',require('./routes/userRoutes'))

connectDB()

app.listen(PORT,()=>{
    console.log("Connecting to port " +PORT);
})