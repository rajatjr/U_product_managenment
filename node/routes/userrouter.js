const { Router } = require("express");
const express = require("express");
const route = express.Router()
const {createUser, login,addproducts,getAllProducts,productdetails, deleteitems,finditems,updateproducts} = require('../controller/usercontrol')
const validateUser= require('../middleware.js/validation')



route.post('/registration',validateUser,createUser)
route.post('/login',login)
route.post('/addproducts', addproducts)
route.get('/getAllProducts/:id', getAllProducts)
route.get('/productdetails', productdetails)
route.get('/deleteitem', deleteitems)
route.get('/finditems', finditems)
route.put('/update', updateproducts)


module.exports = route;