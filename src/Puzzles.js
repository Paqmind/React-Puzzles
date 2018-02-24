import React from "react";

let makeRandom =() => {
    return Math.random() - 0.5;
};

class Puzzles extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gameField : [
                1, 2, 3,
                4, 5, 6,
                7, 8, 9,
                10, 11, ""
            ],
        }
    }

    makeRandomField(){
      this.setState({
          gameField: this.state.gameField.sort(makeRandom)
      })
    }

    render(){
        return(
            <div>
                <button onClick={()=>this.makeRandomField()}>start</button>

                {this.state.gameField.map((x, i)=>
                    <div key={i}>
                        <span key={i + ":" + i}>{x}</span>
                    </div>
                )}

            </div>
        )
    }
};
export default  Puzzles;