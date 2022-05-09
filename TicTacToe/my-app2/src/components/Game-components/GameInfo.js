import Button from "@mui/material/Button";

function GameInfo ({history, stepNumber, active, handleReset, jumpTo }){
    return(
        <div className="game-info">  
          <ol>
            {history.map((step, move) => {
              console.log("mapping");

              //use active for an if statement comparison
              const asend = !move
                ? "Go to end"
                : history.length - (move + 1) === 0
                ? "Go to game start"
                : "Go to move #" + (history.length - (move + 1));
              const desc = move ? "Go to move #" + move : "Go to game start";

              return (
                <li key={move}>
                  {/* ternary statement inside a class */}
                  <Button
                    variant="contained"
                    size="medium"
                    style={{
                      color: "black",
                      background: "#ffc107",
                      margin: "5px",
                      fontFamily: "fantasy",
                      fontSize: "12px",
                    }}
                    className={
                      move === stepNumber ? "bold-item" : ""
                    }
                    onClick={() => {
                      if (!active) {
                        if (desc === "Go to game start") {
                          handleReset();
                        } else {
                          jumpTo(move);
                        }
                      } else {
                        if (asend === "Go to game start") {
                          handleReset();
                        } else {
                        jumpTo(move);
                        }
                      }
                    }}
                  >
                    {active ? asend : desc}
                  </Button>
                </li>
              );
            })}
          </ol>    
        </div>        
    );
}

export default GameInfo;