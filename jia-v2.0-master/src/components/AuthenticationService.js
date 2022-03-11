import {getRequest} from '../API/ApiHandler'
export let type = ''
export let user = ''

export const getUserType = async() => {
  let user = await getRequest("/auth/users/current/me")
  if(user) type = user.data.type
}

export const getCurrentUser = async() => {
  user = await getRequest("/auth/users/current/me")
  if(user) return true
}

export const logout = () => {
  getRequest("/auth/logout")
  sessionStorage.clear();
}