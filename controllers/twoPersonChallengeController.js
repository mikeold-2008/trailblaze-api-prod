const TwoPersonChallenge = require("../models/twoPersonChallengeModel")
const User = require("../models/userModel")



exports.getTwoPersonChallengesByUserId = async (req,res) =>{
    const userId = req.params.id
    const {exercise} = req.query
    let proposerQuery  = {"challenge_proposer_id":userId}
    let accepterQuery = {"challenge_accepter_id":userId}
    if(exercise){
        proposerQuery.exercise_name = exercise
        accepterQuery.exercise_name = exercise
    }

    try{
        let challengeList = []
        
        const proposerList = await TwoPersonChallenge.find(proposerQuery)
        const accepterList = await TwoPersonChallenge.find(accepterQuery)
        challengeList = [...challengeList, ...proposerList, ...accepterList]

        if(proposerList.length===0 && accepterList.length ===0){
            return res.status(404).json({ "message": 'No challenges found for this user' });
        }
        res.json(challengeList);
    }
    catch(error){
        res.status(500).json({ error: 'An error occurred while fetching user challenges' });
    }
}


exports.postTwoPersonChallenge = async (req,res) =>{
    const {proposer_id, accepter_id,exercise_name,duration,target} = req.body
    const date = new Date()

    try{
        const proposer = await User.findOne({id: proposer_id})
        const accepter = await User.findOne({id: accepter_id})

        const twoPersonChallenge = await TwoPersonChallenge.create({
            challenge_proposer_id: proposer_id,
            challenge_proposer_name: proposer.firstName,
            challenge_accepter_id: accepter_id,
            challenge_accepter_name: accepter.firstName,
            exercise_name: exercise_name,
            duration: duration,
            target: target,
            challenge_winner: 0,
            start_date: date,
            challenge_accepted: false
        })
        res.json({"message": "Challenge created"})
    }
    catch(error){
        res.status(500).json({ error: 'An error occurred while creating the challenge' });
    }
}


exports.patchChallengeAccepted = async (req,res) =>{
    const dual_challenge_id = req.params.challenge_id
    try{
        const challenge = await TwoPersonChallenge.findOne({dual_challenge_id: dual_challenge_id})
        challenge.challenge_accepted = true;
        await challenge.save()
        res.json({"message": "Challenge successfully accepted"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'An error occurred while updating the challenge' });
    }

}