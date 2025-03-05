const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const NocForm = sequelize.define("NocForm", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  businessName: { type: DataTypes.STRING, allowNull: false },
  businessAddress: { type: DataTypes.STRING, allowNull: false },
  ownerName: { type: DataTypes.STRING, allowNull: false },
  contactNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  buildingHeight: { type: DataTypes.INTEGER, allowNull: false },
  approvalLetter: { type: DataTypes.STRING }, // File Path
  buildingPlan: { type: DataTypes.STRING }, // File Path
  firePlans: { type: DataTypes.STRING }, // File Path
  ownershipDocument: { type: DataTypes.STRING }, // File Path
  fireConsultantCertificate: { type: DataTypes.STRING }, // File Path
  checklist: { type: DataTypes.STRING }, // File Path
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending", // Default when user submits
  },
  adminRemarks: {
    type: DataTypes.TEXT, // Admin remarks for approval/rejection
    allowNull: true,
  },
});

module.exports = NocForm;
