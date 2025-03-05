const express = require("express");
const upload = require("../../middleware/EndUserMiddleware/upload");
const {updateNocStatus } = require("../../controllers/Admin/nocAdminController");

const router = express.Router();

router.put("/admin/noc-forms/:id/status", updateNocStatus); 

module.exports = router;