import { StepForm } from '..'
import { FormInstance, Space, Spin, Typography } from 'antd'
import { sendAppError, stepOneComplements } from '../../utils'
import { FirstFieldNames, StepOneComplements } from '../../interface';
import { apiSlice, RootState, SAVE_APP_FLUX, useAppDispatch, useAppSelector } from '../../state';
import { useEffect, useState } from 'react';

const { Text } = Typography

const ConsultantFlux = ({ form }: { form: FormInstance }) => {
  const { consultants, modalData } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const dispatch = useAppDispatch()
  const { getListUserKeys, getListFacultatedUsers } = apiSlice.endpoints
  const [loading, setLoading] = useState(false)
  const [userKeys, setUserKeys] = useState<{ id: string, name: string }[]>([])
  const [facultatedUsers, setFacultatedUsers] = useState<{id: string, name: string, lastName: string, secondLastName: string, email: string, address: string, phone: string}[]>([])

  const handleValues = (values: StepOneComplements) => {
    if (values.consultant && values.userKey && values.facultatedUser) {
      const userKey = userKeys.find(key => key.id === values.userKey)?.name
      const facultatedUser = facultatedUsers.find(user => user.id === values.facultatedUser)
      dispatch(SAVE_APP_FLUX({
        modalData: {
          ...modalData,
          onAccept: () => {
            form.setFieldValue('reportType', 'Otorgante')
            form.setFieldValue('receptionChannel', '')
            dispatch(SAVE_APP_FLUX({ 
              modalData: { active: false },
              userKey: userKey,
              facultatedUser: facultatedUser,
            }))
          }
        },
        individualConsultant: values.consultant,
      }))
    }
  }

  const handleSearchConsultantData = async (value: string, setterField?: (field: string, newVal: any) => void) => {
    try {
      setLoading(true)
      dispatch(SAVE_APP_FLUX({
        modalData: {
          ...modalData,
          onAccept: undefined
        },
      }))
      if (setterField) {
        setterField('userKey', '')
        setterField('facultatedUser', '')
      }
      const userKeys = dispatch(getListUserKeys.initiate({
        numeroOtorgante: value
      }, { forceRefetch: true }))
      const { data: userKeysData, isSuccess, isError, error, isLoading } = await userKeys
      if (isSuccess) {
        const userKeyFormat = userKeysData.usuariosOtorgante.map((user: any) => ({
          id: user.usuarioOtorgante,
          name: user.claveUsuarioOtorgante,
        }))
        setUserKeys(userKeyFormat)
      }
      if (isError) throw error
      if (!isLoading) {
        const facultatedUsers = dispatch(getListFacultatedUsers.initiate({
          numeroOtorgante: value
        }, { forceRefetch: true }))
        const { data: facultatedUsersData, isSuccess, isError, error } = await facultatedUsers
        if (isSuccess) {
          const facultatedFormat = facultatedUsersData.funcionariosOtorgante.map((user: any) => ({
            id: user.idFuncionarioFacultado,
            name: user.nombre,
            lastName: user.apellidoPaterno,
            secondLastName: user.apellidoMaterno,
            email: user.correoElectronico,
            address: user.direccion,
            phone: user.telefono
          }))
          setFacultatedUsers(facultatedFormat)
        }
        if (isError) throw error
      }
      if (setterField) setterField('consultant', value)
    } catch (error) {
      sendAppError(error)
      if (setterField) setterField('consultant', '')
    } finally {
      setLoading(false)
    }
  }

  const formattedValues = stepOneComplements.map(value => {
    if (value.id === 1) {
      return {
        ...value,
        options: consultants.map(consultant => ({
          label: `${consultant.id} - ${consultant.name}`,
          value: consultant.id,
        })),
        onButtonClick: (val: string, setterField?: (field: string, newVal: any) => void) => handleSearchConsultantData(val, setterField)
      }
    }
    if (value.id === 2) {
      return {
        ...value,
        options: userKeys.map((user) => ({
          label: `${user.id} - ${user.name}`,
          value: user.id
        }))
      }
    }
    if (value.id === 3) {
      return {
        ...value,
        options: facultatedUsers.map((user) => ({
          label: `${user.id} - ${user.name} ${user.lastName} ${user.secondLastName}`,
          value: user.id
        }))
      }
    }
    return value
  })

  useEffect(() => {
    form.setFieldValue(FirstFieldNames.CONSULTANT, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Space orientation='vertical' size={16} style={{ width: '100%', padding: '1rem' }}>
      <Space orientation='vertical' size={8}>
        <Text strong>Consulta de otorgantes</Text>
        <Text>Elige un otorgante de la lista y podras consultar sus claves de usuario y funcionarios facultados</Text>
      </Space>
      <Spin spinning={loading}>
        <StepForm
          mainForm={form}
          values={formattedValues}
          initialValues={{
            [FirstFieldNames.CONSULTANT]: '',
            [FirstFieldNames.USER_KEY]: '',
            [FirstFieldNames.FACULTATED_USER]: '',
          }}
          handleValues={handleValues}
          isReadOnly={false}
        />
      </Spin>
    </Space>
  )
}

export default ConsultantFlux