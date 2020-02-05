const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);

  console.log('github context => ', github.event);

  const result = await octokit.request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
    headers: {
      authorization: `token ${myToken}`,
    },
    owner: 'hamstu',
    repo: 'testing',
    issue_number: '1',
    body: core.getInput('comment'),
  });

  console.log(result.data);
}

run();
