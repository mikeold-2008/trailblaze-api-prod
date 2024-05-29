const User = require("../models/userModel")
const bcrypt = require ('bcrypt')


// Get a specific user by ID number
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findOne({id: userId});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const userDetails = {
          "id": user.id,
          "email": user.email, 
          "firstName": user.firstName,
          "lastName": user.lastName,
          "friends": user.friends
        }
        res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
   };


exports.getUserPasswordHash = async(req,res) =>{
  const userEmail = req.params.email;
  const token = req.params.token;
  try{
    const user = await User.findOne({email: userEmail});
    if(user){
      const validPassword = await bcrypt.compare(token,user.password)
      if(validPassword){
        res.status(200).json({"id": user.id})
      }
      else{
        res.status(400).json({"message": "Couldn't authenticate user"})
      }
    }
    else{
      res.status(404).json({"message": "User not found"})
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
          "password": await bcrypt.hash(password,10),
          "firstName": firstName,
          "lastName": lastName,
          "friends": []
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



exports.patchFriendsList = async (req,res) =>{
  const requesterId = req.params.id 
  const {email} = req.body
  try{
    const friendRequester = await User.findOne({id: requesterId})
    const friendToAdd = await User.findOne({"email": email})
    

    friendRequester.friends = [...friendRequester.friends, {"friendUserId":friendToAdd.id, "friendName": friendToAdd.firstName}]
    
    friendToAdd.friends = [...friendToAdd.friends, {"friendUserId": friendRequester.id, "friendName": friendRequester.firstName}]

    Promise.all([friendRequester.save(),friendToAdd.save()])
    .then(()=>{
      res.json({"message": "Friends successfully added"})
    })
  }
  catch(error){
    res.status(500).json({ error: 'Unable to add as a friend' });
  }
}