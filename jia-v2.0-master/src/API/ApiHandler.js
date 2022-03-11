//Code to connect to local url
//export const baseUrl = `http://localhost:3030`

//Code to connect to global url
export const baseUrl = `https://jia-project.herokuapp.com`

//export const token = JSON.parse(localStorage.getItem('tokenKey'))

export const getRequest = (path) => {
  const url = `${baseUrl}${path}`
  let headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')
  //headers.append('Authorization', `Bearer ${token}`)

  const req = new Request(url, {
    headers: headers,
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
  return handleFetch(req)
}

export const postRequest = async(path, input, ...others) => {
  const url = `${baseUrl}${path}`

  let headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')
  //headers.append('Authorization', `Bearer ${token}`)

  const jsonData = JSON.stringify(input)
  const req = new Request(url, {
    headers: headers,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: jsonData
  })

  return fetch(req)
  .then(res => {
    if(!res.ok){
      throw new Error(`Server Error: ${res.status} ${res.statusText}`)
    }
    return res.json()
  })
  .catch(err =>  {
    console.log(`${err.code}: ${err.message}`)
    if(others.length) others.setSaveStatus('failed')
  })
}

export const postFormRequest = (path, input) => {
  const url = `${baseUrl}${path}`
  let headers = new Headers()
  //headers.append('Authorization', `Bearer ${token}`)

  const req = new Request(url, {
    headers: headers,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: input
  })
  return handleFetch(req)
}

export const patchRequest = (path, input) => {
  const url = `${baseUrl}${path}`

  let headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')
  //headers.append('Authorization', `Bearer ${token}`)

  const jsonData = JSON.stringify(input)
  const req = new Request(url, {
    headers: headers,
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: jsonData
  })
  return handleFetch(req)
}

export const patchFormRequest = (path, input) => {
  const url = `${baseUrl}${path}`
  let headers = new Headers()
  //headers.append('Authorization', `Bearer ${token}`)

  const req = new Request(url, {
    headers: headers,
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    body: input
  })
  return handleFetch(req)
}

export const deleteRequest = (path, input = '') => {
  const url = `${baseUrl}${path}`
  let headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')
  //headers.append('Authorization', `Bearer ${token}`)

  let jsonData = ''
  if(input) jsonData = JSON.stringify(input)
  const req = new Request(url, {
    headers: headers,
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    body: jsonData
  })
  return handleFetch(req)
}

const handleFetch = async(req) => {
  return fetch(req)
  .then(res => {
    if(!res.ok){
      throw new Error(`Server Error: ${res.status} ${res.statusText}`)
    }
    return res.json()
  })
  .catch(err =>  console.log(`${err.code}: ${err.message}`))
}