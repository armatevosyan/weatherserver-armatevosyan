const {City} =require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const creteCity = async (req,res) => {
  try {
    const jwtSecret = process.env.jwt_secret
    const decoded = jwt.verify(req.body.token, jwtSecret);
    const cities = await City.create({
      cityName: req.body.city,
      userId: decoded.id
    })

    return res.status(200).json({cities})
  } catch (e) {

    return res.status(400).json({message:'SomethingWent Wrong!'})
  }
}

const findAll = async (req,res) => {
  try {
    const jwtSecret = process.env.jwt_secret;
    const decoded = jwt.verify(req.params.id, jwtSecret);
    console.log("decoded",decoded)
    const city = await City.findAll({where: {userId: decoded.id}})

    if(!city) {
      return res.status(400).json({message: 'User Not Found!'})
    }

    return  res.status(200).json({city})
  } catch (e) {
    return res.status(400).json({message:'Something Went Wrong!'})
  }
}

const removeCity = async (req, res) => {
  try {
    console.log("req.params", req.params)

    const city = await City.findByPk(req.params.id)

    if (!city) {
      return res.json({message: 'City Not Found'})
    }

    await city.destroy(req.params.id)

    return res.json({message: "Post Deleted Successfully"})
  } catch (e) {
    console.log(e.message)

    return res.status(400).json({message: "Something went wrong"})
  }
}

module.exports = {
  creteCity,
  findAll,
  removeCity
}
