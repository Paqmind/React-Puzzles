import React from "react";
import * as R from "ramda";
import "./Puzzles.css";

let makeRandom =() => { return Math.random() - 0.5; };

let swap = (xs, i1, i2) => {
    let x1 = xs[i1];
    let x2 = xs[i2];
    xs = R.update(i1, x2, xs);
    xs = R.update(i2, x1, xs);
    return xs;
};

let  makeSortable = (x) => x == null ? 99 : x;

class Puzzles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board : [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, null
            ],
            isStarted : false,
            isChecked : false
        }
    }

    makeBoard(){
        return this.state.board.sort(makeRandom)
    }

    onStart(){
      this.setState({
          board: this.makeBoard(),
          isStarted : true
      })
    }

    swapPuzzles(i){
      let board = this.state.board;
      let emptyPuzzle = R.indexOf(null, board);
      let puzzle = R.indexOf(i , board);


              this.setState({
                  board: swap(board, puzzle, emptyPuzzle)
              });

    }

    isGameEnded(board){
        return R.equals(board.map(makeSortable).sort((x,y) => x-y), board.map(makeSortable));
    }

    render(){
        let {board, isStarted, isChecked} = this.state;

        return(
            <div>
                {!isStarted
                    ?<button className="btn-start" onClick={() => this.onStart()}>Начать игру</button>
                    : <div className="Puzzles">
                        {board.map((x, i)=>
                            <div className="Puzzles-board" key={i}>
                              {x != null
                                    ? <div key={i} className="Puzzles-board-puzzle"
                                           onClick={() => this.swapPuzzles(x, i)}>
                                            <span className="Puzzles-board-puzzle_text" key={i + ":" + i}>
                                                {x}
                                            </span>
                                    </div>
                                    : <div key={i} className="Puzzles-board-puzzle_empty">
                                            <span key={i + ":" + i}>{x}</span>
                                    </div>
                                }
                            </div>

                        )}
                        <button className="Puzzles-btn_check"
                            onClick={() => this.setState({isChecked : true})}>Проверка</button>

                        {
                            isChecked && isStarted && !this.isGameEnded(board)
                            ? alert("ответ неправильный,пожалуйста,вернитесь к игре")
                            :  this.isGameEnded(board) ? alert("победа")
                                : false
                        }
                    </div>
                }
            </div>
        )
    }
}
export default  Puzzles;