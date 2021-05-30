import fs from 'fs-extra'
import yml from 'yandex-market-language'
import path from 'path'
import pify from 'pify'
import AsyncCache from 'async-cache'

const defaultOptions = {
  path: '/feed-yandex-market.xml',
  cacheTime: 1000 * 3600 * 24,
  validate: true,
  data: {}
}

export default async function yandexMarket () {
  const options = this.options.yandexMarket.map(o => ({ ...defaultOptions, ...o }))

  const feedCache = new AsyncCache({
    load (key, callback) {
      generate(options[key], callback)
        .catch(err => console.error(err))
    }
  })

  feedCache.get = pify(feedCache.get)

  options.forEach((feedOptions, index) => {
    this.nuxt.hook('generate:done', async () => {
      const xmlGeneratePath = path.resolve(this.options.srcDir, path.join('static', feedOptions.path))
      await fs.removeSync(xmlGeneratePath)
      await fs.outputFile(xmlGeneratePath, await feedCache.get(index))
    })

    this.addServerMiddleware({
      path: feedOptions.path,
      async handler (req, res, next) {
        try {
          const xml = await feedCache.get(index)
          res.setHeader('Content-Type', 'application/xml; charset=UTF-8')
          res.end(xml)
        } catch (err) {
          next(err)
        }
      }
    })
  })

  async function generate (options, callback) {
    let xml
    try {
      let data = (typeof options.data === 'function') ? await options.data() : options.data

      xml = yml(data, { validate: options.validate })
        .end({ pretty: true })
    } catch (err) /* istanbul ignore next */ {
      console.error('⚠️ Error while executing module yandex-market-language')
      console.error(err)
    }

    return callback(null, xml, options.cacheTime)
  }
}

module.exports.meta = require('./package.json')
