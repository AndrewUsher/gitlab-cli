const { readFile } = require('fs/promises')
const path = require('path')
const inquirer = require('inquirer')
const { gitlabClient } = require('../../api/gitlab-client')

const createSnippet = async ({ arg }) => {
  const { snippetTitle, snippetDescription, snippetPrivacy } =
    await inquirer.prompt([
      { type: 'input', name: 'snippetTitle', message: 'Snippet Title' },
      {
        type: 'input',
        name: 'snippetDescription',
        message: 'Snippet Description'
      },
      {
        type: 'list',
        choices: [
          { name: 'private', value: 'private' },
          { name: 'public', value: 'internal' }
        ],
        name: 'snippetPrivacy',
        message: 'Privacy'
      }
    ])
  const snippetContent = await readFile(path.join(process.cwd(), arg), {
    encoding: 'utf-8'
  })

  await gitlabClient.Snippets.create(
    snippetTitle,
    arg,
    snippetContent,
    snippetPrivacy
  )
  console.log({ snippetDescription, snippetTitle })
}

module.exports = {
  createSnippet
}
