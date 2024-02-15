import api from "@/utils/axios/api"

export function subscribtionList(params: any) {
  return api.get('/subscriptions', {
    headers: { 'Authorization': `Bearer ${params?.accessToken}` }
  })
}
