import { ObjectId } from "mongodb";

export const changeName = async (req, res, mainColl) => {
    try {
        const oId = new ObjectId(req.body.userId);
        console.log(oId);
        const result = await mainColl.updateOne({ _id: oId }, { $set: { username: req.body.name } });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
}