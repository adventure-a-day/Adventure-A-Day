# Adventure a Day

Adventure A Day is a progressive web app designed to encourage users to explore new places and keep in touch with friends and family around the world. Users receive daily challenges, upload photos of their experiences, and connect with “teams” through photos and message boards.

## Setup

To run this app locally on your machine you'll need the following:

* node.js
* PSQL
* Google Cloud Vision API key 
* Amazon Web Services S3 Bucket key 

1. Clone the project folder:
git clone https://github.com/where-in-the-world/where-in-the-world.git

2. In root directory, create a file called secrets.js
* This file is `.gitignore`'d, and will *only* be required in your *development* environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, *prying eyes* will find your secret API keys!
  * It might look like this:

secrets.js: 
const path = require("path")
process.env.GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  "serviceAccountKey.json"
)
process.env.PUBLIC_VAPID_KEY =
  "YOUR_PUBLIC_VAPID_KEY"
process.env.PRIVATE_VAPID_KEY = "YOUR_PRIVATE_VAPID_KEY"

3. Also in the root directory, create a file called called serviceAccountKey.json:
serviceAccountKey.json: 
{
    "type": "service_account",
    "project_id": "YOUR_PROJECT_ID",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",
    "private_key": "-----BEGIN PRIVATE KEY-----\YOUR_PRIVATE_KEY-----END PRIVATE KEY-----\n",
    "client_email": "YOUR_EMAIL",
    "client_id": "YOUR_CLIENT_ID",
    "auth_uri": "https://YOUR_AUTH_URI",
    "token_uri": "https://YOUR_AUTH_TOKEN_URI",
    "auth_provider_x509_cert_url": "eg. https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "eg. https://www.googleapis.com/robot/v1/metadata/x509/vision-quickstart%40YOUR_PROJECT-193220.iam.gserviceaccount.com"
  }
4. In client/components, create a file called config.js

In this file, add your amazon keys and make sure to export it: 
const config = { "accessKeyId": "YOUR_ACCESS_KEY_ID", "secretAccessKey": "YOUR_SECRET_ACCESS_KEY", "region": "YOUR_REGION" }

module.exports = config

## Acclimate your development environment

Now that you've got the code, follow these steps to get acclimated:

* `npm install`
* Create two postgres databases: `capstone` and `capstone-test` 
* `npm run seed`


## Start

`npm run start-dev` will start server on your machine. You can visit the app in the browser on: http://localhost:8080

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

`npm run test` will run the test files 


