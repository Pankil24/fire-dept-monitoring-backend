const jwt = require("jsonwebtoken");
const { USER_NOT_FOUND } = require("../../helpers/error.js");
require("dotenv").config(); 
const NocForm  = require("../../models/EndUser/NocForm.js");

const updateNocStatus = async (req, res) => {
    try {
      const { id } = req.params; // Get the document ID
      const { status, adminRemarks } = req.body; // Get status from request
  
      // Validate status value
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
  
      // Find the form and update status
      const nocForm = await NocForm.findByPk(id);
      if (!nocForm) {
        return res.status(404).json({ error: "NOC form not found" });
      }
  
      // Update status and remarks
      nocForm.status = status;
      nocForm.adminRemarks = adminRemarks || null;
      await nocForm.save();
  
      res.status(200).json({ message: "NOC status updated", data: nocForm });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { updateNocStatus };
  