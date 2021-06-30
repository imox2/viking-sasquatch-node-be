const express = require("express")
const router = express.Router();
const Tree = require("../model/Tree")

const setupRouter = (io) => {
    router.get("/tree", async (req, res) => {
        try {
            let response = {data:[],_id:''};
            const tree = await Tree.findOne({})
            if(tree) {
                response = {data:JSON.parse(tree.data),_id:tree._id};
            }
            res.status(200).send(response);
        } catch(e) {
            console.log(e);
            res.status(400).send({success: false});
        }
    });
    router.post("/tree/:id?", async (req, res) => {
        try {
            const data = req.body["data"];
            const dbData = {data: JSON.stringify(data)};
            if(req.params.id) {
                dbData["_id"]=req.params.id;
            }
            const obj = new Tree(dbData);
            obj.isNew = req.params.id ? false: true;
            await obj.save();
            io.emit("tree_change", dbData);
            res.status(200).send({success: true})
        } catch(e) {
            console.log(e);
            res.status(400).send({success: false});
        }
    });
    return router;
}
module.exports = setupRouter;