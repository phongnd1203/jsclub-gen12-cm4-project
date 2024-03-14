const express = require("express");
// const mongoose = require('mongoose');
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
    res.redirect("/home");
  },
);

// details of room
roomRouter.get(
  "/:id",
  validator.param("id").isMongoId().withMessage("User Invalid"),
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("", {
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
// roomRouter.put(
//     '/:id/edit',
//     validator.body("name").notEmpty().withMessage("Vui lòng nhập tên"),
//     validator.body("description").optional({ nullable: true }),
//     validator.body("address").notEmpty(),
//     validator.body("price").notEmpty().isFloat({ min: 0 }),
//     validator.body("size").notEmpty().isFloat({ min: 0, max: 100 }),

//     async (req, res) => {
//         const validationErrors = validator.validationResult(req);

//         if (!validationErrors.isEmpty()) {
//             return res.status(400).render("", {
//                 errors: validationErrors.array(),
//             });
//         }
//         const room = await roomModel.findById(id);
//         res.render('accommodations/room/details', {
//             room: room
//         })
//         room = req.body;
//         room.save()
//         .then(result => {
//             const id = req.params.id;
//             res.redirect(`/${id}`);
//         })
//         .catch(res.status(400).redirect('/'));
//     }

// )

module.exports = roomRouter;
