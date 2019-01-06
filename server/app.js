const express = require('express')
const path = require('path')
const os = require('os')
const dbPool = new (require('./db'))()
const utils = require('./utils')

const app = express()
const PORT = process.env.PORT || 80

const statusCode = {
  internalServerError: 500,
  badRequest: 400,
  accepted: 202,
  noContent: 204,
  created: 201,
  ok: 200
}


app.use(express.static(path.join(__dirname, '../', 'build/')))
app.use(express.json()) // parsing body

app.get('/', (req, res) => {
  res.render('index.html')
})


app.post('/api/short', (req, res, next) => {
  const { url }= req.body

  dbPool.query('select id from url where url = ?', url)
    .then(rows => {
      if(rows.length == 0) {
        dbPool.query('insert into url (url) values (?)', url)
          .then(rows => {
            res.status(statusCode.created).send({
              shortUrl: utils.getShortURL(rows.insertId)
            })
          })
          .catch(err => {
            console.error(err)
            res.status(statusCode.internalServerError).send()
          })
      } else {
        res.status(statusCode.accepted).send({
          shortUrl: utils.getShortURL(rows[0].id)
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(statusCode.internalServerError).send()
    })


})

app.get('/:id', (req, res) => {
  const id = utils.getIdFrom(req.params.id)

  dbPool.query('select url from url where id = ?', id)
    .then(rows => {
      res.redirect(rows[0].url)
    })
    .catch(err => {
      console.error(err)
      res.status(statusCode.internalServerError).send()
    })
})

app.listen(PORT, () => {
  console.log('Server is listening on localhost port ', PORT)
})