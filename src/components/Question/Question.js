import React from "react";
import './Question.css';
import Answers from "./Answers";

export default props =>{
    const cls = ['question'];



    return(
        <React.Fragment>
        <div className={cls.join(' ')}>
        <h3>
            {props.text}
        </h3>
        </div>
            <div className="answers">
            {props.answers.map((el, index)=>(
            <Answers
                key={index}
                id={index}
                answers={el}
                onAnswerClick={props.onAnswerClick}
                answer={props.answer ? props.answer[index]: null}
            />
            ))}
            </div>

</React.Fragment>
    )
}