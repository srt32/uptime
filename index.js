const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

try {
  const urlToHit = core.getInput('url-to-hit');
  const expectedStatuses = core.getInput('expected-statuses').split(",");
  console.log(`Pinging ${urlToHit} and expecting ${expectedStatuses}`);

  https.get(urlToHit, (resp) => {
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
