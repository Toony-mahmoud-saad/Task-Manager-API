const taskDB = require("../models/task.model");
const JWT = require("jsonwebtoken");

exports.craeteTask = async (req, res) =>{
  try {
    let newTask = await taskDB.create(req.body);
    res.json({ message: "Task created", task: { _id: newTask._id, title: newTask.title} });
  } catch (error) {
    console.log("Erorr in craeteTask ",error);
    res.status(400).send({message: `Error in createTask ${error}`})
  }
}


exports.readListOfTasks = async (req, res) =>{
  try {
    let statusTask = await taskDB.find({status: req.body.status});
    res.json({message: `the tasks for ${req.body.status} status Exist`, Data: [statusTask]});
  } catch (error) {
    console.log("Erorr in craeteTask ",error);
    res.status(400).send({message: `Error in createTask ${error}`})
  }
}


exports.readTask = async (req, res) =>{
  try {
    let {id} = req.params;
    let task = await taskDB.findById(id);
    res.json({message: "Exist", taskData: task});
  } catch (error) {
    console.log("Erorr in craeteTask ",error);
    res.status(400).send({message: `Error in createTask ${error}`})
  }
}


exports.updateTask = async (req, res) =>{
  try {
    let {id} = req.params
    let {title, status} = req.body
    if(req.user.role == "admin"){
      let updatedTask = await taskDB.findByIdAndUpdate(id, {title, status});
      res.json({message: "Task Updated successfully", task: updatedTask})
    }else{
      res.status(400).send({message: `هي سايبة ولا ايه, ده مش مقامك لازم تبقى أدمن`})
    }
  } catch (error) {
    console.log("Erorr in craeteTask ",error);
    res.status(400).send({message: `Error in createTask ${error}`})
  }
}


exports.deleteTask = async (req, res) =>{
  try {
    let {id} = req.params
    if(req.user.role == "admin"){
      let deletedTask = await taskDB.findByIdAndDelete(id);
      res.json({message: "Task Deleted successfully", task: deletedTask});
    }else{
      res.status(400).send({message: `هي سايبة ولا ايه, ده مش مقامك لازم تبقى أدمن`})
    }
  } catch (error) {
    console.log("Erorr in craeteTask ",error);
    res.status(400).send({message: `Error in createTask ${error}`})
  }
}


