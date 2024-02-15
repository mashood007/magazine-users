import api from "@/utils/axios/api"

export function cancel(params: any) {
  return api.delete('/subscriptions/' + params.id, {
    headers: { 'Authorization': `Bearer ${params.accessToken}` }
  })
}
