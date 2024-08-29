
require('dotenv').config()
const  cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const categoryRoutes = require ('./routes/categoryRoutes')
const productRoutes = require ('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes');
const authRouter = require ('./routes/authRouter')


const port = 3000
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  credentials: true
}))
app.use(cookieParser())
app.use (express.json());

app.use('/api/v1/', categoryRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/auth' , authRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// getting-started.js


main().then(()=>console.log("db connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://shamils3690:2n9bJLQrcesgpCX5@cluster0.6bfgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}