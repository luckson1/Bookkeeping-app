const express= require ('express')
const {createSaleCtrl, fetchsalesctrl, fetchOneSale, updateSalesctrl, deleteSalesctrl}=require("../../controllers/sales/sales");
const auth = require('../../middleware/auth');


const salesRoutes=express.Router();


salesRoutes.post('/', auth, createSaleCtrl);
salesRoutes.get('/', auth,  fetchsalesctrl);
salesRoutes.get('/:id', auth, fetchOneSale);
salesRoutes.put('/:id', updateSalesctrl);
salesRoutes.delete('/:id', auth, deleteSalesctrl);




module.exports=salesRoutes;