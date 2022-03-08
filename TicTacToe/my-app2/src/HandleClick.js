//  function handleClick(i) {
//     //Display the location for each move in the format (col, row) in the move history list. somewhere in here I need to create a Matrix, "I" stands for the location of squares and its coordinates EX: 0,1, 0,2, 03.
//     var history = this.state.history.slice(0, this.state.stepNumber + 1);
//     var current = history[history.length - 1];
//     var squares = current.squares.slice();
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     var newHistory = history.concat([
//         {
//         squares:squares
//     }
//     ])
//     const userWinner = calculateWinner(squares);
//     if (userWinner){
//         this.setState({
//             winner: userWinner,   
//             totalWins: {
//                 ...this.state.totalWins,
//                 [userWinner.winner]:this.state.totalWins[userWinner.winner] + 1, 
//             },
//             history: newHistory,
//             stepNumber: newHistory.length - 1,
//              // xIsNext: !this.state.xIsNext  
//         })
//     } else if(!userWinner){
//         //if there is no winner, once a player clicks, the random AI will pick a random spot on another tile.
//         var history2 = newHistory.slice(0, this.state.stepNumber + 2);
//         var current2 = history2[history2.length - 1];
//         var squares2 = current2.squares.slice();
//         var randomMove = this.playNovice(squares2)
//         squares2[randomMove] = this.state.xIsNext ? 'O' : 'X';
//         var lastHistory = history2.concat([
//             { squares:squares2}        
//         ])
        
//         const CPUwinner = calculateWinner(squares);
//         //if the CPU is the winner, we tell it that it won.
//         if (CPUwinner){ 
//             this.setState({
//                 winner: CPUwinner,   
//                 totalWins: {
//                     ...this.state.totalWins,
//                     [CPUwinner.winner]:this.state.totalWins[CPUwinner.winner] + 1, 
//                 },
//                 history: lastHistory,
//                 stepNumber: lastHistory.length - 1,
//                 // xIsNext: !this.state.xIsNext  
//             })
//         }
//     } 
// }