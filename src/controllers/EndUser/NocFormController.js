const NocForm = require("../../models/EndUser/NocForm");

const submitNocForm = async (req, res) => {
  try {
    const {
      businessName,
      businessAddress,
      ownerName,
      contactNumber,
      email,
      buildingHeight,
    } = req.body;

    const newForm = await NocForm.create({
      businessName,
      businessAddress,
      ownerName,
      contactNumber,
      email,
      buildingHeight,
      approvalLetter: req.files["approvalLetter"] ? req.files["approvalLetter"][0].path : null,
      buildingPlan: req.files["buildingPlan"] ? req.files["buildingPlan"][0].path : null,
      firePlans: req.files["firePlans"] ? req.files["firePlans"][0].path : null,
      ownershipDocument: req.files["ownershipDocument"] ? req.files["ownershipDocument"][0].path : null,
      fireConsultantCertificate: req.files["fireConsultantCertificate"] ? req.files["fireConsultantCertificate"][0].path : null,
      checklist: req.files["checklist"] ? req.files["checklist"][0].path : null,
    });

    res.status(201).json({ message: "NOC Application Submitted", data: newForm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllNocForms = async (req, res) => {
    try {
      const nocForms = await NocForm.findAll(); // Fetch all NOC applications
      res.status(200).json({ data: nocForms });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { submitNocForm, getAllNocForms };
