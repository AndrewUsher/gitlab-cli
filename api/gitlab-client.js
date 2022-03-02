const { Gitlab } = require('@gitbeaker/node');

const gitlabClient = new Gitlab({
  host: process.env.GL_GITLAB_HOST,
  token: process.env.GL_GITLAB_TOKEN,
  rejectUnauthorized: false
})

module.exports = {
  gitlabClient
}