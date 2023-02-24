import BlogModel from "../../../../DB/model/Blog.model.js";
import UserModel from "../../../../DB/model/User.model.js";

export const getUserModule = async (req, res, next) => {
  try {
    const users = await UserModel.find({ 
      isDeleted: false ,
      "_id": {  $ne: `${req.user._id}` } 
    
    });
    return res.json({ message: "Done", users });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};
//********** start-update */

//find user by id and then update if new = true this mean thant user will return with the new result
export const findByIdAndUpdate = async (req, res, next) => {
  try {


    const{id} = req.params
    const {_id } =req.user
   const checkUser =  await UserModel.findOne({ 
      isDeleted: false ,
      "_id": _id
    
    });

   if(checkUser){
    const user = await UserModel.findByIdAndUpdate(
      { _id:id, isDeleted: false },
      req.body,
      { new: true }
    );
    res.json({ message: "users Updated Sucsessfully", user })

   }else{

    res.json({ message: "You arent Authorized" });
   }


  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};

//********** end-update */

//********** start-delete*/

//it is return object without modifiedCount( hardDeleted== deleted from database)
export const findOneAndDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {_id } =req.user

    const checkUser =  await UserModel.findOne({ 
      isDeleted: false ,
      "_id": _id
    
    });



    if(checkUser){
      const user = await UserModel.findByIdAndDelete({ _id: id, isDeleted: true });
      res.json({ message: "users deleted Sucsessfully", user })
  
     }else{
  
      res.json({ message: "You arent Authorized" });
     }

  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};

//********** end-delete*/

//***soft-delete */

export const softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.updateOne(
      { _id:id, isDeleted: false },
      { isDeleted: true }
    );


    return user.modifiedCount
      ? res.json({
          message: "user deleted Sucsessfully but this user in database" })
      : res.json({ message: "InValid-Id" });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};
export const restoretodatabase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.updateOne(
      { _id:id, isDeleted: true },
      { isDeleted: false }
    );


    return user.modifiedCount
      ? res.json({
          message: "user Restored Sucsessfully and your post Restored" })
      : res.json({ message: "InValid-Id" });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};

export const getAllTrashedUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ isDeleted: true });
    return res.json({ message: "Done", users });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const user = await UserModel.findById({ _id: req.user._id, isDeleted: false });
    return user
      ? res.json({ message: "users Founded Sucsessfully", user })
      : res.json({ message: "InValid-UserId" });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};
export const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await UserModel.findOneAndUpdate(
      { _id:id, role: "user" },
      { role: "admin" }
    );


    return user
      ? res.json({
          message: "userChanged To Admin successfully" })
      : res.json({ message: "error" });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};
export const RestoreRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await UserModel.findOneAndUpdate(
      { _id:id, role: "admin" },
      { role: "user" }
    );


    return user
      ? res.json({
          message: "userChanged to UserRole Successfully" })
      : res.json({ message: "error" });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};
