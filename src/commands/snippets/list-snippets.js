const chalk = require('chalk')
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const Table = require('cli-table3')
const { gitlabClient } = require('../../api/gitlab-client')

dayjs.extend(relativeTime)

const listSnippets = async ({ flags }) => {
  if (flags.help) {
    console.log('Help screen')
    return
  }

  const snippetsTable = new Table({
    head: ['Snippet ID', 'Title', 'Files', 'Privacy', 'Last Updated']
  })
  let snippets = await gitlabClient.Snippets.all()

  if (flags.public) {
    snippets = snippets.filter(snippet => snippet.visibility === 'internal')
  }

  if (flags.private) {
    snippets = snippets.filter(snippet => snippet.visibility === 'private')
  }

  snippets.forEach(snippet => {
    const snippetId = chalk.bold.underline(snippet.id)
    const snippetTitle = chalk.bold.green(snippet.title)
    const filesInfo = chalk.italic(
      `${snippet.files.length} file${snippet.files.length > 1 ? 's' : ''}`
    )
    const { snippetPrivacy, textColor } = getSnippetPrivacyInfo(
      snippet.visibility
    )

    const privacyInfo = chalk[textColor](snippetPrivacy)
    const lastUpdated = dayjs(snippet.updated_at).fromNow()
    snippetsTable.push([
      snippetId,
      snippetTitle,
      filesInfo,
      privacyInfo,
      lastUpdated
    ])
  })

  console.log(snippetsTable.toString())
}

function getSnippetPrivacyInfo(visibility) {
  const COLOR_MAP = {
    internal: 'green',
    private: 'red'
  }

  const VISIBILITY_MAP = {
    internal: 'Public',
    private: 'Private'
  }

  return {
    snippetPrivacy: VISIBILITY_MAP[visibility],
    textColor: COLOR_MAP[visibility]
  }
}

module.exports = {
  listSnippets
}
