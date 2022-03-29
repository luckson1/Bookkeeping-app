const express= require ('express')
const {createSaleCtrl, fetchsalesctrl, fetchOneSale, updateSalesctrl, deleteSalesctrl}=require("../../controllers/sales/sales");
const auth = require('../../middleware/auth');


const salesRoutes=express.Router();


salesRoutes.post('/', auth, createSaleCtrl);
salesRoutes.get('/', auth,  async (req, res)=> {fetchsalesctrl});
salesRoutes.get('/:id', auth, async (req, res)=> {fetchOneSale});
salesRoutes.put('/:id', auth, async (req, res)=> {updateSalesctrl});
salesRoutes.delete('/:id', auth, async (req, res)=> {deleteSalesctrl});




module.exports=salesRoutes;