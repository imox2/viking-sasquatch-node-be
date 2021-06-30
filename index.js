const express = require("express")
const socketIO = require("socket.io")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});
const setupRouter = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
mongoose.Promise = global.Promise;
  mongoose.connect(
    "mongodb://localhost:27017/viking",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
io.on('connection', () => {

});

const router = setupRouter(io);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Routes
app.use("/", router);
server.listen(3000, () => {
    console.log("Server started")
});