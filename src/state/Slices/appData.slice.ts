import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { formatStepPayload, sendToastMessage } from '../../utils';

const baseUrl = globalThis.Liferay ? `${window.origin}/group/sacc/` : 'http://desarrollo:7003/SACC/'
const rawBaseQuery = fetchBaseQuery({ baseUrl })

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let resultBaseQuery
  if (globalThis.Liferay) {
    if (globalThis.Liferay?.Session?.get('sessionState') === 'expired') {
      sendToastMessage({
        message: 'Su sesión ha expirado por favor vuelva a iniciar sesión.',
        type: 'warning'
      })
      setTimeout(() => {globalThis.location.reload()}, 5000)
      return { data: null }
    }
    const addedToken = typeof args === "string" ? args : {
      ...args,
      body: {...args.body},
      headers: {
        'Authorization': '',
        'token': '',
      }
    }
    resultBaseQuery = rawBaseQuery(addedToken, api, extraOptions)
  } else {
    const addedToken = typeof args === "string" ? args : {
      ...args,
      body: {...args.body},
    }
    resultBaseQuery = rawBaseQuery(addedToken, api, extraOptions)
  }
  return resultBaseQuery
}

export const apiSlice = createApi({
  reducerPath: 'apiRequest',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getListConsultants: builder.query<any, any>({
      query: initialLoad => ({
        url: 'catalogos/otorgantes',
        method: 'POST',
        body: initialLoad
      }),
      transformErrorResponse: (error: any) => ({
        url: 'catalogos/otorgantes',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      })
    }),
    getListUserKeys: builder.query<any, any>({
      query: initialLoad => ({
        url: 'catalogos/usuarios-otorgante',
        method: 'POST',
        body: initialLoad
      }),
      transformErrorResponse: (error: any) => ({
        url: 'catalogos/usuarios-otorgante',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      })
    }),
    getListFacultatedUsers: builder.query<any, any>({
      query: initialLoad => ({
        url: 'catalogos/funcionarios-otorgante',
        method: 'POST',
        body: initialLoad
      }),
      transformErrorResponse: (error: any) => ({
        url: 'catalogos/funcionarios-otorgante',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      })
    }),
    getStepInfo: builder.query<any, any>({
      query: initialLoad => ({
        url: 'reporte/consultarPantalla',
        method: 'POST',
        body: initialLoad
      }),
      transformErrorResponse: (error: any) => ({
        url: 'reporte/consultarPantalla',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    }),
    saveStep: builder.query<any, { stepId: number, payload: ReturnType<typeof formatStepPayload> }>({
      query: initialLoad => ({
        url: `reporte/pantalla${initialLoad.stepId}`,
        method: 'POST',
        body: initialLoad.payload
      }),
      transformErrorResponse: (error: any) => ({
        url: 'reporte/pantalla1',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    }),
    getCURPInfo: builder.query<any, { curp: string }>({
      query: initialLoad => ({
        url: 'solicitante/validar-curp',
        method: 'POST',
        body: initialLoad
      }),
      transformResponse: (response: any) => {
        if (!response?.valido) throw new Error('Ocurrió un error.')
        const data = response.datos
        return {
          id: 1,
          curp: data.curp,
          firstName: data.primerNombre,
          secondName: data.segundoNombre,
          lastName: data.apellidoPaterno,
          secondLastName: data.apellidoMaterno,
          birthDate: data.fechaNacimiento,
          rfc: data.rfc,
          cp: '',
          province: '',
          address: '',
          city: '',
          state: '',
          serviceCal: ''
        }
      },
      transformErrorResponse: (error: any) => ({
        url: 'solicitante/validar-curp',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    }),
    getCPInfo: builder.query<any, { codigoPostal: string }>({
      query: initialLoad => ({
        url: 'domicilios/consultar-cp' ,
        method: 'POST',
        body: initialLoad
      }),
      transformResponse: (response: any) => {
        if (!response) throw new Error('Ocurrió un error.')
        const data = response.domicilio
        return {
          id: 1,
          curp: '',
          firstName: '',
          secondName: '',
          lastName: '',
          secondLastName: '',
          birthDate: '',
          rfc: '',
          cp: data.codigoPostal,
          province: data.colonia,
          address: '',
          city: data.municipio,
          state: data.estado,
          serviceCal: ''
        }
      },
      transformErrorResponse: (error: any) => ({
        url: 'domicilios/consultar-cp',
        code: error.status,
        message: error?.error ?? error?.data?.error ?? error?.data?.mensaje ?? error?.data?.errores[0]?.mensaje ?? error?.data?.mensajes[0],
        active: true,
      }),
    }),
  })
})

export const {
  useGetListConsultantsQuery,
  useGetListUserKeysQuery,
  useGetListFacultatedUsersQuery,
  useGetStepInfoQuery,
  useSaveStepQuery,
  useGetCURPInfoQuery,
  useGetCPInfoQuery,
} = apiSlice
