import React from "react";
import Board from "./Board";
// import Button from "@mui/material/Button";
import ImgWinner from "./ImgWinner";
import ImgWinnerAI from "./ImgWinnerAI";
import handleClick from "./handleClick";
import Status from "./Status"
import GameInfo from './GameInfo'

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
        ...initState,
        // put a ternary statement inside total wins?
        totalWins: { X: totalCount, O: totalCount2 },
      };
    });
  };

  jumpTo = (step) => {
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
        {/* to send a function from a class component into a child component */}
        <Status reverse={this.reverse} winner={this.state.winner} stepNumber={this.state.stepNumber} totalWins={this.state.totalWins} active={this.state.active}/>
        <GameInfo history={this.state.history} stepNumber={this.state.stepNumber} active={this.state.active} handleReset={this.handleReset} jumpTo={this.jumpTo} />
        
      
      </div>
    );
  }
}
export default Game;
