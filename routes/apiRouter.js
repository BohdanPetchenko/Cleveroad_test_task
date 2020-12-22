const express = require("express");
const apiController = require("../controllers/index.js");
const apiRouter = express.Router();

apiRouter.post("/register", apiController.registrationUser);
apiRouter.post("/login", apiController.loginUser);
apiRouter.get("/me", apiController.getCurrentUser);
apiRouter.post("/items", apiController.createItem);
apiRouter.get("/items", apiController.getItemsList);
apiRouter.get("/items/:id", apiController.getItemById);
apiRouter.put("/items/:id", apiController.updateItem);
apiRouter.delete("/items/:id", apiController.deleteItem);
apiRouter.delete("/items/:id", apiController.deleteItem);
apiRouter.post("/items/:id/images", apiController.uploadFile);

module.exports = apiRouter;