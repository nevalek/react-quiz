import React from 'react';
import './Level.css'

export default props => {
    const lvls = ['Лёгкий', 'Средний', 'Сложный', 'Детский'];
    return(
        <div className='level'>
            <ul>
            {lvls.map((el, index)=>{
                return(
                    <li
                        key={index}
                        onClick={()=>props.onLevels(index + 1)}
                    >
                        {el}
                    </li>
                )
            })}
            </ul>
        </div>
    )
}