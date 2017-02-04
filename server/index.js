import express from 'express';
import bodyParser from 'body-parser';
import LRU from 'lru-cache';

import { port } from '../config/sys.config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', (req, res) => {
    res.send('Hello World by kash');
});

app.listen(port, () => {
    console.log(`==> Listening at http://localhost:${port}`);
})
