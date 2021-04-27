import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';
import { Socket } from 'socket.io-client';
const server = "http://localhost:3000";

const Welcome = ({playerCount, joinGame, socket}) => {
    // const [ username, setUsername ] = useState("");
    //get the existing usrnames???? 
    const [ usrInput, setUsrInput ] = useState("");
     

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e)
    
    };

    const handleInput = e => setUsrInput(e.target.value);

 
    const handleCreate = e => {
        e.preventDefault();
        console.log(e.target)

        // setUsername(usrInput);
     
        const player = usrInput;
        console.log(player)
        //pass back to server
        // axios.post(`${server}/quizzes`, {
        //     player: player
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // console.log(socket)
        // useEffect(
        //     socket.emit('add user', player)
        // );

        // setUsrInput("");
        socket.emit('pass-username', player);
        
    } 

    const renderJoin= () => {
        let tags = null; 

        if(playerCount < 2 ) {
            tags = "disabled";
        }
        console.log

        return(
            <>
            <input type="submit" className={tags} name="joinQuiz" value="Join"/>
            </>
        )

    }


    return(
        <div id="welcome" >
            <img src="../../images/quizlogo.png" alt="logo: Let's Get Quizzical"/>
            <form >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Choose your player name" value={usrInput} onChange={handleInput}/>
            
                <input type="submit" name="newQuiz" value="New Game" onClick={handleCreate}/>
                {renderJoin()}
            </form>
            <p>{ (playerCount - 1) ===  0 ? "No Players Online" : `Players online: ${playerCount - 1}`}</p>
        </div>
    );
};

export default Welcome; 