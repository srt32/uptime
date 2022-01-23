const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const url = require('url');

try {
  const urlToHit = core.getInput('url-to-hit');
  const parsedUrl = url.parse(urlToHit);
  const expectedStatuses = core.getInput('expected-statuses').split(",").map((status) => Number(status)) ;
  const userAgentToUse = core.getInput('user-agent-to-use');
  console.log(`Pinging ${urlToHit} and expecting ${expectedStatuses}`);


  const options = {
    hostname: parsedUrl.host,
    path: parsedUrl.path,
    port: parsedUrl.port,
    method: 'GET',
    headers: {
      'User-Agent': userAgentToUse
    }
  };

  https.get(options, (resp) => {
    if (!expectedStatuses.includes(resp.statusCode)) {
      core.setFailed(`Request status was ${resp.statusCode}`);
    } else {
      console.log(`Successful check`);
      core.setOutput("status", resp.statusCode);
    }
  }).on("error", (err) => {
    console.log(`Request failed`);
    core.setFailed(err.message);
  })
} catch (error) {
  core.setFailed(error.message);
}
