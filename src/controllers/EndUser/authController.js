const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/EndUser/User.js')
const { USER_NOT_FOUND } = require('../../helpers/error.js')

// Register User
const userRegistration = async (req, res) => {
  try {
    const { name, email, password, role, phoneNo, address } = req.body

    // Validate that all fields are provided
    if (!name || !email || !password || !role || !phoneNo || !address)
      return res.status(400).json({ message: 'All fields are required' })

    // Ensure phoneNo is a valid number (assuming we want numeric phoneNo)
    if (isNaN(phoneNo))
      return res.status(400).json({ message: 'Phone number must be numeric' })

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user with provided details
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNo,
      address
    })

    // Respond with success message and user data
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Login User
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'All fields are required' })
    }

    // Find user by email in Sequelize
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'You are not a registered user' })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Email or password is not valid' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userID: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '5d' }
    )

    res.status(200).json({
      status: 'success',
      message: 'Login successfully',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    })
  } catch (error) {
    next(error)
    res.status(500).json({ status: 'failed', message: 'Unable to login' })
  }
}

// Get Authenticated User
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()

    if (!users.length) {
      return res.status(404).json({ message: 'No users found' })
    }

    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Change User Password
const changeUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await User.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    )

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Send Reset Password Email (Dummy Response for Now)
const sendPasswordResetEmail = async (req, res) => {
  res.json({ message: 'Password reset email sent (dummy response)' })
}

// Reset User Password (Dummy Implementation)
const resetUserPassword = async (req, res) => {
  res.json({ message: 'Password has been reset successfully (dummy response)' })
}

module.exports = {
  userRegistration,
  userLogin,
  changeUserPassword,
  getAllUsers,
  sendPasswordResetEmail,
  resetUserPassword
}
