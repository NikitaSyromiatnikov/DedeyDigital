import Label from './Label';
import Delimiter from './Delimiter';

import calendar from './images/calendar-icon.png';
import shevron from './images/shevron.png';

const InputDateRange = () => {
    return (
        <div className="input__date__range__container">
            <div className="input__date__container">
                <Label text='Заезд' />

                <div className="input__container">
                    <img className="input__image" src={calendar} alt='calendar'></img>
                    <input className="input__calendar" type="date"></input>
                </div>
            </div>

            <Delimiter type='dot' />

            <div className="input__date__container">
                <Label text='Выезд' />

                <div className="input__container">
                    <input className="input__calendar" type="date"></input>
                    <img className="input__image" src={shevron} alt='shevron'></img>
                </div>
            </div>
        </div>
    );
}

export default InputDateRange;