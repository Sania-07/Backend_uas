module.exports = function (app) {
  const product = require("../controllers/product.controller");
  const r = require("express").Router();

  r.get("/", product.findAll);
  r.get("/:id", product.show);
  r.post("/", product.create);
  r.put("/:id", product.update);
  r.delete("/:id", product.delete);

  app.use("/product", r);
};
