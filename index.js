const i18next = require('i18next')
const express = require('express')

i18next.init(
  {
    lng: 'en',
    resources: {
      en: {
        translation: {
          key: 'value of key'
        }
      },
      de: {
        translation: {
          key: 'Wert von Key'
        }
    }
    }
  }
  
)

const app = express()
const port = 3000

app.get('/', (req, res) => res.json( { Hello: 'World!' } ));

app.get('/translation/:key', (req, res) => res.json(i18next.t(req.params.key, {lng: req.query.lang})));

app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);