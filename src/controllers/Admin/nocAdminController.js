const jwt = require('jsonwebtoken')
const { USER_NOT_FOUND } = require('../../helpers/error.js')
require('dotenv').config()
const NocForm = require('../../models/EndUser/NocForm.js')
const {
  sendMessage
} = require('../../middleware/AdminMiddleware/telegrammiddleware.js')

const updateNocStatus = async (req, res) => {
  try {
    const { id } = req.params // Get the document ID
    const { status, adminRemarks } = req.body // Get status from request

    // Validate status value
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' })
    }

    // Find the form and update status
    const nocForm = await NocForm.findByPk(id)
    if (!nocForm) {
      return res.status(404).json({ error: 'NOC form not found' })
    }

    // Update status and remarks
    nocForm.status = status
    nocForm.adminRemarks = adminRemarks || null
    await nocForm.save()

    if (status === 'approved') {
      sendMessage(
        'Congratulations! Your NOC has been approved. You may proceed with the next steps as required.'
      )
    } else if (status === 'rejected') {
      sendMessage(
        'We regret to inform you that your NOC has been rejected. Please contact the admin for further assistance.'
      )
    }

    res.status(200).json({ message: 'NOC status updated', data: nocForm })
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
module.exports = { updateNocStatus, getAllNocForms }
