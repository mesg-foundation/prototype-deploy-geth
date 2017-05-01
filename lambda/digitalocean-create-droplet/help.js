'use strict';

var DigitalOceanWrapper = require('do-wrapper')
var DigitalOcean = new DigitalOceanWrapper(process.env.digitalOceanApiKey, 25)

module.exports.getImageList = (event, context, callback) => {

  DigitalOcean.imagesGetAll({
    "private": false,
    "type": "application",
    "slug": "docker"
  })
  .then( data => {
    console.log(data)
    callback(null, data)
  })
  .catch((error) => {
    callback(error)
  })

}
