const express = require("express");
const validator = require("express-validator");

const HouseModel = require("../../models/houses/house.model.js");

const housesRouter = express.Router();

housesRouter.get("/create", (req, res) => {
  return res.render("pages/houses/create.view.ejs");
});

housesRouter.post(
  "/create",
  validator.body("name").isString(),
  validator.body("description").isString(),
  validator.body("address").isString(),
  validator.body("districtCode").isString(),
  validator.body("price").isNumeric(),
  validator.body("area").isNumeric(),
  async (req, res) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/houses/create.view.ejs", {
        errors: errors.array(),
      });
    }

    const { name, description, address, districtCode, price, area } = req.body;

    const currentUser = req.session.user;

    const house = new HouseModel({
      name,
      description,
      address: {
        path: address,
        districtCode,
      },
      price,
      area,
      createdBy: currentUser._id,
    });

    await house.save();

    return res.status(201).redirect(`/house/${house._id}`);
  },
);

housesRouter.get("/", async (req, res) => {
  const houses = await HouseModel.find().lean().exec();

  return res.status(200).render("pages/houses/list.view.ejs", {
    houses,
  });
});

housesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const house = await HouseModel.findById(id).lean().exec();

  return res.status(200).render("pages/houses/detail.view.ejs", {
    house,
  });
});

housesRouter.get("/:id/edit", async (req, res) => {
  const { id } = req.params;

  const currentUser = req.session.user;

  if (!currentUser) {
    return res.redirect("/auth/login");
  }

  const house = await HouseModel.findById(id).lean().exec();

  if (!house) {
    return res.status(404).render("pages/common/errors/not-found.view.ejs");
  }

  if (house.createdBy.toString() !== currentUser._id.toString()) {
    return res.status(403).render("pages/common/errors/forbidden.view.ejs");
  }

  return res.status(200).render("pages/houses/edit.view.ejs", {
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
      return res.status(400).render("pages/houses/edit.view.ejs", {
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const currentUser = req.session.user;

    const house = await HouseModel.findById(id).exec();

    if (house.createdBy.toString() !== currentUser._id.toString()) {
      return res.status(403).render("pages/common/errors/forbidden.view.ejs");
    }

    if (!house) {
      return res.status(404).render("pages/common/errors/not-found.view.ejs");
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

    return res.status(200).redirect(`/house/${house._id}`);
  },
);

housesRouter.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  const currentUser = req.session.user;

  const house = await HouseModel.findById(id).exec();

  if (house.createdBy.toString() !== currentUser._id.toString()) {
    return res.status(403).render("pages/common/errors/forbidden.view.ejs");
  }

  if (!house) {
    return res.status(404).render("pages/common/errors/not-found.view.ejs");
  }

  await house.remove();

  return res.status(200).redirect("/house");
});

module.exports = housesRouter;
