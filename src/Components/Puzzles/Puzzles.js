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

      // if (puzzle == emptyPuzzle - 1 || puzzle == emptyPuzzle + 1 ||
      //     puzzle == emptyPuzzle + 4 || puzzle == emptyPuzzle - 4) {
              this.setState({
                  board: swap(board, puzzle, emptyPuzzle)
              // });
          })
    }

    isGameEnded(board){
        return R.equals(board.map(makeSortable).sort((x,y) => x-y), board.map(makeSortable))
    }

    render(){
        let {board, isStarted} = this.state;

        return(
            <div>
                <button onClick={() => console.log(board)}>board</button>
                <button onClick={() =>console.log(this.isGameEnded(board)) }>ended</button>

                {!isStarted
                    ?<button onClick={() => this.onStart()}>start</button>
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
                    </div>
                }
            </div>
        )
    }
}
export default  Puzzles;