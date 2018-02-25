import React from "react";
import * as R from "ramda";
import "./Game.css";

const fullBoard = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
    17,  18, 19, 20,
    21 ,22 ,23, 24
];

let makeRandom =() =>  Math.random() - 0.5;

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
                {props.btns}
            </div>
        </div>
    )
};

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board : [],
            isStarted : false,
            isShowPopup : false,
            boardSize : "",
        }
    }

    makeBoard(n){
        let board = fullBoard.slice(0, n);
        this.state.board = board.concat([null]).sort(makeRandom);
        return this.state.board;
    }

    onStart(n){
      this.setState({
          board: this.makeBoard(n),
          isStarted : true,
          boardSize : Math.sqrt(n + 1) + "x" + Math.sqrt(n + 1),
          isShowPopup : false,
      })
    }

    swapPuzzles(i){
        let sqrtOfArrLength = Math.sqrt((this.state.board).length);
        let board = this.state.board;
        let emptyPuzzle = R.indexOf(null, board);
        let puzzle = R.indexOf(i , board);

        if( puzzle == emptyPuzzle - 1 || puzzle == emptyPuzzle + 1 ||
            puzzle == emptyPuzzle + sqrtOfArrLength || puzzle == emptyPuzzle - sqrtOfArrLength ){
            this.setState({
                board: swap(board, puzzle, emptyPuzzle)
            });
        }
    }

    isGameEnded = (board) => R.equals(board.map(makeSortable).sort((x,y) => x-y), board.map(makeSortable));

    togglePopup = () => this.setState({isShowPopup : !this.state.isShowPopup});

    render(){
        let {board, isStarted, isShowPopup, boardSize} = this.state;

        return(
            <div>
                {!isStarted
                    ? <div className="starting">
                        <h1 className="starting-title">Игра в пятаншки</h1>
                        <p className="starting-text"> Игра в 15, пятнашки, — популярная головоломка,
                            придуманная в 1878 году Ноем Чепмэном.<br/>
                            Игроку доступно поле размером 4x4, состоящее из 16 клеток. Все клетки кроме одной заняты
                            костяшками с номерами от 1 до 15, которые перемешаны между собой.
                            Цель игры - упорядочить костяшки по порядку используя свободное поле.<br/>
                            В данной версии можно ,помимо классического режима 4x4 ,можно так же выбрать режимы
                            3x3 и 5x5.
                        </p>
                        <div className="starting-btns">
                            <button className="starting-btns_btn" onClick={() => this.onStart(8)}>3x3</button>
                            <button className="starting-btns_btn" onClick={() => this.onStart(15)}>4x4</button>
                            <button className="starting-btns_btn" onClick={() => this.onStart(24)}>5x5</button>
                        </div>
                    </div>

                    : <div className="Puzzles">
                        {board.map((x, i) =>
                            <div className={boardSize == "3x3" ? "Puzzles-board-3x3" :  boardSize == "4x4" ?
                                "Puzzles-board-4x4" : "Puzzles-board-5x5" } key={i}>

                                {x != null
                                    ? <div key={i} className={boardSize == ("3x3"|| "4x4") ?
                                        "Puzzles-board-puzzle" : "Puzzles-board-puzzle-5x5"}
                                         onClick={() => this.swapPuzzles(x, i)}>
                                                <span className="Puzzles-board-puzzle_text" key={i + ":" + i}>
                                                    {x}
                                                </span>
                                    </div>
                                    : <div key={i} className={boardSize == ("3x3" || "4x4") ?
                                        "Puzzles-board-puzzle_empty" : "Puzzles-board-puzzle_empty-5x5"}>
                                        <span key={i + ":" + i}>{x}</span>
                                    </div>
                                }
                            </div>
                        )}

                        <button className="Puzzles-btn_check"
                            onClick={() => this.togglePopup()}>Проверка
                        </button>

                        {isShowPopup
                            ? <Popup
                                title={
                                    !this.isGameEnded(board)
                                        ? <span>Вы совершили ошибку,пожалуйста,продолжите игру</span>
                                        : <span>Игра окончена</span>
                                }
                                btns={!this.isGameEnded(board) ?
                                    <button className="Popup-btn_close" onClick={() => this.togglePopup()}>
                                        Продолжить
                                    </button>
                                    :<div className="Popup-btns">
                                        <h3 className="Popup-btns_title">Попробуйте ещё раз</h3>
                                        <button className="Popup-btns_btn" onClick={() => this.onStart(8)}>3x3</button>
                                        <button className="Popup-btns_btn" onClick={() => this.onStart(15)}>4x4</button>
                                        <button className="Popup-btns_btn" onClick={() => this.onStart(24)}>5x5</button>
                                    </div>
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
export default Game;