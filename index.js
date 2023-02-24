const i18next = require('i18next')
const express = require('express')
const { CalingaBackend } = require('i18next-calinga-backend')
const config = require('./config.json')

const backendOptions = {
    organization: 'SdkSample',
    team: 'Default Team',
    project: "Greetings",
    devMode: false,
    apiToken: config['api-token']

};

const app = express()
app.set("view engine", "ejs")

const port = 3000
i18next.use(CalingaBackend)
i18next.init({
    backend: backendOptions,
    debug: false,
    lng: 'en',
    fallbackLng:['en'],
    ns:['Greetings', 'Audiences']
  }, (error,t) => {
    app.get('/', (req, res) => {
      if(error){
        res.render('error', {error_message: error})
      }
      i18next.changeLanguage(req.query.lang, (error, t) => {
        
        if(error){
          res.render('error', {error_message: error})
        }
        else{
          var hello = t('headline.key')
          var world = t('headline.key', {ns: 'Audiences'})
          res.render('index', {first_word: hello, second_word: world})
        }
      })
    });
  });

app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);