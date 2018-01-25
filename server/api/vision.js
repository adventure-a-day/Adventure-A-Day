const vision = require("@google-cloud/vision")
require('../secrets')

const client = new vision.ImageAnnotatorClient()

client
  .labelDetection("gs://where-in-the-world-bucket/20180125_120946_001.jpg")
  .then(results => {
    const labels = results[0].labelAnnotations

    console.log("Labels: ")
    labels.forEach(label => console.log(label.description))
  })
  .catch(err => console.error("ERROR: ", err))
