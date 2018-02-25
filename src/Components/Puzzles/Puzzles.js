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

let Popup = (props) => {
    return(
        <div className="Popup">
            <div className="Popup-inner">
                <h2 className="Popup-title">{props.title}</h2>
                <button className="Popup-btn_close" onClick={props.onClick}>{props.btnText}</button>
            </div>
        </div>
    )
};

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
            isShowPopup : false
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
      if( puzzle == emptyPuzzle - 1 || puzzle == emptyPuzzle + 1 ||
          puzzle == emptyPuzzle + 4 || puzzle == emptyPuzzle - 4 ){
            this.setState({
                  board: swap(board, puzzle, emptyPuzzle)
              });
      }
    }

    isGameEnded(board){
        return R.equals(board.map(makeSortable).sort((x,y) => x-y), board.map(makeSortable));
    }
    togglePopup(){
        this.setState({
            isShowPopup : !this.state.isShowPopup
        })
    }
    restartGame(){
        this.setState({
            isShowPopup:false,
            isStarted : false
        });
        return this.onStart();
    }

    render(){
        let {board, isStarted, isShowPopup} = this.state;

        return(
            <div>
                {!isStarted
                    ?<div className="starting">
                        <h1 className="starting-title">Игра в пятаншки</h1>
                        <p className="starting-text"> Игра в 15, пятнашки, — популярная головоломка,
                            придуманная в 1878 году Ноем Чепмэном.<br/>
                            Игроку доступно поле размером 4x4, состоящее из 16 клеток. Все клетки кроме одной заняты
                            костяшками с номерами от 1 до 15, которые перемешаны между собой.
                            Цель игры - упорядочить костяшки по порядку используя свободное поле.</p>

                        <button className="starting-btn" onClick={() => this.onStart()}>Начать игру</button>

                    </div>
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
                            onClick={() => this.togglePopup()}>Проверка</button>

                        {isShowPopup
                            ? <Popup
                                title={
                                    !this.isGameEnded(board)
                                        ? <span>Вы совершили ошибку,пожалуйста,продолжите игру</span>
                                        : <span>Игра окончена</span>
                                }
                                onClick={!this.isGameEnded(board)
                                    ? () => this.togglePopup()
                                    : () => this.restartGame()
                                }
                                btnText={!this.isGameEnded(board)
                                    ? "Продолжить"
                                    : "Начать заново"
                                }
                              />
                            : false
                        }
                    </div>
                }
            </div>
        )
    }
}
export default  Puzzles;