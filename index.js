const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const app = express();

app.use(express.json());

const generes = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Horror' }
];


app.get('/', (req, res) => {
    res.send("Welcome to Vidly!!")
});

app.get('/api/generes/', (req, res) => {
    res.send(generes)
});

app.get('/api/generes/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) res.status(404).send('No Genere found for this ID')
    res.send(genere)
});

app.post('/api/generes/', (req, res) => {
    const { error } = validGenere(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.send(genere);
});

app.put('/api/generes/:id', (req, res) => {

    const { error } = validGenere(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) {
        res.status(404).send('Genere not Found with given ID');
        return;
    }

    genere.name = req.body.name;
    res.send(genere);
});

app.delete('/api/generes/:id', (req, res) => {

    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) {
        res.status(404).send('Unable to locate Genere with given ID');
        return;
    }
    const index = generes.indexOf(genere);
    generes.splice(index, 1);
    res.send(genere);
});



function validGenere(genere) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()

    });
    return schema.validate(genere)
}

















const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Listening to port:${port}...`);
});