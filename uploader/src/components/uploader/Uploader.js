import React from 'react';
import axios from 'axios';
import XLSX from 'xlsx';

import Table from '../table/Table';

// const ajaxURL = 'http://192.168.1.143:4500/api/import';
const ajaxURL = 'http://193.243.158.230:4500/api/import';
const ajaxConfig = { headers: { 'Authorization': 'test-task' } };
const allowedExtensions = ['xls', 'xlsx'];
const maxAllowedSize = 1e7;

class Uploader extends React.Component {
    state = {
        isInDropZone: false,
        inputLabel: "Перетащите сюда файл или нажмите чтобы выбрать",
        error: null,
        serverResponse: null,
        data: null,
    };

    constructor(props) {
        super(props);

        if (props.inputLabel) {
            this.setState({
                ...this.state,
                inputLabel: props.inputLabel
            });

            this.forceUpdate();
        }

        this.enterDropZone.bind(this);
        this.leaveDropZone.bind(this);
        this.handleFileUpload.bind(this);
    }

    enterDropZone = () => { this.setState({ ...this.state, isInDropZone: true }); }
    leaveDropZone = () => { this.setState({ ...this.state, isInDropZone: false }); }

    handleFileUpload = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];
        const details = this.getFileDetails(file);

        if (!details)
            return;

        if (!details.isValidSize)
            return this.setState({ ...this.state, inputLabel: 'Допустимый размер файла 10Мб, выберите другой файл', error: true, serverResponse: null });

        if (!details.isValidExtension)
            return this.setState({ ...this.state, inputLabel: `Недопустимый тип файла "${details.extension}", выберите другой файл`, error: true, serverResponse: null });

        this.setState({ ...this.state, inputLabel: `Файл - ${details.name}`, isInDropZone: true, error: null });

        const reader = new FileReader();

        reader.readAsBinaryString(file);
        reader.onload = () => {
            const workbook = XLSX.read(reader.result, { type: 'binary' });

            const requestData = {
                resultArray: workbook
            };

            axios.post(ajaxURL, requestData, ajaxConfig)
                .then(res => {
                    if (res.data.status === 'OK')
                        console.log(res.data);

                    this.setState({ ...this.state, serverResponse: res.data.message, data: workbook });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ ...this.state, serverResponse: 'Error occured while uploading data' })
                });
        }

    }

    getFileDetails = (file) => {
        if (!file)
            return null;

        const array = String(file.name).split('.');
        const extension = array[array.length - 1];
        const isValidSize = file.size < maxAllowedSize;
        const isValidExtension = allowedExtensions.indexOf(extension) > -1;

        return {
            name: file.name,
            size: file.size,
            isValidSize: isValidSize,
            extension: extension,
            isValidExtension: isValidExtension
        };
    }

    render() {
        return (
            <div>
                <div className={`uploader__container ${this.state.isInDropZone ? "highlighted" : ""} ${this.state.error ? "error" : ""}`}>
                    <label className="uploader__label" htmlFor={this.props.id || "file"}>
                        {this.state.inputLabel}
                    </label>
                    <input
                        id={this.props.id || "file"}
                        type="file"
                        className="uploader__input"
                        onDragEnter={this.enterDropZone}
                        onDragLeave={this.leaveDropZone}
                        onChange={this.handleFileUpload}
                    />
                    {this.state.serverResponse && <div className="message">{this.state.serverResponse}</div>}
                </div>
                {this.state.data && <Table data={this.state.data} />}
            </div>
        );
    }
}

export default Uploader;