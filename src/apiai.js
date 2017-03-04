const fetch = require('node-fetch');
const uuid = require('uuid');

const config = require('./config');

function askQuestion(question){
  const accessToken = config.apiai.accessToken;
  const endpoint = config.apiai.endpoint;
  const lang = config.apiai.lang;
  const sessionId = uuid.v4();
  //headers

  //body
  //Bearer
  const fetchOptions = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  //lang, session id, query
  //url = 'https://api.api.ai/v1/query?lang=en&sessionId=1293&query=halo';

  const queryString = `lang=${lang}&sessionId=${sessionId}&query=${question}`
  const url = `${endpoint}/query?${queryString}`;

  return fetch(url, fetchOptions);
};

//const testRequest = askQuestion('create new task membeli baju baru');

// testRequest.then(res => res.json()).then(json => {
//   console.log(json);
// });

module.exports = {
  askQuestion
};
