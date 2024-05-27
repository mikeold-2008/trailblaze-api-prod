const SoloChallenge = require("../models/soloChallengeModel")




exports.getSoloChallengesByUserId = async (req,res) =>{
    const userId = req.params.id
    const {exercise} = req.query
    let mongoQuery  = {}
    if(exercise){
        mongoQuery = {"user_id":userId, "exercise_name":exercise}
    }
    else{
        mongoQuery = {"user_id":userId}
    }
    try{
        const challengeList = await SoloChallenge.find(mongoQuery)
        if(challengeList.length===0){
            return res.status(404).json({ "message": 'No solo challenges found for this user' });
        }
        res.json(challengeList);
    }
    catch(error){
        res.status(500).json({ error: 'An error occurred while fetching user challenges' });
    }
}


exports.postSoloChallenge = async (req,res) =>{
    const {exercise_name, user_id, duration, distance} = req.body
    const date = new Date() 

    try{
    const soloChallenge = await SoloChallenge.create({
        "exercise_name":exercise_name,
        "user_id": user_id,
        "duration": duration,
        "distance": distance,
        "startDate": date,
        "pass": false
    })
    res.json({"message": "Challenge created"})
    }
    catch(error){
        res.status(500).json({ error: 'An error occurred while creating the challenge' });
    }
}


exports.patchSoloChallengePass = async (req,res) =>{
    const challengeId = req.params.id
    const {pass} = req.body
try{
    const challenge = await SoloChallenge.findOne({"challenge_id": challengeId})
    if(challenge){
        challenge.pass = pass
        await challenge.save()
        res.status(200).json({"message": `Challenge pass updated to ${pass}`})
    }
    else{
        res.status(404).json({ error: 'Challenge not found' });
    }
}
catch(error){
    res.status(500).json({ error: 'An error occurred while updating the challenge' });
}

}
