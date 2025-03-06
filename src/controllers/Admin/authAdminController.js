const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { USER_NOT_FOUND } = require('../../helpers/error.js')
require('dotenv').config()
const Admin = require('../../models/Admin/Admin.js')

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields (name, email, password) are required' })
    }
    const existingAdmin = await Admin.findOne({ where: { email } })
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: 'Admin with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({ name, email, password: hashedPassword })

    res.status(201).json({ message: 'Admin registered successfully', admin })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'All fields are required' })
    }

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'You are not a registered admin' })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Email or password is not valid' })
    }

    // Generate JWT token
    const token = jwt.sign({ userID: admin.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5d'
    })

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      admin: { id: admin.id, email: admin.email }
    })
  } catch (error) {
    next(error)
    res.status(500).json({ status: 'failed', message: 'Unable to login' })
  }
}

module.exports = {
  adminRegister,
  adminLogin
}
