import React from 'react';
import Board from './Board';
import calculateWinner from "./calculateWinner"


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
            // winner: calculateWinner(current.stepNumber) 
        };
    }
    handleClick(i) {
        //Display the location for each move in the format (col, row) in the move history list. somewhere in here I need to create a Matrix, "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        console.log(history)
        const current = history[history.length - 1];
        console.log(current)
        const squares = current.squares.slice();
        console.log(squares)
        // if(calculateWinner(squares))
        // {
        //     console.log("is this the winner")
        //     return;
        // }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                squares:squares
            }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render(){
        let history = this.state.history;
        const current = history[this.state.stepNumber] || this.state.current;
        const winner = calculateWinner(current.squares);
        console.log(winner)
        winner && !this.state.winner? this.setState({
            winner: winner
        }):
        console.log("not yet?")
        current && !this.state.current? this.setState({
            current: current
        }):
        console.log("not yet?")
        history !== this.state.history? this.setState({
            history: history
        }):
        console.log("not yet?")
        console.log(current)
        //maps over history of the game
        const moves = history.map((step, move) => {
            console.log("mapping")
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

        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner.winner 
            console.log(this.state.winner)
            document.getElementById(this.state.winner.tile1).style.background = "rgba(0, 0, 255, 0.5)"
            document.getElementById(this.state.winner.tile2).style.background = "rgba(0, 0, 255, 0.5)"
            document.getElementById(this.state.winner.tile3).style.background = "rgba(0, 0, 255, 0.5)"
            
          }

          else {

            if (this.state.stepNumber >= 9){
                status = 'Draw'
            }
            else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                
            }

            
            console.log(this.state.stepNumber)
          }

        return(
            <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) =>
                   { console.log(i)
                       this.handleClick(i)}}
                />
            </div>
            <div className="game-info">
                <div className='status'>{status} { this.state.winner?

                ( <button className={this.state.active ? 'active': ''}
            onClick={ () => {
                this.setState({active: !this.state.active})
                // history = history.reverse()
            this.setState(prevState => { console.log(prevState.history)
            var copyHistory = [...prevState.history].reverse()
            console.log(copyHistory)
                return ({
                    history: copyHistory

                })
            })
            }}>Click</button>): ''} 
                </div>
             <ol>{ this.state.history.map((step, move) => {
            console.log("mapping")
            //use active for an if statement comparison
              const asend = !move ?
            'Go to end' :
            'Go to move #'+  (this.state.history.length - move)  ;
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        
            return (
                <li key={move}>
                {/* ternary statement inside a class */}
                 <button className={move === this.state.stepNumber ? 'bold-item' : ''} 
                 onClick={() =>
                    this.jumpTo(move)}>{this.state.active? asend:desc}</button>
                   
                </li>
        
            );
        })}</ol>
            </div>

            </div>
        );
    }
}

export default Game



