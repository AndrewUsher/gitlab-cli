const { gitlabClient } = require("../../api/gitlab-client")


const baseBrowse = async ({ arg, flags }) => {
  const url = gitlabClient.Repositories.url
  console.log(url)
}

module.exports = {
  baseBrowse
}