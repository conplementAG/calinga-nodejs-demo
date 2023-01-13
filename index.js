const i18next = require('i18next')
const express = require('express')

const { CalingaBackend, CalingaBackendOptions } = require('i18next-calinga-backend') ;

// https://manage.calinga.io/translations/SdkSample/Default%20Team/Landings%20Page/de

const backendOptions = {
    organization: 'SdkSample',
    team: 'Default Team',
    project: "Landings Page",
    resources: {
        'en': {
            'default': 'en'
        },
        'de': {
            'default': 'de'
        }
    },
    devMode: false

};

i18next
  .use(CalingaBackend)
  .init({
    backend: backendOptions,
    
    supportedLngs: ['en', 'de']
  });


const app = express()
const port = 3000

app.get('/', (req, res) => res.json( { Hello: 'World!' } ));

app.get('/translation/:key', (req, res) => {
  i18next.changeLanguage(req.query.lang, (error, t) => {
    if(error){
      res.json('error changing language', error)
    }
    else{
      res.json(t(req.params.key))
    }
})});

app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);