import path from 'path';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import LRU from 'lru-cache';
import serialize from 'serialize-javascript';

import { port } from '../config/sys.config';
//import serverRoute from './routes/index';
import { createBundleRenderer } from 'vue-server-renderer';

// connect db 
// import './connectDB';

let indexHtml, // generated by html-webpack-plugin
    renderer; // created from the webpack-generated server bundle

function createRenderer(serverBundle) {
    return createBundleRenderer(serverBundle, {
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    })
}

function parseIndex(template) {
    const contentMarker = '<!-- APP -->';
    const i = template.indexOf(contentMarker);
    return {
        head: template.slice(0, i),
        tail: template.slice(i + contentMarker.length)
    }
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    require('../config/setup-dev-server')(app, {
        bundleUpdated: serverBundle => {
            renderer = createRenderer(serverBundle);
        },
        indexUpdated: indexTpl => {
            indexHtml = parseIndex(indexTpl);
        }
    })
} else {
    const bundlePath = path.resolve(process.cwd(), './dist/server/server-bundle.js');
    const indexTplPath = path.resolve(process.cwd(), './dist/static/index.html');
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
    indexHtml = parseIndex(fs.readFileSync(indexTplPath, 'utf-8'));
    app.use('/static', express.static(path.resolve(process.cwd(), 'dist/static')));
}

app.get('*', (req, res) => {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.');
    }

    const context = {
        path: req.path
    }
    const renderStream = renderer.renderToStream(context);

    res.setHeader('Content-Type', 'text/html');
    res.write(indexHtml.head);
    
    renderStream.on('data', chunk => {
        res.write(chunk);
    });

    renderStream.on('end', () => {
        res.write(
            `<script>
                window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}
            </script>`
        );
        res.end(indexHtml.tail);
    });

    renderStream.on('error', err => {
        if (err && err.code === '404') {
            res.status(404).end('404 | Page Not Found');
            return;
        }
        res.status(500).end('Internal Error 500');
        console.error(`error during render: ${req.path}`);
        console.error(err);
    })
});

app.listen(port, () => {
    console.log(`==> Listening at http://localhost:${port}`);
})
