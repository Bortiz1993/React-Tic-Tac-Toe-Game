import React from "react";
import Button from "@mui/material/Button";

class Status extends React.Component {
  //history?
  render() {
    return (
      <div className="status">
        {/* <p> */}
          {
            //Depending on the condition, this if statement will display the winner.
            this.props.winner ? (
           <span id="win"> Winner: {this.props.winner.winner}</span>
            ) : this.props.stepNumber >= 9 ? (
             <span id= "draw">Draw</span>
            ) : (
              //display status of the next player as long at there is no winner, status will display winner if there is a winner.
              <>
                <span>X wins at 5</span>
                 <span> O wins at 3</span>
              </>
            )
          }
        {/* </p> */}

        {/* //Terminal state of the game? decides whether the game ends or not? */}
        <span>Points X: {this.props.totalWins["X"]}</span>
        <span> Points O:  {this.props.totalWins["O"]}</span>
        {/* <div> */}
          {this.props.winner ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              className={this.props.active ? "active" : ""}
              //   To access a function from a parent Class Component.
              onClick={this.props.reverse}
            >
              Reverse
            </Button>
          ) : (
            ""
          )}
        {/* </div> */}
      </div>
    );
  }
}
export default Status;
