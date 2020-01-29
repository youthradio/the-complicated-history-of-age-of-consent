/* eslint-disable no-console */

import { customFetcher } from './scripts/dataFetcher'
const fs = require('fs-extra')

export default function fetchData () {
  // writeData writes the data to a file given the path
  // Same as in previous solution
  const writeData = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        fs.ensureFileSync(path)
        fs.writeJson(path, data, resolve(`${path} Write Successful`))
      } catch (e) {
        console.error(`${path} Write failed. ${e}`)
        reject(new Error(`${path} Write Failed. ${e}`))
      }
    })
  }

  const getData = async (builder) => {
    const dataToWrite = await customFetcher()
    console.log('DATTT___-->', dataToWrite)
    if (dataToWrite) {
      const fetcher = []
      const basePath = 'data/'
      if (!fs.pathExistsSync(basePath)) {
        fs.emptyDir(basePath)
      }
      const fileName = `${basePath}data.json`
      console.log(`PROCESSING ${fileName}...`)

      // Write list to file
      fetcher.push(writeData(fileName, { content: dataToWrite }))

      return Promise.all(fetcher)
        .then(() => {
          console.log('JSON Build complete!')
        })
        .catch((e) => {
          throw e
        })
    }
    return null
  }

  // Run it before the nuxt build stage
  this.nuxt.hook('build:before', getData)
}
