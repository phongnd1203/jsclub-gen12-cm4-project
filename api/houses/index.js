const express = require("express");
const validator = require("express-validator");

const HouseModel = require("../../models/houses/house.model.js");

const housesRouter = express.Router();

housesRouter.get("/", async (req, res) => {
  const houses = await HouseModel.find().lean().exec();

  return res.status(200).render("house/show", {
    houses,
  });
});

housesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const house = await HouseModel.findById(id).lean().exec();

  if (!house) {
    return res.status(404).render("common/404");
  }

  return res.status(200).render("house/detail", {
    house,
  });
});

housesRouter.get("/create", (req, res) => {
  return res.render("house/create");
});

housesRouter.post(
  "/create",
  validator.body("name").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("districtCode").isString(),
  validator.body("price").isNumeric(),
  validator.body("area").isNumeric(),
  validator.body("avalability").isBoolean(),
  async (req, res) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("house/create", {
        errors: errors.array(),
      });
    }

    const {
      name,
      description,
      address,
      districtCode,
      price,
      area,
      availability,
    } = req.body;

    const house = new HouseModel({
      name,
      description,
      address,
      districtCode,
      price,
      area,
      availability,
    });

    await house.save();

    return res.status(201).redirect(`/houses/${house._id}`);
  },
);

housesRouter.get("/:id/edit", async (req, res) => {
  const { id } = req.params;

  const currentUser = req.session.user;

  const house = await HouseModel.findById(id).lean().exec();

  if (house.createdBy.toString() !== currentUser._id.toString()) {
    return res.status(403).render("common/403");
  }

  if (!house) {
    return res.status(404).render("common/404");
  }

  return res.status(200).render("house/edit", {
    house,
  });
});

housesRouter.post(
  "/:id/edit",
  validator.body("name").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("districtCode").isString(),
  validator.body("price").isNumeric(),
  validator.body("area").isNumeric(),
  validator.body("availability").isBoolean(),
  async (req, res) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("house/edit", {
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const currentUser = req.session.user;

    const house = await HouseModel.findById(id).exec();

    if (house.createdBy.toString() !== currentUser._id.toString()) {
      return res.status(403).render("common/403");
    }

    if (!house) {
      return res.status(404).render("common/404");
    }

    const {
      name,
      description,
      address,
      districtCode,
      price,
      area,
      availability,
    } = req.body;

    house.name = name;
    house.description = description;
    house.address = address;
    house.districtCode = districtCode;
    house.price = price;
    house.area = area;
    house.availability = availability;

    await house.save();

    return res.status(200).redirect(`/houses/${house._id}`);
  },
);

housesRouter.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  const currentUser = req.session.user;

  const house = await HouseModel.findById(id).exec();

  if (house.createdBy.toString() !== currentUser._id.toString()) {
    return res.status(403).render("common/403");
  }

  if (!house) {
    return res.status(404).render("common/404");
  }

  await house.remove();

  return res.status(200).redirect("/houses");
});

module.exports = housesRouter;
