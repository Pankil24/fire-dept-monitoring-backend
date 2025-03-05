const express = require("express");
const upload = require("../../middleware/EndUserMiddleware/upload");
const {updateNocStatus } = require("../../controllers/Admin/nocAdminController");
const { getAllNocForms } = require("../../controllers/EndUser/NocFormController");

const router = express.Router();

router.put("/admin/noc-forms/:id/status", updateNocStatus); 
router.get("/admin/noc-forms", getAllNocForms); 

module.exports = router;