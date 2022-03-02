#!/usr/bin/env node

/**
 * gl
 * Gitlab CLI
 *
 * @author Andrew Usher <https://andrewusher.dev>
 */

const init = require('./utils/init')
const cli = require('./utils/cli')
const log = require('./utils/log')
const { handleSnippets } = require('./commands/snippets/snippets')

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })
  input.includes(`help`) && cli.showHelp(0)
  const [domain, command, arg] = input
  domain === 'snippets' && (await handleSnippets({ command, arg, flags }))
})()
