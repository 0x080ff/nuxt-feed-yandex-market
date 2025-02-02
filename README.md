# A Nuxt.js module that generates an XML file for Yandex.Market (YML)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A wrapper over [Yandex Market Language(YML)](https://github.com/LotusTM/yandex-market-language) that generates a JSON object into the xml file, heavily inspired by [nuxt-community/feed-module](https://github.com/nuxt-community/feed-module). The module supports Nuxt 2.x. There is `yarn run generate` support.

## Simple usage

- Install `npm i nuxt-multifeed-yandex-market.git`

```js
export default {
  modules: [
    'nuxt-feed-yandex-market'
  ],
  yandexMarket: [
    {
      data: {}, // JSON with data or a function that returns the JSON 
      path: '/yandex-market.xml', // The route to your xml file
      validate: true,
      cacheTime: 1000 * 3600 * 24 
    }
    ...
  ]
}
```

## License

[MIT License](./LICENSE)

Copyright (c) :suspect: @yesworld
