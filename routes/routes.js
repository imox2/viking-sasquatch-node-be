const express = require("express")
const router = express.Router();
const Tree = require("../model/Tree")

const setupRouter = (io) => {
    router.post("/setup", async (req, res) => {
        try {
            const data = req.body["data"];
            const tree = new Tree();
            tree.data = JSON.stringify(data);
            tree.save();
            res.status(200).send({success: true});
        } catch(e) {
            console.log(e);
            res.status(400).send({success: false});
        }
    });
    router.get("/tree", async (req, res) => {
        try {
            const tree = await Tree.findOne({})
            res.status(200).send(tree.data);
        } catch(e) {
            console.log(e);
            res.status(400).send({success: false});
        }
    });
    router.post("/tree", async (req, res) => {
        try {
            const data = req.body["data"];
            const tree = await Tree.findOne({})
            tree.data = JSON.stringify(data);
            await tree.save();
            io.emit("tree_change", {data});
            res.status(200).send({success: true})
        } catch(e) {
            console.log(e);
            res.status(400).send({success: false});
        }
    });
    return router;
}
module.exports = setupRouter;