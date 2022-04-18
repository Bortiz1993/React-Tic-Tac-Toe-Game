//targets a open tile.
 const getOpenTiles = (board) => {
    let copy = [...board]
    return copy.reduce((open, tile, index)=>{
       if(tile === null){
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
