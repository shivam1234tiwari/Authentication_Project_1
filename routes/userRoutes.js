import express from 'express'
const router=express.Router()
import {userRegistration,userlogin} from '../controllers/userController.js'

router.post('/signup',userRegistration)
router.post('/login',userlogin)

export default router