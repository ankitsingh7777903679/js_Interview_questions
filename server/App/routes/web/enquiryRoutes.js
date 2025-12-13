let express = require('express');
const { enquiryInsert, enquiryList } = require('../../Controllers/web/enquiryContoller');
let enquiryRouter = express.Router();

enquiryRouter.post('/insert', enquiryInsert)
enquiryRouter.get('/list', enquiryList)

module.exports = enquiryRouter;