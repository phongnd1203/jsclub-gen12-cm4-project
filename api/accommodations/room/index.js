const express = require("express");
const validator = require("express-validator");
const roomModel = require("../../../models/accommondations/room.model");
const roomRouter = express.Router();

// HomePage
roomRouter.get("/", async (req, res) => {
  roomModel
    .find()
    .sort({ createdAt: -1 })
    .then((allRoom) => {
      res.render("accommodations/show", {
        data: allRoom,
      });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});
//Create Page
roomRouter.get("/create", async (req, res) => {
  res.render("accommodations/create");
});
// Create room
roomRouter.post(
  "/create",
  validator.body("name").notEmpty().withMessage("Vui lòng nhập tên"),
  validator.body("description").optional({ nullable: true }),
  validator.body("address").notEmpty(),
  validator.body("price").notEmpty().isFloat({ min: 0 }),
  validator.body("size").notEmpty().isFloat({ min: 0, max: 100000 }),
  validator.body("capacity").notEmpty(),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).render("", {
        errors: validationErrors.array(),
      });
    }

    const { name, description, address, price, size, capacity } = req.body;

    const id = await req.session.user._id;
    const room = new roomModel({
      name,
      description,
      address,
      price,
      size,
      capacity,
      available: true,
      createdBy: id,
    });
    await room.save();
    res.redirect("/");
  },
);

// details of room
roomRouter.get(
  "/:id",
  validator.param("id").isMongoId().withMessage("User Invalid"),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("common/404", {
        errors: validationErrors.array(),
      });
    }

    const { id } = req.params;
    const room = await roomModel.findById(id);
    res.render("accommodations/details", {
      room: room,
    });
  },
);

// edit room

roomRouter.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  roomModel
    .findById(id)
    .then((room) => {
      res.render("accommodations/edit", {
        room: room,
      });
    })
    .catch((err) => console.log(err));
});
//edit
roomRouter.post(
  "/edit/:id",
  validator.body("name").notEmpty().withMessage("Vui lòng nhập tên"),
  validator.body("description").optional({ nullable: true }),
  validator.body("address").notEmpty(),
  validator.body("price").notEmpty().isFloat({ min: 0 }),
  validator.body("size").notEmpty().isFloat({ min: 0 }),

  async (req, res) => {
    try {
      const validationErrors = validator.validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).render("common/404", {
          errors: validationErrors.array(),
        });
      }
      const updatedRoom = await roomModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res.status(304).redirect(`/room/${req.params.id}`);
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  },
);
// delete
roomRouter.get("/delete/:id", async (req, res) => {
  await roomModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/room");
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = roomRouter;
