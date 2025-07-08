const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data/conductores.json');

const getAll = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const save = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { getAll, save };
