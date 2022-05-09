// import React from 'react';
import calculateWinner from "./calculateWinner";
import {playNovice} from './RandomMove';

function handleClick(i, setState, state){
    //   {/* "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03. */}
        var history = state.history.slice(0, state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        squares[i] = state.xIsNext ? 'X' : 'O';
        var newHistory = history.concat([
            {
            squares:squares
        }
    ])

    // {/* //if there is a human winner, we tell it that it won. adds the +1 to the point system? */}
    const userWinner = calculateWinner(squares);
     if (userWinner){
        setState({
          winner: userWinner,
          totalWins: {
             ...state.totalWins,
             [userWinner.winner]:state.totalWins[userWinner.winner] + 1, 
         }, 
         history:newHistory,
         stepNumber: newHistory.length - 1, 
     })
       }
    // {/* //if there is no winner, once a player clicks, the random AI will pick a random spot on another tile. */}
    else if(!userWinner){
         var history2 = newHistory.slice(0, state.stepNumber + 2);
            console.log(history2.length)
         var draw = history2.length >= 9
     if(draw){
         setState({
             draw: true
         })
     }
     
     var current2 = history2[history2.length - 1];
     var squares2 = current2.squares.slice();
     var randomMove = playNovice(squares2)
     squares2[randomMove] = state.xIsNext ? 'O' : 'X';
     var lastHistory = history2.concat([
        {
           squares:squares2
        }
        ])
        console.log(squares2)
    // {TODO Maybe an Else statement goes here?}
    //if there is a computer winner, we tell it that it won. Adds the +1 to the CPU point system?
     const CPUwinner = calculateWinner(squares2);
        console.log('winner', CPUwinner)
     if(CPUwinner){ 
         console.log('CPUwon!')
         setState({
             winner: CPUwinner,
                 totalWins: {
             ...state.totalWins,
             [CPUwinner.winner]:state.totalWins[CPUwinner.winner] + 1, 
          }, 
        history:lastHistory,
        stepNumber: lastHistory.length - 1,
             })
     }   else{
        setState({
         history:lastHistory,
         stepNumber: lastHistory.length - 1,
                })
      }
     
    }
}
export default handleClick;


  //{ find out where the if statement goes here  if (this.state.stepNumber >= 9)? 3/12/2022'}  
    //first handle click.
//     handleClick(i) {
//     // "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
//         var history = this.state.history.slice(0, this.state.stepNumber + 1);
//         var current = history[history.length - 1];
//         var squares = current.squares.slice();
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         var newHistory = history.concat([
//             {
//             squares:squares
//         }
//     ])

//     //if there is a human winner, we tell it that it won. adds the +1 to the point system?
//     const userWinner = calculateWinner(squares);
//      if (userWinner){
//         this.setState({
//           winner: userWinner,
//           totalWins: {
//              ...this.state.totalWins,
//              [userWinner.winner]:this.state.totalWins[userWinner.winner] + 1, 
//          }, 
//          history:newHistory,
//          stepNumber: newHistory.length - 1, 
//      })
//        }
//     //if there is no winner, once a player clicks, the random AI will pick a random spot on another tile.
//     else if(!userWinner){
//          var history2 = newHistory.slice(0, this.state.stepNumber + 2);
//             console.log(history2.length)
//          var draw = history2.length >= 9
//      if(draw){
//          this.setState({
//              draw: true
//          })
//      }
     
//      var current2 = history2[history2.length - 1];
//      var squares2 = current2.squares.slice();
//      var randomMove = playNovice(squares2)
//      squares2[randomMove] = this.state.xIsNext ? 'O' : 'X';
//      var lastHistory = history2.concat([
//         {
//            squares:squares2
//         }
//         ])
//         console.log(squares2)
//     // {TODO I have to break all of this consts into smaller components. Maybe an Else statement goes here?}
//     //if there is a computer winner, we tell it that it won. Adds the +1 to the CPU point system?
//      const CPUwinner = calculateWinner(squares2);
//         console.log('winner', CPUwinner)
//      if(CPUwinner){ 
//          console.log('CPUwon!')
//          this.setState({
//              winner: CPUwinner,
//                  totalWins: {
//              ...this.state.totalWins,
//              [CPUwinner.winner]:this.state.totalWins[CPUwinner.winner] + 1, 
//           }, 
//         history:lastHistory,
//         stepNumber: lastHistory.length - 1,
//              })
//      }   else{
//         this.setState({
//          history:lastHistory,
//          stepNumber: lastHistory.length - 1,
//                 })
//      }
      
//     }
// }