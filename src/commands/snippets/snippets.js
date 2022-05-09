const { gitlabClient } = require('../../api/gitlab-client')
const log = require('../../utils/log')
const { createSnippet } = require('./create-snippet')
const { listSnippets } = require('./list-snippets')
const { viewSnippet } = require('./view-snippet')

const handleSnippets = async ({ command, arg, flags }) => {
  if (command === 'list') {
    await listSnippets({ arg, flags })
  }

  if (command === 'view') {
    await viewSnippet({ arg, flags })
  }

  if (command === 'create') {
    await createSnippet({ arg, flags })
  }
}

module.exports = {
  handleSnippets
}
