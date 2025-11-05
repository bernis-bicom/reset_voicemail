require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');

const apiKey = process.env.API_KEY;
const serverUrls = process.env.API_URLS.split(',');

const deleteVoicemailsForServer = async (serverUrl) => {
  let serverId = 2;
  try {
    console.log(`Fetching extensions from ${serverUrl} with server ID ${serverId}...`);
    let response = await axios.get(`${serverUrl}?apikey=${apiKey}&action=pbxware.ext.list&server=${serverId}`);

    if (response.data.error) {
      serverId = 1;
      console.log(`Fetching extensions from ${serverUrl} with server ID ${serverId}...`);
      response = await axios.get(`${serverUrl}?apikey=${apiKey}&action=pbxware.ext.list&server=${serverId}`);
    }

    const extensions = Object.values(response.data);
    console.log(`Found ${extensions.length} extensions on ${serverUrl}.`);

    const deletePromises = extensions.map(extension => {
      return axios.get(`${serverUrl}?apikey=${apiKey}&action=pbxware.ext.voicemail.delete&server=${serverId}&ext=${extension.ext}`)
        .then(response => {
          console.log(`Deleted voicemail for ext ${extension.ext} on ${serverUrl}:`, response.data);
        })
        .catch(error => {
          console.error(`Error deleting voicemail for ext ${extension.ext} on ${serverUrl}:`, error.message);
        });
    });

    await Promise.all(deletePromises);
    console.log(`Finished deleting voicemails for ${serverUrl}.`);
  } catch (error) {
    console.error(`Error processing server ${serverUrl}:`, error.message);
  }
};

const main = async () => {
  if (!apiKey || !process.env.API_URLS) {
    console.error('API_KEY and API_URLS must be set in the .env file.');
    return;
  }

  const serverPromises = serverUrls.map(url => deleteVoicemailsForServer(url.trim()));
  await Promise.all(serverPromises);
  console.log('All servers processed.');
};

main();