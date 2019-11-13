const express = require('express')
const request = require('request')

const app = express()
/* Defining CORS */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.get('/search/:term', (req, res) => {
  const searchTerm = req.params.term
  request(
    {
      url: `https://serpapi.com/search?q=${searchTerm}&engine=google&tbm=isch&tbs=itp:photos,isz:l&api_key=911bfdea47a753b51ac67c510cd61b5b5e53ca36df583e990b68f5acd02d9ed5`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error })
      }

      res.json(JSON.parse(body))
    }
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
