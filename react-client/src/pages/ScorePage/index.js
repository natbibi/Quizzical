import React, {useEffect} from "react";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import axios from 'axios'

const ScorePage =() => {

const username = useSelector((state) => state.user.username)
const score = useSelector((state)=> state.quizReducer.score) //get score from state

  const sendResults = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                headers: { 'Content-Type': 'application/json' }
            }
            const results = {
                "player": username,
                "score": score
              }
            console.log(results)
            const { data } = await axios.post(`https://quizzicalquiz.herokuapp.com/players`, results, options)
            console.log(data)
            if (data.err){
                throw Error(data.err)
            }
            resolve('Scores sent to leaderboard!')
        } catch (err) {
            reject(`Can't send results: ${err}`);
        }
    })
  }

    useEffect(() => {
        sendResults()

    })

  return (
    <>
    <div id="playerscore">
      <h1>You scored: {score}</h1>
    </div>
    
    <Link to="/leaderboard"><button>Go to Leaderboard</button></Link>
 
    </>
  );
}
export default ScorePage;