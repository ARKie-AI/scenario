import axios from 'axios'
import * as crypto from 'crypto'
import { format, UrlWithParsedQuery } from 'url'
import * as uuid from 'uuid'

import { Base } from './base'

const form = 'application/x-www-form-urlencoded'

const hasOwnProperty = function(obj: any, key: any) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * API Gateway Client
 */
export class OpenApiClient extends Base {
  readonly appSecret: Buffer

  constructor(readonly appKey: string, secret: string, readonly stage: 'TEST' | 'PRE' | 'RELEASE' = 'RELEASE') {
    super()
    this.appSecret = Buffer.from(secret, 'utf8')
  }

  buildStringToSign(method: string, headers: Headers, signedHeadersStr: string, url: UrlWithParsedQuery, data: any) {
    // accept, contentMD5, contentType,
    const lf = '\n'
    const list = [method, lf]

    const accept = headers['accept']
    if (accept) {
      list.push(accept)
    }
    list.push(lf)

    const contentMD5 = headers['content-md5']
    if (contentMD5) {
      list.push(contentMD5)
    }
    list.push(lf)

    const contentType = headers['content-type'] || ''
    if (contentType) {
      list.push(contentType)
    }
    list.push(lf)

    const date = headers['date']
    if (date) {
      list.push(date)
    }
    list.push(lf)

    if (signedHeadersStr) {
      list.push(signedHeadersStr)
      list.push(lf)
    }

    if (contentType.startsWith(form)) {
      list.push(this.buildUrl(url, data)!)
    } else {
      list.push(this.buildUrl(url)!)
    }

    return list.join('')
  }

  sign(stringToSign: string) {
    return crypto
      .createHmac('sha256', this.appSecret)
      .update(stringToSign, 'utf8')
      .digest('base64')
  }

  md5(content: string) {
    return crypto
      .createHash('md5')
      .update(content, 'utf8')
      .digest('base64')
  }

  getSignHeaderKeys(headers: Headers, signHeaders: Headers) {
    const keys = Object.keys(headers).sort()
    const signKeys = []
    for (const i = 0; i < keys.length; i++) {
      const key = keys[i]
      // x-ca- 开头的header或者指定的header
      if (key.startsWith('x-ca-') || hasOwnProperty(signHeaders, key)) {
        signKeys.push(key)
      }
    }

    // 按字典序排序
    return signKeys.sort()
  }

  buildUrl(parsedUrl: UrlWithParsedQuery, data?: any) {
    const toStringify = Object.assign(parsedUrl.query, data)
    let result = parsedUrl.pathname
    if (Object.keys(toStringify).length) {
      const keys = Object.keys(toStringify).sort()
      const list = new Array(keys.length)
      for (const i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (toStringify[key] !== undefined && toStringify[key] !== null && '' + toStringify[key]) {
          list[i] = `${key}=${toStringify[key]}`
        } else {
          list[i] = `${key}`
        }
      }
      result += '?' + list.join('&')
    }
    return result
  }

  buildHeaders(headers: any = {}, signHeaders: any) {
    return Object.assign(
      {
        'x-ca-timestamp': Date.now(),
        'x-ca-key': this.appKey,
        'x-ca-nonce': uuid.v4(),
        'x-ca-stage': this.stage,
        accept: 'application/json',
      },
      headers,
      signHeaders,
    )
  }

  getSignedHeadersString(signHeaders: any, headers: any) {
    const list = []
    for (const i = 0; i < signHeaders.length; i++) {
      const key = signHeaders[i]
      list.push(key + ':' + headers[key])
    }

    return list.join('\n')
  }

  async request(method: string, url: UrlWithParsedQuery, opts: any, originData?: any) {
    const signHeaders = opts.signHeaders
    // 小写化，合并之后的headers
    const headers = this.buildHeaders(opts.headers, signHeaders)

    const requestContentType = headers['content-type'] || ''
    if (
      method === 'POST' &&
      !requestContentType.startsWith(form) &&
      !requestContentType.startsWith('multipart/form-data')
    ) {
      headers['content-md5'] = this.md5(opts.data)
    }

    const signHeaderKeys = this.getSignHeaderKeys(headers, signHeaders)
    headers['x-ca-signature-headers'] = signHeaderKeys.join(',')
    const signedHeadersStr = this.getSignedHeadersString(signHeaderKeys, headers)

    // const parsedUrl = parse(url, true)
    const stringToSign = this.buildStringToSign(method, headers, signedHeadersStr, url, originData)
    headers['x-ca-signature'] = this.sign(stringToSign)
    // headers['user-agent'] = ua

    headers['Accept'] = 'application/json'
    delete headers['accept']

    try {
      const response = await axios.request({
        url: format(url),
        method,
        headers,
        data: opts.data,
        timeout: opts.timeout,
      })

      const result = response
      return result
    } catch (e) {
      const { response } = e
      const code = response.status
      if (code < 200 || code >= 300) {
        const message = response.headers['x-ca-error-message'] || ''
        const err = new Error(
          `${method} ${format(url)} failed width code(${code}).` +
            ` request id: ${response.headers['x-ca-request-id']},` +
            ` error message: ${message}`,
        )
        //   if (debug.enabled) {
        console.info('stringToSign:')
        console.info('client: %s', stringToSign.replace(/\n/g, '#'))
        if (message.includes('Invalid Signature')) {
          const serverStringToSign = message.replace('Invalid Signature, Server StringToSign:', '')
          console.info('server: %s', serverStringToSign)
        }
        //   }
        err.code = code
        err.data = {
          headers: response.headers,
        }
        throw err
      }
    }
  }
}
