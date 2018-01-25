const vision = require("@google-cloud/vision")
const router = require("express").Router()
const client = new vision.ImageAnnotatorClient()

router.post("/", (req, res, next) => {
  const { imageUrl } = req.body
  client
    .labelDetection(imageUrl)
    .then(results => {
      const labels = results[0].labelAnnotations

      console.log("Labels: ")
      labels.forEach(label => console.log(label.description))
      res.send(labels)
    })
    .catch(next)
})
