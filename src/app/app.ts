import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import glob, { IOptions as GlobOptions } from 'glob'
import path from 'path'
import chalk from 'chalk'
import { FastifyLoggerInstance } from 'fastify/types/logger'
import http from 'http'
import { InjectOptions, Response as LightMyRequestResponse } from 'light-my-request'
import { defaultErrorHandler } from '../error-handling/default-error-handler'

let app

export const getApp = (): FastifyInstance => app

export const createApp = <Server extends http.Server, Logger extends FastifyLoggerInstance = FastifyLoggerInstance>(
  options?: FastifyServerOptions<Server, Logger>,
  { pattern, globOptions }: { pattern?: string; globOptions?: GlobOptions } = {
    pattern: 'src/**/*.@(ctrl|controller).ts',
    globOptions: { matchBase: true },
  },
): FastifyInstance => {
  const _app = fastify(options)

  _app.setErrorHandler(defaultErrorHandler)

  if (!app) {
    app = _app
  }

  loadControllers(pattern, { ...globOptions, ...{ matchBase: true } })
  return app
}

const loadControllers = (pattern = 'src/**/*.@(ctrl|controller).ts', options: GlobOptions = { matchBase: true }) => {
  process.env.NODE_ENV !== 'test' && console.log(chalk.bold.blue('Loading controllers:'))
  glob.sync(pattern, options).forEach(function (file) {
    process.env.NODE_ENV !== 'test' && console.log(chalk.green(`-> ${file}`))
    import(path.resolve(file))
  })
}

export interface IAppOptions {
  logger?: boolean
}

export const start = async (port = 3000, options: IAppOptions = { logger: true }, globOptions = {}): Promise<void> => {
  if (!app) {
    createApp(options, globOptions)
  }
  try {
    await app.listen(port)
  } catch (err) {
    app.log.error(err)
    throw err
  }
}

export const close = (): Promise<void> => app.close()
export const inject = (options: InjectOptions | string): Promise<LightMyRequestResponse> => app.inject(options)
