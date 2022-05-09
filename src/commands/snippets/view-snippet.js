const chalk = require('chalk')
const open = require('open')
const { gitlabClient } = require('../../api/gitlab-client')

const viewSnippet = async ({ arg, flags }) => {
  if (flags.web) {
    await open(`${process.env.GL_GITLAB_HOST}/-/snippets/${arg}`)
    return
  }

  const [snippetContent, snippetInfo] = await Promise.all([
    gitlabClient.Snippets.content(arg),
    gitlabClient.Snippets.show(arg)
  ])
  console.log(
    [
      chalk.bold.green(snippetInfo.title),
      chalk.whiteBright(snippetContent)
    ].join('\n\n'),
    '\n'
  )
}

module.exports = {
  viewSnippet
}
