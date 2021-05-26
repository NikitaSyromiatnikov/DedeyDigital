import Uploader from '../uploader/Uploader';

const App = () => {
    return (
        <div className="app">
            <Uploader id="file" inputLabel="Перетащите сюда файл или нажмите чтобы выбрать" />
        </div>
    );
}

export default App;