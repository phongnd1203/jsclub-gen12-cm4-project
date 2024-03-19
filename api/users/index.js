const express = require("express");

const getUserController = require("../../controllers/users/getUsers.controller.js");
const resetPasswordController = require("../../controllers/users/resetPassword.controller.js");

const updateUserValidator = require("../../validators/users/updateUser.validator.js");
const resetPasswordValidator = require("../../validators/users/resetPassword.validator.js");
const { Result } = require("postcss");

const requireLogin = require();

const usersRouter = express.Router();

usersRouter.get(
  "/reset-password",
  resetPasswordController.getResetPasswordPage,
);

usersRouter.post(
  "/reset-password",
  resetPasswordValidator,
  resetPasswordController.postResetPassword,
);
usersRouter.get("/users/:id", getUserController.getUserProfilePage);


usersRouter.put('/follow',requireLogin,(req,res)=>{

  if (!req.body.followId || typeof req.body.followId !== 'string') {
    return res.status(422).json({ error: "Invalid followId" });
}

  User.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user._id}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
        
    },{new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })

  }
  )
})


usersRouter.put('/unfollow',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.body.unfollowId,{
      $pull:{followers:req.user._id}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
        
    },{new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })

  }
  )
})

module.exports = usersRouter;