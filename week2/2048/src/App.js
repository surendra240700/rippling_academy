import React from 'react';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null
    };
  }
  
  //get all blank coordinates in the board
  getBlankCoordinates (board) {
    const blankCoordinates = [];
    console.log(board);
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {blankCoordinates.push([r, c])}
      }
    } 
    return blankCoordinates;
  };

  //random starting number
  randomStartingNumber() {
    const startingNumbers = [2,4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  };

  //randomly select one position and place a random number
  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    board[randomCoordinate[0]][randomCoordinate[1]] = this.randomStartingNumber();
    return board;
  }

  //initialise board to starting state
  initBoard() {
    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    board = this.placeRandom(board);
    this.setState({board, score: 0, gameOver: false, message: null});
  };

  //check to see if the board has been updated or not
  boardMoved(original, updated) {
    return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
  }
  // Check to see if there are any moves left
  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board)
    ];
    
    return (moves.includes(true)) ? false : true;
  }
  //Handling Keys
  handleKeys(e) {
    if(e.key=='n'){
      this.initBoard();
    }    
    else if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      this.move(e.key);
  };

  //rotate board 90 degrees to clockwise
  rotateRight(board) {
    let result = [];
	
  	for (let c = 0; c < board.length; c++) {
	  	let row = [];
	  	for (let r = board.length - 1; r >= 0; r--) {
			  row.push(board[r][c]);
		  }
      result.push(row);
	  }
	
	  return result;
  };
  
  //rotate board 90 degrees to counter-clockwise
  rotateLeft(board) {
  	let result = [];

    for (let c = board.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = board.length - 1; r >= 0; r--) {
        row.unshift(board[r][c]);
      }
      result.push(row);
    }

    return result;
  };

  //shifts all pieces to right and combines numbers
  shiftRight(inputBoard){
    // Shift all numbers to the right
    let board = [];
    let score = 0;
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    return {board,score};
  }

  moveUp(inputBoard){
    // Rotate right
    let rotatedRight = this.rotateRight(inputBoard);
    //shift elements
    let temp_state = this.shiftRight(rotatedRight);
    // Rotate board back upright
    temp_board = this.rotateLeft(temp_board);

    return {temp_board, score};
  }

  moveDown(inputBoard){
    // Rotate left
    let rotatedLeft = this.rotateLeft(inputBoard);
    //shift elements
    let [temp_board,score] = this.shiftRight(rotatedLeft);
    // Rotate board back upright
    temp_board = this.rotateRight(temp_board);

    return {temp_board, score};
  }

  moveLeft(inputBoard){
    // Rotate right twice
    let rotatedRight = this.rotateRight(this.rotateRight(inputBoard));
    //shift elements
    let [temp_board,score] = this.shiftRight(rotatedRight);
    // Rotate board back upright
    temp_board = this.rotateLeft(this.rotateLeft(temp_board));

    return {temp_board, score};
  }

  moveRight(inputBoard){
    //shift elements
    let [temp_board,score] = this.shiftRight(inputBoard);
    return {temp_board, score};
  }

  //Updaing Game after a successfull Move
  updateGame(moved){
    const upWithRandom = this.placeRandom(moved.board);
          
    if (this.checkForGameOver(upWithRandom)) {
      this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
    } 
    else {
      this.setState({board: upWithRandom, score: this.state.score += moved.score});  
    }
  }
  //Move Handling
  move(dir){
    if(this.state.gameOver){
      this.setState({message: 'Game over. Please start a new game.'});
    }
    else{
      if(dir==='ArrowUp'){
        const movedUp = this.moveUp(this.state.board);
        if (this.boardMoved(this.state.board, movedUp.board)) {
          this.updateGame(movedUp);
        }
      }
      else if(dir==='ArrowDown'){
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          this.updateGame(movedDown);
        }
      }
      else if(dir==='ArrowLeft'){
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          this.updateGame(movedLeft);
        }
      }
      else if(dir==='ArrowRight'){
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          this.updateGame(movedRight);
        }
      }
    };
  }

  componentWillMount() {
    this.initBoard();  
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeys.bind(this));
  }
  render(){
    return (
      <div id="main"> 
        <div className="button" onClick={() => {this.initBoard()}}>New Game</div>
                
        <div className="buttons">
          <div className="button" onClick={() => {this.move('up')}}>Up</div>
          <div className="button" onClick={() => {this.move('right')}}>Right</div>
          <div className="button" onClick={() => {this.move('down')}}>Down</div>
          <div className="button" onClick={() => {this.move('left')}}>Left</div>
        </div>
        
        <div className="score">Score: {this.state.score}</div>
        
        <table>
          <tbody>
          { this.state.board.map((row, i) => (<Row key={i} row={row} />)) }
          </tbody>
        </table>
        
        <p>{this.state.message}</p>
      </div>
    );
  }

}

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
    </tr>
  );
};

const Cell = ({ cellValue }) => {
  let color = 'cell';
  let value = (cellValue === 0) ? '' : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};

export default App;
