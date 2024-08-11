const fs = require('fs');
const path = require('path');
require('dotenv').config();

const appJsonPath = path.resolve(__dirname, 'upx5-423113-1704adeed3a4.json');
const appJson = require(appJsonPath);

appJson.type = process.env.CLOUD_type
appJson.project_id = process.env.CLOUD_project_id
appJson.private_key_id = process.env.CLOUD_private_key_id
appJson.private_key = process.env.CLOUD_private_key
appJson.client_email = process.env.CLOUD_client_email
appJson.client_id = process.env.CLOUD_client_id
appJson.auth_uri = process.env.CLOUD_auth_uri
appJson.token_uri = process.env.CLOUD_token_uri
appJson.auth_provider_x509_cert_url = process.env.CLOUD_auth_provider_x509_cert_url
appJson.client_x509_cert_url = process.env.CLOUD_client_x509_cert_url
appJson.universe_domain = process.env.CLOUD_universe_domain

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));