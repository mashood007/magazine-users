import api from "@/utils/axios/api"

interface Params {
  email: string,
  password: string,
  name: string
}

export function signup(params: Params) {
  return api.post('/auth/signup', params)
}
