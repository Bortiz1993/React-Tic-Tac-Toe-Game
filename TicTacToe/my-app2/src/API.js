const AI = 2;
const Player = 1;
const DEPTH = 6;

export const getOpenTiles = (board) => {
    let copy = [...board]
    return copy.reduce((open,tile,index) => {
        if(tile === -9){
            open.push(index);

        }
        return open;
    }, [])
}

export const checkWinner = (board) => {
    let diag1, diag2, horz1, horz2, horz3, vert1, vert2, vert3;
    diag1 = diag2 = horz1 = horz2 = horz3 = vert1 = vert2 = vert3 = 0;
    let player1, player2;
    player1 = player2 = 0;
}

