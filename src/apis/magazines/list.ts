import api from "@/utils/axios/api"

export function magazinesList(accessToken: any) {
  return api.get('/magazines', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
}
