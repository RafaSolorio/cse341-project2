const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('./db/connect')


const port = process.env.PORT || 5000
const app = express()


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    })
    .use('/', require('./routes'))
    
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

process.on('uncaughtException', (err, origin) => {
    // eslint-disable-next-line no-console
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port)
        console.log(`Connected to DB and listening on ${port}`)
    }
})