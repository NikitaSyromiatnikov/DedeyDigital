import Spinbox from './Spinbox';

const InputSpinboxes = () => {
    return (
        <div className="input__spinbox__container">
            <Spinbox labelText='Номера' />
            <Spinbox labelText='Взрослые' />
            <Spinbox labelText='Дети' />
        </div>
    );
}

export default InputSpinboxes;