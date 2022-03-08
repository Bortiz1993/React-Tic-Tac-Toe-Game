import React from 'react';
import Board from './Board';
import calculateWinner from "./calculateWinner";
import Button from '@mui/material/Button';
import {playNovice} from './RandomMove'
// import {useAlert} from 'react-alert'



var history = [
    // Before first move
    {
      squares: [
        null, null, null,
        null, null, null,
        null, null, null,
      ]
    },
    // After first move
    // {
    //   squares: [
    //     null, null, null,
    //     null, 'X', null,
    //     null, null, null,
    //   ]
    // },
    // // After second move
    // {
    //   squares: [
    //     null, null, null,
    //     null, 'X', null,
    //     null, null, 'O',
    //   ]
    // },
    // ...
  ]
  //state of the game.
//{ replace all nulls on Array to null?}
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            active: false,
            totalWins: {"X": 0, "O": 0},
            // winner: calculateWinner(current.stepNumber) 
        };
    }

    
    handleReset = () =>{
        this.setState({history : [{
            squares: Array(9).fill(null),
        }],
        stepNumber:"",
        xIsNext: "",
        active: "",
        winner: undefined,
        // totalWins: {"X":0, "O":0},

    })
    }

    // componentDidMount = () => {
    //     console.log('mounted')
    // }
    
     handleClick(i) {
        //Display the location for each move in the format (col, row) in the move history list. somewhere in here I need to create a Matrix, "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        var newHistory = history.concat([
            {
            squares:squares
        }
        ])
        const userWinner = calculateWinner(squares);
        if (userWinner){
            this.setState({
                winner: userWinner,   
                totalWins: {
                    ...this.state.totalWins,
                    [userWinner.winner]:this.state.totalWins[userWinner.winner] + 1, 
                },
                history: newHistory,
                stepNumber: newHistory.length - 1,
                 // xIsNext: !this.state.xIsNext  
            })
        } else if(!userWinner){
            //if there is no winner, once a player clicks, the random AI will pick a random spot on another tile.
            var history2 = newHistory.slice(0, this.state.stepNumber + 2);
            var current2 = history2[history2.length - 1];
            var squares2 = current2.squares.slice();
            var randomMove = playNovice(squares2)
            squares2[randomMove] = this.state.xIsNext ? 'O' : 'X';
            var lastHistory = history2.concat([
                { squares:squares2}        
            ])
            
            const CPUwinner = calculateWinner(squares);
            //if the CPU is the winner, we tell it that it won.
            if (CPUwinner){ 
                this.setState({
                    winner: CPUwinner,   
                    totalWins: {
                        ...this.state.totalWins,
                        [CPUwinner.winner]:this.state.totalWins[CPUwinner.winner] + 1, 
                    },
                    history: lastHistory,
                    stepNumber: lastHistory.length - 1,
                    // xIsNext: !this.state.xIsNext  
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
// {TODO somewhere here is the key to to perserving state for the totalwins}
     render(){
    //     let totalWin = this.state.totalWins
        //let history = this.state.history;
         const current = this.state.history[this.state.stepNumber] || this.state.current;
        // const winner = calculateWinner(current.squares);
        //   console.log(current)
        //  console.log(history)
        //  console.log(totalWin)
        // winner && !this.state.winner? this.setState({
        //     winner: winner
        // }):
        //  console.log("")
        // current && !this.state.current? this.setState({
        //     current: current
        // }):
        //  console.log("")
        // history !== this.state.history? this.setState({
        //     history: history
        // }):
        //  console.log("")
        //  totalWin && !this.state.totalWins? this.setState({
        //      totalWins: totalWin + 1 
        //  }):
        //  console.log("")
        //  console.log(current)
        //maps over history of the game
        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        
            return (
                <li key={move}>
                {/* ternary statement inside a class */}
                 <button className={move === this.state.stepNumber ? 'bold-item' : ''} 
                 onClick={() =>
                    this.jumpTo(move)}>{desc}</button>
                   
                </li>
        
            );
        });

        let title = 'Tic-Tac-Toe Game'
        //Terminal state of the game? decides whether the game ends or not?
        let status;
        let points1 = 'Points X: ' + this.state.totalWins['X']
        let points2 = 'Points O: ' + this.state.totalWins['O']
        //Depending on the condition, this if statement will display the winner.
        if (this.state.winner) {
            status = "Winner: " + this.state.winner.winner 
        //  if (this.state.winner.winner === 'X'){
        //     status = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');}
        //         this.setState({
        //           totalWins: {'X':this.state.totalWins['X'] + 1, 'O': this.state.totalWins['O']} 
        //           })
            //  points1 = 'Points X: ' +  this.state.totalWins['X'] + 1;
            
        //   }
        //  else if (this.state.winner.winner === 'O'){
        //     this.setState({
        //         totalWins: {'O':this.state.totalWins['O'] + 1, 'X': this.state.totalWins['X']} 
        //         })
            //    points2 = 'Points O: ' + this.state.totalWins['O'] + 1;
            // }
               
        
        //    { alert(this.state.winner.winner + 'Good job!')}
        //    else{
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        //    }
            // document.getElementById(this.state.winner.tile1).style.background = "rgba(0, 0, 255, 0.5)"
            // document.getElementById(this.state.winner.tile2).style.background = "rgba(0, 0, 255, 0.5)"
            // document.getElementById(this.state.winner.tile3).style.background = "rgba(0, 0, 255, 0.5)"
          }
          else {

            if (this.state.stepNumber >= 9){
                status = 'Draw'
            }

            //display status of the next player as long at there is no winner, status will display winner if there is a winner.
            else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                
            }
          }

        return(
            <div className='points'>
            {points1}<br/>
            {points2}
            <div className="game">
            <div className='title'>
            {title}
            </div>
            <div className="game-board">     
                <Board
                winner = {this.state.winner}
                 squares={current.squares}
                  onClick={(i) =>
                 { console.log(i)
                       this.handleClick(i)}}
                />
                <div className='status'>
                  {status}
                 
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
                 ///left of here 3/7/2022 something in the handleclick
            {/* console.log("mapping") */}
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
                 <Button variant="contained" size="medium" style={{margin: "5px", fontFamily: "fantasy"}} className={move === this.state.stepNumber ? 'bold-item' : ''} 
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
            </div>
        );
    }
}



export default Game



