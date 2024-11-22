import { updateCalendarData } from "../helpers/helpers.js";
import { ObjectId } from "mongodb";

export const login = async (req, res, mainColl) => {
    try {
        const user = await mainColl.findOne({ email: req.body.email });
        const resArr = updateCalendarData(user.calendar)
        user.globalTotal = resArr[1]
        user.weekTotal = resArr[2]
        user.calendar = resArr[0]
        if (user === null || user.password !== req.body.password) {
            res.status(404).send('');
        } else {
            res.status(200).send(user);            
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const authLogin = async (req, res, mainColl) => {
    try {
        const oId = new ObjectId(req.body.token);
        const user = await mainColl.findOne({ _id: oId });
        const resArr = updateCalendarData(user.calendar)
        user.globalTotal = resArr[1]
        user.weekTotal = resArr[2]
        user.calendar = resArr[0]
        if (user === null) {
            res.status(404).send('');
        } else {
            res.status(200).send(user);            
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

