const express = require('express')
const router = express.Router()

const orgid = process.env.ORG

// importing data model schemas
const { orgs } = require('../models/models')

// GET organization information
router.get('/', (req, res, next) => {
  console.log(orgid)
  orgs.findOne({ org : orgid }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
