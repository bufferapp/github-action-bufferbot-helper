const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);

  const branchName = github.context.payload.pull_request.head.ref;

  const body = `
👋 Hey there! Here are some helpful links related to this PR / branch.

* Your branch name is ${branchName}.
  `;

  const result = await octokit.request(`POST ${github.context.payload.pull_request.comments_url}`, {
    headers: {
      authorization: `token ${myToken}`,
    },
    // owner: 'hamstu',
    // repo: 'testing',
    // issue_number: github.event.number,
    body,
  });

  console.log(result.data);
}

run();
