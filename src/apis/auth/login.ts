import api from "@/utils/axios/api"

interface LoginParams {
  email: string,
  password: string,
}

export function login(params: LoginParams) {
  return api.post('/auth/login', params)
}
