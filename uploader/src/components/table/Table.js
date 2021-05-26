import { JsonToTable } from 'react-json-to-table';


const Table = ({ data }) => {
    const dataArray = parseData(data);

    console.log(dataArray);
    return (
        <>
            <JsonToTable json={dataArray} />
        </>
    );
}

const parseData = (data) => {
    let dataArray = [];
    const sheetNameList = data.SheetNames;

    sheetNameList.forEach(y => {
        const worksheet = data.Sheets[y];
        let headers = {};

        for (let z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            let tt = 0;
            for (let i = 0; i < z.length; i++)
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }

            let col = z.substring(0, tt);
            let row = parseInt(z.substring(tt));
            let value = worksheet[z].v;

            //store header names
            if (row === 1 && value) {
                headers[col] = value;
                continue;
            }

            if (!dataArray[row]) dataArray[row] = {};
            dataArray[row][headers[col]] = value;
        }
    });

    dataArray.shift();
    dataArray.shift();

    return dataArray;
}

export default Table;