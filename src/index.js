import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import 'babel-polyfill';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    // proxyReqOptDecorator(opts) specific to this api  -- required so that google oauth redirects to localhoset:3000
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}))
app.use(express.static('public'));

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