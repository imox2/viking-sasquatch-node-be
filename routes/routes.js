const express = require("express")
const router = express.Router();
const Tree = require("../model/Tree")

const setupRouter = (io) => {
    router.get("/tree", async (req, res) => {
        try {
            let response = [];
            const tree = await Tree.findOne({})
            if(tree) {
                response = tree.data;
            }
            res.status(200).send(response);
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