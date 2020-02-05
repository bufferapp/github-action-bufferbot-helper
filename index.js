const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);

  console.log('github event => ', github.event);
  console.log('github event pr => ', github.event.pull_request);
  console.log('github context => ', github.context);
  console.log('github context pr => ', github.context.pull_request);

  // const result = await octokit.request(`POST /repos/:owner/:repo/issues/:issue_number/comments`, {
  //   headers: {
  //     authorization: `token ${myToken}`,
  //   },
  //   // owner: 'hamstu',
  //   // repo: 'testing',
  //   // issue_number: github.event.number,
  //   body: core.getInput('comment'),
  // });

  // console.log(result.data);
}

run();
