import React from "react";
import * as R from "ramda";
import "./Puzzles.css";

let makeRandom =() => { return Math.random() - 0.5; };

let  makeSortable = (x) => x == null ? 99 : x;

class Puzzles extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board : [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14,15, null
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

    }

    isGameEnded(board){
        return R.equals(board.map(makeSortable).sort(), board)
    }

    render(){
        let {board, isStarted} = this.state;
        let emptyPuzzle = R.indexOf(null, board);

        return(
            <div>
                {!isStarted
                    ?<button onClick={() => this.onStart()}>start</button>
                    : <div className="Puzzles">
                        {board.map((x, i)=>
                            <div className="Puzzles-board" key={i}>
                              {x != null
                                    ? <div key={i} className="Puzzles-board-puzzle">
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
                <button onClick={()=>console.log(emptyPuzzle)}>test</button>
            </div>
        )
    }
}
export default  Puzzles;