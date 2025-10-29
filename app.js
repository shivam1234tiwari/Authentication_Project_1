import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './config/db.js'
import userRoutes from './routes/userRoutes.js'

const app=express()
const port=process.env.PORT||3000;


app.use(cors())
app.use(cookieParser())
//json
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//view engine
app.set('view engine','ejs')

//routes 
app.use('/auth',userRoutes)

app.get('/',(req,res)=>{
    res.render("index");
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})