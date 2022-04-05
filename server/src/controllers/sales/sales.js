const expressAsyncHandler = require("express-async-handler");
const Sales = require('../../models/Sales');

//fetch all sales
const fetchsalesctrl = expressAsyncHandler(async (req, res) => {
    const {page} =req.query;
    try {
        const sales = await Sales.paginate({}, {limit: 10, page: Number(page), populate:"user"  })
        res.json(sales)
    } catch (error) {
        res.json(error)
    }
});

//create sales

const createSaleCtrl = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req.body;
    
    try {
      const sale = await Sales.create({
        title,
        amount,
        description,
        user: req?.user?._id
        
      });
      console.log(sale)
      res.json(sale);
      
      
    } catch (error) {
      res.json(error);
    }
  });


//fetch single sale

const fetchOneSale = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const sale = await Sales.findbyId({ id })
        res.json(sale)
    } catch (error) {
        res.json(error)
    }
});

//updates

const updateSalesctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description, amount, } = req.body
    try {
        const sale = await Sales.findByIdAndUpdate(id, { title, description, amount }, { new: true })
        res.json(sale)
    } catch (error) {

        res.json(error)
    }
});

//delete transaction

const deleteSalesctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const sale = await Sales.findByIdAndDelete (id)
        res.json(sale)
    } catch (error) {

        res.json(error)
    }
})

module.exports = { createSaleCtrl, fetchsalesctrl, fetchOneSale, updateSalesctrl, deleteSalesctrl }