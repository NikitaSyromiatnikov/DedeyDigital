import React, { useState } from 'react';

import Label from './Label';

import up from './images/arrow-up.png';
import down from './images/arrow-down.png';

const Spinbox = ({ labelText }) => {
    const [count, setCount] = useState(1);

    const increment = () => { setCount(prevCount => prevCount + 1); }
    const decrement = () => { setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); }
    const handleChange = (event) => { setCount(Number(event.target.value)); }

    return (
        <div className="spinbox__item">
            <Label text={labelText} />

            <div className="spinbox__container">
                <input className="input__spinbox" type="number" onChange={handleChange} value={count}></input>
                <div className="spinbox__arrows">
                    <img className="spinbox__arrow" onClick={increment} src={up} alt="arrow up"></img>
                    <img className="spinbox__arrow" onClick={decrement} src={down} alt="arrow down"></img>
                </div>
            </div>
        </div>
    )
}

export default Spinbox;