import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId  } from 'mongodb'
import { mailSender, sendContactMail } from './helpers/mailSender.js';
import { generateCode, createUser } from './helpers/helpers.js';
import { authLogin, login } from './functions/login.js';
import { changeName } from './functions/changeName.js';
import { deletaAcc } from './functions/deleteAcc.js';


const app = express();
let db;
let mainColl;
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4444;
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';

// const url = 'mongodb+srv://vasapanov721:HNVqGe7xAPh08YY6@cluster0.npsj2fw.mongodb.net/?retryWrites=true&w=majority'

let middleMail, middlePassowrd, midleUserName;

app.post("/sendEmail", async (req, res) => {
    try {
        const user = await mainColl.findOne({ email: req.body.email });
        if (user === null) {
            middleMail = req.body.email
            middlePassowrd = req.body.password
            midleUserName = req.body.username
            let userCode = generateCode()
            mailSender(req.body.email, userCode);
            res.status(200).send(userCode);
        } else {
            res.status(204).send('');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.post("/createUser", async (req, res) => {
    try {
        let user = createUser(middleMail, middlePassowrd, midleUserName);
        const result = await mainColl.insertOne(user);
        middleMail = ''
        middlePassowrd = ''
        midleUserName = ''
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    login(req, res, mainColl)
})


app.post("/changePassword", async (req, res) => {
    try {
        const user = await mainColl.findOne({ email: req.body.email });
        if (user === null) {
            res.status(404).send('');
        } else {
            let userCode = generateCode()
            mailSender(req.body.email, userCode);
            middleMail = req.body.email
            middlePassowrd = req.body.password
            res.status(200).send(userCode);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/savePassword", async (req, res) => {
    try {
        const result = await mainColl.updateOne({ email: middleMail }, { $set: { password: middlePassowrd } });
        middleMail = ''
        middlePassowrd = ''
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

//////////////////
// settings
//////////////////

app.post("/changeName", async (req, res) => {
    changeName(req, res, mainColl)
})

app.post("/contact", async (req, res) => {
    try {
        sendContactMail(req.body.email, req.body.question)
        res.status(200).send('')
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/deleteAccount", async (req, res) => {
    deletaAcc(req, res, mainColl)
})

app.post("/saveData", async (req, res) => {
    try {
        const oId = new ObjectId(req.body.userId);
        const result = await mainColl.updateOne({ _id: oId }, { $set: { calendar: req.body.data } });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/getAutorUser", async (req, res) => {
    authLogin(req, res, mainColl)
})

app.post("/addToHistory", async (req, res) => {
    try {
        const oId = new ObjectId(req.body.userId);
        const result = await mainColl.updateOne({ _id: oId }, { $push: { userHistory: req.body.data } });
        res.status(200).send(result)
    } catch (error) {
        res.send(400).send(error)
    }
})


app.post("/clearHistory", async (req, res) => {
    try {
        const oId = new ObjectId(req.body.userId);
        const result = await mainColl.updateOne({ _id: oId }, { $set: { userHistory: [] } });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})


app.post("/removeOneHistoryElem", async (req, res) => {
    try {
        const oId = new ObjectId(req.body.userId);
        const result = await mainColl.updateOne({ _id: oId }, { $set: { userHistory: req.body.data } });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})



MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
        console.log("MongoDB connected");
        db = client.db("financeDB");
        mainColl = db.collection("financeColl");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => console.log(err));











