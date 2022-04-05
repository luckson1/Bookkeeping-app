const express= require ('express')
const auth = require ('../../middleware/auth')
const accountStatsCtrl = require("../../middleware/accountStatsCrtl/accountStatsCtrl");


const accountStatsRoute=express.Router();

accountStatsRoute.get("api/accounts-statistics", auth, accountStatsCtrl)

module.exports = accountStatsRoute
