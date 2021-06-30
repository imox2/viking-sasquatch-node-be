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


//Routes
app.use("/tree-api", router);
server.listen(3000, () => {
    console.log("Server started")
});
