const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);

  console.log('github context pr => ', github.context.payload.pull_request.comments_url);

  const result = await octokit.request(`POST ${github.context.payload.pull_request.comments_url}`, {
    headers: {
      authorization: `token ${myToken}`,
    },
    // owner: 'hamstu',
    // repo: 'testing',
    // issue_number: github.event.number,
    body: 'Hello on your PR!',
  });

  console.log(result.data);
}

run();
