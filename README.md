# Reset Voicemail

This script is used to delete all voicemails from one or more PBXware systems.

## Features

- Deletes voicemails from multiple PBXware servers at once.
- Automatically detects the correct server ID for both multi-tenant and contact center systems.

## Instructions

1. Create .env file in the same directory as index.js with these values:
```
API_URLS=https://<PBXWARE_URL_1>,https://<PBXWARE_URL_2>
API_KEY=<PBXWARE_API_KEY>
```
Replace `<PBXWARE_URL_1>`, `<PBXWARE_URL_2>`, etc., with the actual URLs of your PBXware servers, separated by commas.
Replace `<PBXWARE_API_KEY>` with your PBXware API key.

2. Run the script with `node index.js`
