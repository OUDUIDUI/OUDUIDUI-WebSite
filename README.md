# OUDUIDUI

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# pm2
$ pm2 start npm --name "OUDUIDUI" -- run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 修改dev的ip
在`package.json`增加：
```
  "config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": 3000
    }
  }
```

## 版本更新
#### 1.0.1
- 优化markdown显示样式
