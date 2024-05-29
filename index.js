const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const collection = require('./routes/collections');

const createCollectionTable = require('./queries/createCollectionTable');

const app = express();

const port = 4005;

app.use(cors());
app.use(bodyParser.json());

app.use('/collection', collection);

app.listen(port, async () => {
    try {
        await createCollectionTable();
        console.log(`Example app listening on port ${port}`);
    }
    catch (err) {
        console.log(err);
    }
});
