const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User=require("../models/userModel");

//Get Goal
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user:req.user.id});
  res.status(200).json(goals);
});

//Create Goal
const setGoals = asyncHandler(async (req, res) => {
  console.log(req.body.text);
  if (!req.body.text) {
    res.status(404);
    throw new Error("The field is empty");
  }
  const goal= await Goal.create(
    {
        text: req.body.text,
        user: req.user.id,
    }
  )
  console.log(req.body);
  res.status(200).json(goal);
});


//Update Goal
const updateGoals = asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id);
    const goal= await Goal.findById(req.params.id)

    //If user not found
    if(!user){
      res.status(404);
      throw new Error("User not found");
    }

    //To make sure that user doesnot make changes to other user
    if(goal.user.toString() != user.id){
      res.status(404);
      throw new Error("Cannot make changes to other user")
    }

    //If goal not exist
    if(!goal){
        res.status(404);
        throw new Error("Goal not found");
    }
    const updatedGoal= await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

  res.status(200).json({ message: `${req.params.id} have been updated` });
});


//Delete Goal
const deleteGoals = asyncHandler(async (req, res) => {
    const goal= await Goal.findById(req.params.id)

    if(!goal){
        res.status(404);
        throw new Error("Goal not found");
    }

    const user=await User.findById(req.user.id);
    //If user not found
    if(!user){
      res.status(404);
      throw new Error("User not found");
    }

    //To make sure that user doesnot make changes to other user
    if(goal.user.toString() != user.id){
      res.status(404);
      throw new Error("Cannot make changes to other user")
    }

    await goal.deleteOne()

  res.status(200).json({ id:req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
