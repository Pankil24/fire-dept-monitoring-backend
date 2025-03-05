const express = require("express");
const upload = require("../../middleware/EndUserMiddleware/upload");
const { submitNocForm, getAllNocForms } = require("../../controllers/EndUser/NocFormController");

const router = express.Router();

router.post(
  "/submit",
  upload.fields([
    { name: "approvalLetter", maxCount: 1 },
    { name: "buildingPlan", maxCount: 1 },
    { name: "firePlans", maxCount: 1 },
    { name: "ownershipDocument", maxCount: 1 },
    { name: "fireConsultantCertificate", maxCount: 1 },
    { name: "checklist", maxCount: 1 },
  ]),
  submitNocForm
);
router.get("/admin/noc-forms", getAllNocForms); 


module.exports = router;
