let express = require('express');
const { enquiryInsert } = require('../../Controllers/web/enquiryContoller');
let enquiryRouter = express.Router();

enquiryRouter.post('/insert', enquiryInsert)

module.exports = enquiryRouter;