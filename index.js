require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const axios = require('axios');


axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&action=pbxware.ext.list&server=2`)
  .then(function (response) {
    // handle success
    
console.log()
    Object.values(response.data).forEach(extension => {
        axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&action=pbxware.ext.voicemail.delete&server=2&ext=${extension.ext}`)
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

