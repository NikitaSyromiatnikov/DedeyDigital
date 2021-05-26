import Label from './Label';

import pin from './images/location-pin.png';

const InputCity = () => {
    return (
        <div className="booking__city__item">
            <Label text='Место или название отеля' />

            <div className="input__container">
                <img className="input__image" src={pin} alt='location pin'></img>
                <input className="input__city" type="text" placeholder="Введите здесь место"></input>
            </div>
        </div>
    );
}

export default InputCity;