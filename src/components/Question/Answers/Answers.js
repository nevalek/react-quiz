import React from 'react';
import './Answers.css';

export default props =>{
    const cls = ['answer'];

    if(props.answer){
        cls.push(props.answer)
    }

    return(
            <button
                key={props.index}
                className={cls.join(' ')}
                onClick={()=>props.onAnswerClick(props.id)}
            >
                {props.answers}
            </button>
    )
}