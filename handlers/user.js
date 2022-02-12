const {User} =require('../models');
const {Validators} = require('../validators/userValidator');
const multer  = require('multer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  },
  fileFilter: function (req, file, cb) {
    if(file !== '.png' && file !== '.jpg' && file !== '.gif' && file !== '.jpeg' && file !== '.zip') {
      return cb(new Error('Only images and zip are allowed'));
    }
    cb(null, true);
  }
})

const upload = multer({ storage: storage }).single('file')

const register = (req, res) => {
  try {
    upload(req, res,async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      if(req.file === undefined) {

        return res.status(400).json({message: [{message: "Image Required", context: {key: "image"}}]})
      }
      const obj = JSON.parse(JSON.stringify(req.body));
      const path = `http://localhost:3009/public/images/${req.file.filename}`
      obj["image"] = path;
      const {error} = Validators.createUser(obj);
      if (error) {
        return res.status(404).json({message: error.details});
      }
      const email = obj.email;
      const hasEmail = await User.findOne({ where: { email: email} });
      if(hasEmail) {
        return res.status(400).json({message: [{message: "Email Already Exists", context: {key: "email"}}]})
      }

      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(obj.password, salt)
      const post = await User.create({
        name:  obj.name,
        lastName: obj.lastName,
        email: obj.email,
        password: hashPassword,
        image: path,
        role:"customer"
      })
      return res.status(200).json({post})
    })
  } catch (e) {
    return res.status(400).json({message: "Something went wrong"})
  }
}

const login = async (req, res) => {
  try{
    const {error} = Validators.loginUser(req.body);
    if (error) {
      return res.status(400).json({message: error.details});
    }
    const user = await User.findOne({ where: { email: req.body.email}});
    if(!user) {
      return res.status(400).json({message: [{message: "Email Doesn't match!", context: {key: "email"}}]})
    }
    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if(!validPassword) {
      return res.status(400).json({message: [{message: "Password Doesn't match!", context: {key: "password"}}]})
    }
    const jwtSecret = process.env.jwt_secret
    const token = jwt.sign({
      id: user.id
    },jwtSecret);

    return res.status(200).json({
      token: `Bearer ${token}`
    })

  } catch (e) {
    return res.status(400).json({message: e.message})
  }
}

const find = async (req, res) => {
  try {
    const jwtSecret = process.env.jwt_secret
    const decoded = jwt.verify(req.params.id.split(" ").pop(), jwtSecret);
    const user = await User.findByPk(decoded.id)
    if (!user) {
      return res.status(400).json({message: "User not found"})
    }
    return res.json({user})

  } catch (e) {
    return res.status(400).json({message: 'Something Went Wrong'})
  }
}

module.exports = {
  register,
  login,
  find
}
