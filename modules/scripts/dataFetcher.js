// import { csvParse } from 'd3-dsv'
// import { group } from 'd3-array'
// import fetch from 'node-fetch'
import Gootenberg from 'gootenberg'
import marked from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import utils from '../../util/utils.js'
import credentials from './credentials.json'

const DOMPurify = createDOMPurify(new JSDOM('').window)
const DOC_ID = '1OCn6AQNVkgJ_4jHLFQOwIxvCDaxvZ-7XnZLbHHL0bOQ'
// const DURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRaNDBN4NpVISkVvaKK_FPQSwRZorhpIKb0bsaPTm0gKwvVviTHvcpHJsr5erVrjpiPH9YZupinUljz/pub?gid=0&single=true&output=csv'

// export async function customFetcher () {
//   let csvdata = null
//   try {
//     csvdata = await fetch(DURL)
//       .then((d) => {
//         return d.text()
//       })
//       .then(d => csvParse(d))
//       .then((data) => {
//         data = data.filter(e => e.TOPIC !== '')
//         return data
//       })
//   } catch (e) {
//     console.log('Error fetching data', e)
//   }

//   const dataArray = Array.from(group(csvdata, d => d.TOPIC),
//     ([key, value]) => ({ key, values: value }))

//   const questionsData = dataArray.map(e => ({
//     topic: e.key,
//     headline: e.values[0] ? e.values[0].Headline : '',
//     options: e.values.map(o => ({
//       option: o.OPTIONS,
//       response: o.RESPONSES
//     }))
//   }))

//   // return some JSON Object
//   return questionsData
// }

marked.setOptions({
  renderer: new marked.Renderer(),
  baseUrl: null,
  breaks: false,
  gfm: false,
  headerIds: false,
  headerPrefix: '',
  highlight: null,
  mangle: true,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  xhtml: false
})

function markdown2html (data) {
  const copy = Object.assign(data, {})
  const interate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' || obj[key] instanceof Object) {
        interate(obj[key])
        return
      }
      if (typeof obj[key] === 'string' || obj[key] instanceof String) {
        let configDom = {
          ALLOWED_TAGS: ['a'],
          KEEP_CONTENT: true
        }
        if (key === 'text') {
          configDom = {
            ALLOWED_TAGS: ['a', 'p', 'img', 'div', 'iframe', 'style', 'strong', 'i'],
            KEEP_CONTENT: true
          }
        }
        obj[key] = DOMPurify.sanitize(marked(obj[key]), configDom).trim()
        // make slugs from titles
        if (key === 'title') {
          obj.slug = utils.makeSlug(obj[key])
        }
      }
    })
  }
  interate(copy)
  return copy
}

export async function customFetcher () {
  let convertedData = null
  try {
    const goot = new Gootenberg()
    await goot.auth.jwt(credentials)
    const data = await goot.parse.archie(DOC_ID)
    convertedData = markdown2html(data)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error fetching data', e)
  }
  // convertedData

  // return some JSON Object
  return convertedData
}
