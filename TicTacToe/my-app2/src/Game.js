import React from 'react';
import Board from './Board';
import calculateWinner from "./calculateWinner";
import Button from '@mui/material/Button';
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
        winner: undefined
    })
    }
    
    
    handleClick(i) {
        // console.log(i, 'js 64')
        //Display the location for each move in the format (col, row) in the move history list. somewhere in here I need to create a Matrix, "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        // console.log(history, 'js 67')
        var current = history[history.length - 1];
        // console.log(current)
        var squares = current.squares.slice();
        // console.log(squares)
        // if(calculateWinner(squares))
        // {
            // console.log("is this the winner")
        //     return;
        // }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        var newHistory = history.concat([
            {
            squares:squares
        }
    ])
    const winner = calculateWinner(squares);
    //  console.log(current)
    //  console.log(history)
    winner && !this.state.winner? this.setState({
        winner: winner
    }):
     console.log("")

        //checks what player is there? 
    if(!winner){
        var history2 = newHistory.slice(0, this.state.stepNumber + 2);
        // console.log(history2, 'js 67')
        var current2 = history2[history2.length - 1];
        // console.log(current2)
        var squares2 = current2.squares.slice();
        var randomMove = this.playNovice(squares2)
        console.log(squares2)

        squares2[randomMove] = this.state.xIsNext ? 'O' : 'X';
        var lastHistory = history2.concat([
            {
            squares:squares2
        }
    ])
    console.log(lastHistory)

        this.setState({
        history: lastHistory,
        stepNumber: lastHistory.length - 1,
        // xIsNext: !this.state.xIsNext,
        
    } )} else{
        this.setState({
            history: newHistory,
            stepNumber: newHistory.length - 1,
            // xIsNext: !this.state.xIsNext,
        }) }
    //random algorithim makes calculations here? Makes the decision based on what player clicks.
// console.log(squares, 'number 90')

// console.log(this.playNovice(squares), 'js 92')

//{TODO}
//  while(this.state.xIsNext != 'O'){
//  console.log('loading')
//  }
// 
 }
    getOpenTiles = (board) => {
        let copy = [...board]
        return copy.reduce((open, tile, index)=>{
            // console.log(tile, 'number 96')
           if(tile === null){
            //    console.log(tile)
               open.push(index);
           } 
           return open;
        }, [])
    }
//this one? calculates random number.
     playNovice = (cur_board) => {
        //  console.log(cur_board)
      let boardCopy = [...cur_board];
      const open_tiles = this.getOpenTiles(boardCopy); 
    //   console.log(open_tiles, 'js 109')
      if(open_tiles.length){
          const rand = Math.random() * open_tiles.length;
          return open_tiles[Math.floor(rand)];
      } 
      return null;
    }

      AiMove = (board, xIsNext) => {
          console.log('Aimove 130', this.state.xIsNext)
          var history2 = this.state.history.slice(0, this.state.stepNumber + 1);
          console.log(history2, 'js 67')
          var current2 = history2[history2.length - 1];
          console.log(current2)
          var squares2 = current2.squares.slice();
          var randomMove = this.playNovice(squares2)
          console.log(squares2)

          squares2[randomMove] = this.state.xIsNext ? 'X' : 'O';
          console.log(squares2, "js 138")
        this.setState(prevState => {
            console.log(prevState)
            
                        return ({
                        history: history2.concat([
                            {
                            squares:squares2
                        }
            
             ]),
              stepNumber: history2.length,
              xIsNext: !this.state.xIsNext,
                    })       
           });


        // let boardCopy = [...board] 
        // const move = this.playNovice(boardCopy);
        // boardCopy [move] = xIsNext;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

//history?
    render(){
        let history = this.state.history;
        const current = history[this.state.stepNumber] || this.state.current;
        const winner = calculateWinner(current.squares);
        //  console.log(current)
        //  console.log(history)
        winner && !this.state.winner? this.setState({
            winner: winner
        }):
         console.log("")
        current && !this.state.current? this.setState({
            current: current
        }):
         console.log("")
        history !== this.state.history? this.setState({
            history: history
        }):
         console.log("")
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

        
        let title;
        title = 'Tic-Tac-Toe Game'
        //Terminal state of the game? decides whether the game ends or not?
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner.winner 
        //    if (this.state.winner)
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
            else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                
            }
            // console.log(this.state.stepNumber)
          }

        return(
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
    // history = history.reverse()
     this.setState(prevState => { console.log(prevState.history)
    var copyHistory = [...prevState.history].reverse()
    // console.log(copyHistory)
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
            {/* console.log(desc) */}
            {/* console.log(this.state.active) */}
        
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
        );
    }
}



export default Game



