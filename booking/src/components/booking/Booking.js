import Plus from './Plus';
import Button from './Button';
import InputCity from './InputCity';
import Delimiter from './Delimiter';
import InputSpinboxes from './InputSpinboxes';
import InputDateRange from './InputDateRange';

const Booking = () => {
    return (
        <div className="booking__container">
            <InputCity />
            <Delimiter type='vertical' />
            <InputDateRange />
            <Delimiter type='vertical' />
            <InputSpinboxes />
            <Plus />
            <Button />
        </div>
    );
}

export default Booking;