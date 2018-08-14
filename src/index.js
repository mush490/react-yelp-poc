import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import 'babel-polyfill';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';


const yelp = require('yelp-fusion');

const app = express();

// app.use('/api', proxy('https://api.yelp.com/v3', {
//     // proxyReqOptDecorator(opts) specific to this api  -- required so that google oauth redirects to localhoset:3000
//     proxyReqOptDecorator(opts){
//        // opts.headers['x-forwarded-host'] = 'localhost:3000';
//        // opts.headers['Authentication'] = ' Bearer eJt3sLNx7YZ64p8unRBPp0PSUQETEhgcN4M8rYRFZzA7gBp3do43XdWqVVfKSyvu_nICkjM7EhSLTOfDE8itfhHJj16Y-ElgDRCXMS1Oq6lnMrummAgrAg_pbrxoW3Yx';
//        console.log(opts.res.url); 
//        return opts;
//     },
//     https: true
// }));

 
const client = yelp.client('eJt3sLNx7YZ64p8unRBPp0PSUQETEhgcN4M8rYRFZzA7gBp3do43XdWqVVfKSyvu_nICkjM7EhSLTOfDE8itfhHJj16Y-ElgDRCXMS1Oq6lnMrummAgrAg_pbrxoW3Yx');

app.use(express.static('public'));
app.get('/api/search', async (req,res) => {
    //console.log(req);
    client.search({
        term: req.query.term,
        latitude: req.query.latitude,
        longitude: req.query.longitude
      }).then(response => {
        res.send(response.jsonBody);
      }).catch(e => {
        console.log(e);
      });
});

app.get('/api/random', async (req,res) => {
    console.log(req);
    client.search({
        term: req.query.term,
        latitude: req.query.latitude,
        longitude: req.query.longitude
      }).then(response => {
        res.send(response.jsonBody);
      }).catch(e => {
        console.log(e);
      });
});

app.get('*', (req,res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(({ route }) =>  {
       return route.loadData ? route.loadData(store) : null;
    }).map(promise =>{  // this logic is wrapping each promise with a promise so we can ALWAYS resolve it.  Otherwise Promise.All stops after 1 promise hits an issue
        if (promise){
            return new Promise((resolve,reject) => {
                promise.then(resolve).catch(resolve);
            });
        }
    });

    // return one promise when all of the load data promises are returned
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req,store,context);

        if (context.url){
            return res.redirect(301,context.url);
        }

        if (context.notFound){
           res.status(404);
        }

        res.send(content);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});