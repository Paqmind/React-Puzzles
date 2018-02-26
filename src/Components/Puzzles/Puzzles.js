import React from "react";
import * as R from "ramda";
import "./Puzzles.css";

let makeRandom =() =>  Math.random() - 0.5;

let swap = (xs, i1, i2) => {
    let x1 = xs[i1];
    let x2 = xs[i2];
    xs = R.update(i1, x2, xs);
    xs = R.update(i2, x1, xs);
    return xs;
};

let areSwappable = (i1, i2) => Math.abs(i1 - i2) == 1 || Math.abs(i1 - i2) == 4 ;

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
                13, 14, 15,
            ],
            isStarted : false,
            doesShowPopup : false
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
      let i2 = R.indexOf(null, board);

      if (areSwappable(i, i2) ){
            this.setState({
                  board: swap(board, i, i2)
            });
      }
    }

    isGameEnded = (board) => R.equals(board.map(makeSortable).sort((x, y) => x - y), board.map(makeSortable));

    togglePopup(){
        this.setState({
            doesShowPopup : !this.state.doesShowPopup
        })
    }

    restartGame(){
        this.setState({
            doesShowPopup:false,
            isStarted : false
        });
        return this.onStart();
    }

    render(){
        let {board, isStarted, doesShowPopup} = this.state;

        return(
            <div>
                {!isStarted
                    ? <div className="starting">
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
                                           onClick={() => this.swapPuzzles(i)}>
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
                            onClick={() => this.togglePopup()}>Проверка
                        </button>

                        {doesShowPopup
                            ? <Popup
                                title={!this.isGameEnded(board)
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