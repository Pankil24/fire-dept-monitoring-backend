const {
  sendMessage
} = require('../../middleware/AdminMiddleware/telegrammiddleware')
const NocForm = require('../../models/EndUser/NocForm')

const submitNocForm = async (req, res) => {
  try {
    const {
      businessName,
      businessAddress,
      ownerName,
      contactNumber,
      email,
      buildingHeight
    } = req.body

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`

    const newForm = await NocForm.create({
      businessName,
      businessAddress,
      ownerName,
      contactNumber,
      email,
      buildingHeight,
      approvalLetter: req.files['approvalLetter']
        ? baseUrl + req.files['approvalLetter'][0].filename
        : null,
      buildingPlan: req.files['buildingPlan']
        ? baseUrl + req.files['buildingPlan'][0].filename
        : null,
      firePlans: req.files['firePlans']
        ? baseUrl + req.files['firePlans'][0].filename
        : null,
      ownershipDocument: req.files['ownershipDocument']
        ? baseUrl + req.files['ownershipDocument'][0].filename
        : null,
      fireConsultantCertificate: req.files['fireConsultantCertificate']
        ? baseUrl + req.files['fireConsultantCertificate'][0].filename
        : null,
      checklist: req.files['checklist']
        ? baseUrl + req.files['checklist'][0].filename
        : null
    })
    sendMessage(
      'Your NOC has been successfully submitted. Please stay updated on Telegram for further updates 😊'
    )

    res
      .status(201)
      .json({ message: 'NOC Application Submitted', data: newForm })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllNocForms = async (req, res) => {
  try {
    const nocForms = await NocForm.findAll() // Fetch all NOC applications
    res.status(200).json({ data: nocForms })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { submitNocForm, getAllNocForms }
