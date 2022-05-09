#!/usr/bin/env node

/**
 * gl
 * Gitlab CLI
 *
 * @author Andrew Usher <https://andrewusher.dev>
 */

const init = require('./src/utils/init')
const cli = require('./src/utils/cli')
const log = require('./src/utils/log')
const { handleSnippets } = require('./src/commands/snippets/snippets')

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })
  input.includes(`help`) && cli.showHelp(0)
  const [domain, command, arg] = input
  domain === 'snippets' && (await handleSnippets({ command, arg, flags }))
})()
