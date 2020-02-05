const core = require("@actions/core");
const github = require("@actions/github");

const MAX_SUBDOMAIN_LENGTH = 63;
const MAX_DEPLOY_MONITOR_LENGTH = 53;

function isAlphaNumeric(str) {
  const regex = new RegExp('^[a-z0-9]+$', 'i');
  return regex.test(str);
}

function getFormattedBranchName(branchName) {
  let formattedBranch = branchName
    .split("")
    .map(c => (isAlphaNumeric(c) ? c : '-'))
    .join("")
    .toLowerCase();  

  return formattedBranch;
}

// Ref: https://github.com/bufferapp/kuberdash/blob/0f4669411a584846f005686f24680066b089c2c3/src/app/core/k8s/Helm.py#L27
function getStagingUrl(branchName, stagingUrlTemplate) {
  let formattedBranch = getFormattedBranchName(branchName);
  
  // Ensure the first subdomain is not too long
  const stagingUrlWithoutPlaceholder = stagingUrlTemplate.replace('{{placeholder}}', '');
  const lengthOfFirstSubdomain = stagingUrlWithoutPlaceholder.split('.')[0].length;
  const maxLengthOfFormattedBranch = MAX_SUBDOMAIN_LENGTH - lengthOfFirstSubdomain;
  formattedBranch = formattedBranch.substr(0, maxLengthOfFormattedBranch);

  return stagingUrlTemplate.replace('{{placeholder}}', formattedBranch);
}

function getDeployMonitorUrl(branchName, serviceName) {
  const formattedBranch = getFormattedBranchName(branchName);
  let key = `${serviceName}-${formattedBranch}`;
  key = key.substr(0, MAX_DEPLOY_MONITOR_LENGTH);
  return `https://deploymonitor.buffertools.com/release?name=${key}`;
}

async function run() {
  const myToken = core.getInput("repo-token");
  const stagingUrlTemplate = core.getInput("staging-url-template");
  const serviceName = core.getInput("service-name");
  const octokit = new github.GitHub(myToken);

  const branchName = github.context.payload.pull_request.head.ref;
  const stagingUrl = getStagingUrl(branchName, stagingUrlTemplate);
  const deployMonitorUrl = getDeployMonitorUrl(branchName, serviceName);

  const body = `
👋 Hey there! Here are some helpful links related to this PR / branch.

* Staging URL: ${stagingUrl}
* Deployment Monitor URL: ${deployMonitorUrl} (*)

_Remember, these won't work until the **bufferbotbrains/cicd-buffer-publish** check below is ✅_

(*) Requires VPN.
  `;

  const result = await octokit.request(
    `POST ${github.context.payload.pull_request.comments_url}`,
    {
      headers: {
        authorization: `token ${myToken}`
      },
      // owner: 'hamstu',
      // repo: 'testing',
      // issue_number: github.event.number,
      body
    }
  );

  console.log(result.data);
}

run();
