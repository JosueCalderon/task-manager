const fs = require('fs');

const fileAddress = './db/data.json';

const saveData = (data) => {

    fs.writeFileSync(fileAddress, JSON.stringify(data));

}

const readData = () => {

    if (!fs.existsSync(fileAddress)) {
        return null;
    }

    const info = fs.readFileSync(fileAddress, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;

}

module.exports = {
    saveData,
    readData
}