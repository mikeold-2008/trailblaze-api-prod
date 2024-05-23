const User = require("../models/userModel")


// Get a specific user by ID number
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findOne({id: userId});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const userDetails = {"id": user.id, "firstName": user.firstName}
        res.json(userDetails);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
   };


exports.getUserPasswordHash = async(req,res) =>{
  const userId = req.params.id;
  const passwordHash = req.params.passwordHash;
  try{
    const user = await User.findOne({id: userId});
    if(user.password === passwordHash){
      res.json({"message": "User Authenticated"}) 
    }
    else{
      res.json("Couldn't authenticate user")
    }
  }
  catch(error){
    res.status(500).json({ error: 'An error occurred while authenticating the user' })
  }
}


//Create a user, when given user details
exports.postUser = async (req,res) =>{
  const {email,password,firstName,lastName} = req.body 
  
  //check that this user doesn't already exist
  const user = await User.findOne({email: email});
  if (!user) {
    try{
      await User.create(
        { 
          "email": email,
          "password": password,
          "firstName": firstName,
          "lastName": lastName
        }
      )
      res.json({"email": email, "firstName": firstName, "lastName": lastName})
    }
    catch(error){
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  }
  else{
    res.status(500).json({ error: 'A user with that email address already exists' });
  }
}


exports.deleteUser = async (req,res) =>{
  const userId = req.params.id;
  try{
    await User.deleteOne({id: userId})
    res.json({"id": userId, "message": "Successfully deleted"})
  }
  catch(error){
    res.status(500).json({ error: 'Unable to delete this user' });
  }
}