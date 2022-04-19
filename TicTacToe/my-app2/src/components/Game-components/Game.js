import React from 'react';
import Board from './Board';
import calculateWinner from "./calculateWinner";
import Button from '@mui/material/Button';
import {playNovice} from './RandomMove'
import ImgWinner from './ImgWinner';
import ImgWinnerAI from './ImgWinnerAI'

  //state of the game.
  //{ replace all nulls on Array to null?}
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            history: [{
                squares:
                 Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            active: false,
            totalWins: {"X": 0, "O": 0},
            winner: undefined,
            draw: undefined,
        
        };
    }
    // reset state
    handleReset = () =>{
        this.setState(function (prevState) {
            ///ternary statement for the game state, basically once handle reset is clicked, the image will disappier and the points reset. TODO?
            let totalWinsX = 5
            let totalWinsO = 3
            var totalCount = prevState.totalWins['X'] === totalWinsX? 0:
            prevState.totalWins['X'];
            var totalCount2 = prevState.totalWins['O'] === totalWinsO? 0:
            prevState.totalWins['O'];
            
           
            return (
                {
                    history: [{
                        squares: Array(9).fill(null),
                    }],
                    stepNumber: 0,
                    xIsNext: true,
                    active: false,
                    // put a ternary statement inside total wins?
                     totalWins: {"X": totalCount, "O": totalCount2},
                    winner: undefined,
                    draw: false
                }
            )
        } )   
    }
    //{ find out where the if statement goes here  if (this.state.stepNumber >= 9)? 3/12/2022'}  
    //first handle click.
    handleClick(i) {
    // "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        var newHistory = history.concat([
            {
            squares:squares
        }
    ])

    //if there is a human winner, we tell it that it won. adds the +1 to the point system?
    const userWinner = calculateWinner(squares);
     if (userWinner){
        this.setState({
          winner: userWinner,
          totalWins: {
             ...this.state.totalWins,
             [userWinner.winner]:this.state.totalWins[userWinner.winner] + 1, 
         }, 
         history:newHistory,
         stepNumber: newHistory.length - 1, 
     })
       }
    //if there is no winner, once a player clicks, the random AI will pick a random spot on another tile.
    else if(!userWinner){
     var history2 = newHistory.slice(0, this.state.stepNumber + 2);
    //  console.log(draw)
     console.log(history2.length)
     var draw = history2.length >= 9
     if(draw){
         this.setState({
             draw: true
         })
     }
         var current2 = history2[history2.length - 1];
        var squares2 = current2.squares.slice();
        var randomMove = playNovice(squares2)
       squares2[randomMove] = this.state.xIsNext ? 'O' : 'X';
         var lastHistory = history2.concat([
        {
           squares:squares2
        }
        ])
        console.log(squares2)
    
    //if there is a computer winner, we tell it that it won. Adds the +1 to the CPU point system?
     const CPUwinner = calculateWinner(squares2);
     console.log('winner', CPUwinner)
     if(CPUwinner){ 
         console.log('CPUwon!')
         this.setState({
             winner: CPUwinner,
                 totalWins: {
             ...this.state.totalWins,
             [CPUwinner.winner]:this.state.totalWins[CPUwinner.winner] + 1, 
          }, 
        history:lastHistory,
        stepNumber: lastHistory.length - 1,
             })
     }  else{
        this.setState({
         history:lastHistory,
         stepNumber: lastHistory.length - 1,
                })
     }  
    }
}
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

//history?
    render(){
        let title;
        title = 'Tic-Tac-Toe Game'
        //Terminal state of the game? decides whether the game ends or not?
        let status;
        let status2;
        let points1 = 'Points X: ' + this.state.totalWins['X']
        let points2 = 'Points O: ' + this.state.totalWins['O']
        //Depending on the condition, this if statement will display the winner.
        if (this.state.winner) {
            status = "Winner: " + this.state.winner.winner 
            // document.getElementById(this.state.winner.tile1).style.background = "rgba(0, 0, 255, 0.5)"
            // document.getElementById(this.state.winner.tile2).style.background = "rgba(0, 0, 255, 0.5)"
            // document.getElementById(this.state.winner.tile3).style.background = "rgba(0, 0, 255, 0.5)"
          }
          else {

            if (this.state.stepNumber >= 9){
                status = 'Draw'; 
            }

             //display status of the next player as long at there is no winner, status will display winner if there is a winner.
            else {
                status = 'Player X wins at 5';
                status2 = 'Player O wins at 3';     
            }
          }
        return(
        // If a player wins, you get an image.
            <div className="game">
               {this.state.totalWins['X'] === 5? <ImgWinner
                   
               />:
               this.state.totalWins['O'] === 3? <ImgWinnerAI
               />:""
               }
            <div className='title'>
            {title}
            </div>
            <div className="game-board">     
                <Board
                draw = {this.state.draw}
                winner = {this.state.winner}
                 squares={this.state.history[this.state.stepNumber].squares}
                  onClick={(i) =>
                 { console.log(i)
                       this.handleClick(i)}}
                />
                <div className='status'>
                  {status}<br/>
                  {status2}<br/>
                  {points1}<br/>
                 {points2}
                 
                  <div> { this.state.winner?

    ( <Button variant="contained" size="small" color="success" className={this.state.active ? 'active': ''}
    onClick={ () => {
    this.setState({active: !this.state.active})
     this.setState(prevState => { console.log(prevState.history)
    var copyHistory = [...prevState.history].reverse()
    return ({
    history: copyHistory

})
})
}}>Reverse</Button>): ''}

</div>
 </div>
            </div>
          
            <div className="game-info">
              
             <ol>{ this.state.history.map((step, move) => {
            console.log("mapping")
    
            //use active for an if statement comparison
              const asend = !move ?
            'Go to end' :
            ((this.state.history.length - (move + 1)) === 0? "Go to game start" :
            'Go to move #'+  (this.state.history.length - (move + 1)) ) ;
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
                   
            return (
                <li key={move}>
                {/* ternary statement inside a class */}
                 <Button variant="contained" size="medium" style={{color:"black",  background:"#ffc107", margin: "5px", fontFamily: "fantasy", fontSize:"12px"}} className={move === this.state.stepNumber ? 'bold-item' : ''} 
                 onClick={() =>
                    {
                        if(!this.state.active){
                            if(desc === 'Go to game start'){
                                this.handleReset()
                            }
                            else{
                            this.jumpTo(move)
                        }
                            
                        }
                        else{
                            if(asend === 'Go to game start'){
                                this.handleReset()
                            }
                            else{
                                this.jumpTo(move)
                            }
                        }
                        }}>{this.state.active? asend:desc}</Button>
                   
                </li>
            );
        })}</ol>
            </div>
            </div>
        );
    }
}
export default Game



