//targets a open tile.
 const getOpenTiles = (board) => {
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

//this one? calculates random number. playNovice const is being exported to Game with getOpenTiles inside.
 export const playNovice = (cur_board) => {
    let boardCopy = [...cur_board];
    const open_tiles = getOpenTiles(boardCopy); 
    if(open_tiles.length){
        const rand = Math.random() * open_tiles.length;
        return open_tiles[Math.floor(rand)];
    } 
    return null;
  }
  //--------------------------------------------------------------------- Aimove is not being used.
//    const AiMove = () => {
//     console.log('Aimove 130', this.state.xIsNext)
//     var history2 = this.state.history.slice(0, this.state.stepNumber + 1);
//     console.log(history2, 'js 67')
//     var current2 = history2[history2.length - 1];
//     console.log(current2)
//     var squares2 = current2.squares.slice();
//     var randomMove = this.playNovice(squares2)
//     console.log(squares2)

//     squares2[randomMove] = this.state.xIsNext ? 'X' : 'O';
//     console.log(squares2, "js 138")
//   this.setState(prevState => {
//       console.log(prevState)
      
//                   return ({
//                   history: history2.concat([
//                       {
//                       squares:squares2
//                   }
      
//        ]),
//         stepNumber: history2.length,
//         xIsNext: !this.state.xIsNext,
//               })       
//      });
  // let boardCopy = [...board] 
  // const move = this.playNovice(boardCopy);
  // boardCopy [move] = xIsNext;
//}