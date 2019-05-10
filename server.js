const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const path = require('path');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}.`));