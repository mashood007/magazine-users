import api from "@/utils/axios/api"

interface Params {
  startDate: string,
  magazineId: number,
  accessToken: string
}

export function subscribeMagazine(params: any) {
  return api.post(`/magazines/${params.magazineId}/subscribe`,
    { startDate: params.startDate },
    { headers: { 'Authorization': `Bearer ${params?.accessToken}` } }
  )
}
