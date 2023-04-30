const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET 20 most recent services for org
router.get('/', (req, res, next) => {
  services
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ name: 1 })
    .limit(20)
})
// GET all active services for org, these active services will be displayed in Create Event form or Edit Event
router.get('/active', (req, res, next) => {
  services
    .find({ $and: [{org: org }, {status: 'Active'}] } , (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ name: 1 })
})

// GET single service by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  services.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

// GET services based on search query
// Ex: '...?name=servicename&searchBy=name'
router.get('/searchservices/', (req, res, next) => {

  console.log(req.query.searchBy)
  const dbQuery = { org: org }
  switch (req.query.searchBy) {
    case 'name':
      // match service name, no anchor
      dbQuery.name = { $regex: `${req.query.serviceSearchValue}`, $options: 'i' }
      break
      // match service description, no anchor
    case 'description':
      dbQuery.description = { $regex: `${req.query.serviceSearchValue}`, $options: 'i' }
      break
      // match service status
    case 'status':
      dbQuery.status = { $eq: req.query.serviceSearchValue }
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  services.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// POST add new service
router.post('/', (req, res, next) => {
  const newServices = req.body
  newServices.org = org
  console.log(newServices)
  services.create(newServices, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json(data)
    }
  })
})
 
// PUT update service data
router.put('/update/:id', (req, res, next) => {
    services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT soft delete service by change status to inactive
router.put('/updatestatus/:id', (req, res, next) => {
          services.findByIdAndUpdate(req.params.id, {status:'Inactive'}, {new: true}, (err, data)=> {
          if(err)
          {
            res.status(500).send('Error Occurred');
            return next(error)
          }
          else
          {
            res.send('Success')
          }
        })
  })


// hard DELETE service by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.send('Service deleted')
    }
  })
}) 

module.exports = router
