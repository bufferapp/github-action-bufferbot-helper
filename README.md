# Bufferbot Helper

A simple [GitHub Action](https://help.github.com/en/actions/automating-your-workflow-with-github-actions) for Bufferbot to add helpful context and links to your PRs.

## How to use

Here's an example using this to comment on PRs with helpful links and context:

```yml
name: Bufferbot Helper

on:
  pull_request:
    types: [opened]
    branches:
    - master

jobs:
  pr_comment:
    runs-on: ubuntu-latest
    name: PR Comment
    steps:
      - uses: bufferapp/github-action-bufferbot-helper@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          action: "pr-comment"
          staging-url-template: "https://{{placeholder}}-publish.dev.buffer.com"
          service-name: "buffer-publish"
```