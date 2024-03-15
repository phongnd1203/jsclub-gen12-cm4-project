const express = require("express");
const validator = require("express-validator");
const userModel = require("../../models/users/user.model");
const userRouter = express.Router();

//profile
userRouter.get('/',
    // validator.param('id').isMongoId(),
    async(req, res) => {
        const id = req.session.user._id;
        const user = await userModel.findById(id).exec();
        console.log(user);
        res.render('user/profile', {user: user});     
    }
)

// update
userRouter.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    userModel.findById(id)
      .then((user) => {
        res.render("user/userupdate", {
          user: user,
        });
      })
      .catch((err) => console.log(err));
    });
userRouter.post('/edit/:id',
//   validator.param('id').isMongoId(),
  validator.body("name").notEmpty().withMessage("Vui lòng nhập tên mới"),
  validator.body("phone").notEmpty().isNumeric().isMobilePhone(),
  validator.body("email").notEmpty().isEmail().normalizeEmail().trim(),
  validator.body("password").notEmpty().isLength({ min: 8 }),

  async (req, res) => {
    try{
        const validationErrors = validator.validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).render("common/404", {
        errors: validationErrors.array(),
      });
    }

      const userUpdated = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

      res.status(304).redirect('/home');
    } catch(err){
      status: 'fail',
      res.status(404).json({message: 'Server error'});
    }
  }
);

module.exports = userRouter;