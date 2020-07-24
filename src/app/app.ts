import fastify from 'fastify'
import glob from 'glob'
import path from 'path'
import chalk from 'chalk'

let app

export const getApp = () => app

export const createApp = (options, { pattern, globOptions }: { pattern?: string; globOptions?: any }) => {
  const _app = fastify(options)
  if (!app) {
    app = _app
  }
  loadControllers(pattern, { ...globOptions, ...{ matchBase: true } })
  return app
}

const loadControllers = (pattern = 'src/**/*.@(ctrl|controller).ts', options = { matchBase: true }) => {
  process.env.NODE_ENV !== 'test' && console.log(chalk.bold.blue('Loading controllers:'))
  glob.sync(pattern, options).forEach(function (file) {
    process.env.NODE_ENV !== 'test' && console.log(chalk.green(`-> ${file}`))
    import(path.resolve(file))
  })
}

export interface IAppOptions {
  logger?: boolean
}

export const start = async (port = 3000, options: IAppOptions = { logger: true }, globOptions = {}) => {
  if (!app) {
    createApp(options, globOptions)
  }
  try {
    await app.listen(port)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

export const close = () => app.close()
export const inject = (options) => app.inject(options)
