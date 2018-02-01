import axios from 'axios'

export default async (url = '', data = {}, type = 'get', header = {}) => {
  type = type.toLowerCase()
  if (type === 'get') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  let config = {
    url: url,
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...header
    }
  }
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  if (type === 'post') {
    config = { ...config, data: data }
  }
  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

// export default async (url = '', data = {}, type = 'GET') => {
//   type = type.toUpperCase()
//   if (type === 'GET') {
//     let dataStr = ''
//     Object.keys(data).forEach(key => {
//       dataStr += key + '=' + data[key] + '&'
//     })
//     if (dataStr !== '') {
//       dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
//       url = url + '?' + dataStr
//     }
//   }
//   if (window.fetch) {
//     let requesetConfig = {
//       // credentials: 'include',
//       method: type,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       mode: 'cors',
//       cache: 'force-cache'
//     }
//     if (type === 'POST') {
//       Object.defineProperty(requesetConfig, 'body', {
//         value: JSON.stringify(data)
//       })
//     }

//     try {
//       const response = await fetch(url, requesetConfig)
//       const responseJson = await response.json()
//       return responseJson
//     } catch (error) {
//       throw new Error(error)
//     }
//   } else {
//     return new Promise((resolve, reject) => {
//       let requestObj = new XMLHttpRequest()
//       let sendData = type === 'GET' ? null : JSON.stringify(data)
//       requestObj.onload = () => {
//         if (requestObj.status === 200) {
//           let obj = requestObj.response
//           if (Object.prototype.toString.call(obj) !== '[object Object]') {
//             obj = JSON.parse(obj)
//           }
//           resolve(obj)
//         } else {
//           reject(requestObj)
//         }
//       }
//       requestObj.open(type, url, true)
//       requestObj.setRequestHeader('Content-Type', 'application/json')
//       requestObj.send(sendData)
//     })
//   }
// }
