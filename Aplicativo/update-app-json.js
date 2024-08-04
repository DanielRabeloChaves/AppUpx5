const fs = require('fs');
const path = require('path');
require('dotenv').config();

const appJsonPath = path.resolve(__dirname, 'app.json');
const appJson = require(appJsonPath);

appJson.expo.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

// console.log('app.json atualizado com a variável de ambiente', process.env.GOOGLE_MAPS_API_KEY);