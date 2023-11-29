const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://127.0.0.1:27017/siet')
    .then(() => {
        console.log('Connected to siet database');
    })
    .catch((err) => {
        console.error(err);
    });

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, // Changed field name
    message: { type: String } // Changed field name and default value
    
});

const User = mongoose.model('datas', UserSchema);

app.use(express.json());
app.use(cors());



app.post('/data', async (req, resp) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const userWithoutPassword = result.toObject();
        // If 'password' field exists, delete it
        if (userWithoutPassword.password) {
            delete userWithoutPassword.password;
        }
        resp.send(userWithoutPassword);
        console.log(userWithoutPassword);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
