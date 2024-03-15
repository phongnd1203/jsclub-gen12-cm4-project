const express = require("express");
const validator = require("express-validator");
const userModel = require("../../models/users/user.model");
const userRouter = express.Router();

//profile
userRouter.get(
    '/',
    // validator.param('id').isMongoId(),
    async(req, res) => {
        const id = req.session.user._id;
        const user = await userModel.findById(id).exec();
        console.log(user);
        res.render('user/profile', {user: user});     
    }
)

// // update
// userRouter.post(
//   '/:id',
//   validator.param('id').isMongoId(),
//   validator.body("name").notEmpty(),
//   validator.body("phone").notEmpty().isNumeric().isMobilePhone(),
//   validator.body("email").notEmpty().isEmail().normalizeEmail().trim(),
//   validator.body("password").notEmpty().isLength({ min: 8 }),

//   async (req, res) => {
//     const validationErrors = validator.validationResult(req);
//     if (!validationErrors.isEmpty()) {
//       return res.status(400).render("", {
//         errors: validationErrors.array(),
//       });
//     }


//     try{
//       const userId = req.params.id;
//       const updateData = req.body;

//       const user = await user.findByIdAndUpdate(userId, updatedData, { new: true});

//       if (!user){
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.json({message: 'User updated successfully', user});
//     }

//     catch(err){
//       console.error(err);
//       res.status(500).json({message: 'Server error'});
//     }
//   }
// );

module.exports = userRouter;