const { baseBrowse } = require("./base-browse")


const handleBrowse = async ({ command = '', arg, flags }) => {
  if (command === '') { 
    await baseBrowse({arg, flags})
  }
}

module.exports = {
  handleBrowse
}
