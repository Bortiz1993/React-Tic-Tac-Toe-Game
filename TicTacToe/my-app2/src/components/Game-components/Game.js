import React from "react";
import Board from "./Board";
import Button from "@mui/material/Button";
import ImgWinner from "./ImgWinner";
import ImgWinnerAI from "./ImgWinnerAI";
import handleClick from "./handleClick";
import Status from "./Status"

// how many points each player wins
const totalWinsX = 5;
const totalWinsO = 3;
//state of the game.
const initState = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    active: false,
    totalWins: { X: 0, O: 0 },
    winner: undefined,
    draw: undefined,
  };
//{ replace all nulls on Array to null?}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState
  }
  handleSetState = (obj) => {
    this.setState(obj);
  };
  // reset state
  handleReset = () => {
    this.setState(function (prevState) {
      ///ternary statement for the game state, basically once handle reset is clicked, the image will disappier and the points reset. TODO?
      var totalCount =
        prevState.totalWins["X"] === totalWinsX ? 0 : prevState.totalWins["X"];
      var totalCount2 =
        prevState.totalWins["O"] === totalWinsO ? 0 : prevState.totalWins["O"];

      return {
        // history: [
        //   {
        //     squares: Array(9).fill(null),
        //   },
        // ],
        // stepNumber: 0,
        // xIsNext: true,
        // active: false,
        ...initState,
        // put a ternary statement inside total wins?
        totalWins: { X: totalCount, O: totalCount2 },
        // winner: undefined,
        // draw: false,
      };
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  reverse = () => {
    this.setState({ active: !this.state.active });
    this.setState((prevState) => {
      console.log(prevState.history);
      var copyHistory = [...prevState.history].reverse();
      return {
        history: copyHistory,
      };
    });
  }

  //history?
  render() {
    return (
      // If a player wins, you get an image.
      <div className="game">
        {this.state.totalWins["X"] === totalWinsX ? (
          <ImgWinner />
        ) : this.state.totalWins["O"] === totalWinsO ? (
          <ImgWinnerAI />
        ) : (
          ""
        )}
        <div className="title">Tic-Tac-Toe Game</div>
        <div className="game-board">
          <Board
            draw={this.state.draw}
            winner={this.state.winner}
            squares={this.state.history[this.state.stepNumber].squares}
            onClick={(i) => {
              handleClick(i, this.handleSetState, this.state);
            }}
          />
        
        </div>
        {/* to access a function from a class component */}
        <Status reverse={this.reverse} winner={this.state.winner} stepNumber={this.state.stepNumber} totalWins={this.state.totalWins} active={this.state.active}/>
        <div className="game-info">
          <ol>
            {this.state.history.map((step, move) => {
              console.log("mapping");

              //use active for an if statement comparison
              const asend = !move
                ? "Go to end"
                : this.state.history.length - (move + 1) === 0
                ? "Go to game start"
                : "Go to move #" + (this.state.history.length - (move + 1));
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
                      move === this.state.stepNumber ? "bold-item" : ""
                    }
                    onClick={() => {
                      if (!this.state.active) {
                        if (desc === "Go to game start") {
                          this.handleReset();
                        } else {
                          this.jumpTo(move);
                        }
                      } else {
                        if (asend === "Go to game start") {
                          this.handleReset();
                        } else {
                          this.jumpTo(move);
                        }
                      }
                    }}
                  >
                    {this.state.active ? asend : desc}
                  </Button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
export default Game;
