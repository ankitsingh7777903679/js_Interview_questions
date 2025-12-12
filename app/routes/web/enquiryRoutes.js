let express = require('express');
let enquiryRoutes = express.Router();
let {enquiryDelete, enquiryList, enquiryUpdate, enquiryInsert} = require('../../controllers/web/userEnquiryController');

enquiryRoutes.post('/enquire-insert', enquiryInsert)
enquiryRoutes.get('/enquire-list', enquiryList)
enquiryRoutes.delete('/enquire-delete/:id', enquiryDelete)
enquiryRoutes.put('/enquire-update/:id', enquiryUpdate)

module.exports = enquiryRoutes;