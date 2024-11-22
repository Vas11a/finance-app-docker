import { ObjectId } from "mongodb";


export const deletaAcc = async (req, res, mainColl) => {
    try {
        const objectId = new ObjectId(req.body.userId);
        const result = await mainColl.deleteOne({ _id: objectId });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error);
    }
}