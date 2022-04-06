const express= require ('express');
const accountStatsCtrl = require('../../controllers/accountStatsCrtl/accountStatsCtrl');
const auth = require ('../../middleware/auth')



const accountStatsRoute=express.Router();

accountStatsRoute.get("/", auth, accountStatsCtrl)

module.exports = accountStatsRoute
