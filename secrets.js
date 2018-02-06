const path = require("path")
process.env.GOOGLE_API_KEY = "4631c2204119e7a562361ae73cd3d713ee7f19d0"
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  "serviceAccountKey.json"
)
process.env.PUBLIC_VAPID_KEY =
  "BGn1dD0rQNTCewJp4RePvgStspr0pIzjEZShLoVp43eQaFJiSYM8XjxZxtofqIGrxacLeglOcLq9LwUC7cNW17o"
process.env.PRIVATE_VAPID_KEY = "cyDpPO1w9EftZaWSIIr-9viYN4v9DcIuHZreXzU3gD0"
