const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const multer = require("multer");
const storageConfig = require("./middleware/upload-middleware");
const fileFilter = require("./helpers/file-filter");

app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));

const apiRouter = require("./routes/apiRouter.js");
app.use("/api", apiRouter);

var db = require("./models");
var initDatabase = require("./helpers/db-initializer");


const port = 3000;

db.sequelizeConfig.sync({ force: false }).then(() => {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
    initDatabase(db);
});




