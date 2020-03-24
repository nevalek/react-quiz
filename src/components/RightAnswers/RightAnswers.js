import React from 'react';
import './RightAnswers.css';

export default props => {
    return(
        <div className='rightanswers'>
            {props.answers.map((el, index)=>{
                let {q, a} = el;
                return(
                    <div key={index} className='right-answer'>
                        <span>{q}</span>
                        <span>{a}</span>
                    </div>
                )
            })}
        </div>
    )
}