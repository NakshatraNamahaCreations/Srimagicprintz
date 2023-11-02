const QuotationController = require("../../Controllers/Quotation/quotation");

const express = require("express");

const router = express.Router();

router.post("/quotation", QuotationController.QuotationData);
router.get("/getquotation",QuotationController.getQuotationData)
module.exports = router;
