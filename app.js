const express = require('express');
const app = express();
const db = require('./config/db');
const User = require('./models/User');

app.get('/', (req, res) => res.send('Response berhasil'));

app.use(express.urlencoded({
    extended: true
}));

db.authenticate().then(() => 
    console.log('Berhasil Connect')
);

app.post('/user', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const findUser = await User.findOne({
            where: { email: email}
        });
        if (findUser === null) {
            const newUser = new User({
                username, email, password
            });
            await newUser.save();
            res.json(newUser);
        } else {
            res.status(500).json("User with that email already exist");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.get('/user/all', async (req, res) => {
    try {
        const allUser = await User.findAll();
        res.json(allUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const findUser = await User.findByPk(id);
        res.json(findUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

app.listen(5000, () => console.log('Port berjalan di 4500'));