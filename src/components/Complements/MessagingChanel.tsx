import { useState } from 'react';
import { Space, Typography, FormInstance } from 'antd';
import { useAppSelector, useAppDispatch, RootState, SAVE_APP_FLUX, UPDATE_FACULTATED_DATA } from '../../state'
import { StepForm, SubTabs } from '..'
import { messagingComplement } from '../../utils';

const { Text } = Typography;

const RegisterTab = ({ address }: { address: string }) => (
  <Space orientation='vertical' size={2} style={{ width: '100%', padding: '1.5rem' }}>
    <Text strong>Esta es la direccion que tenemos registrada en nuestro sistema:</Text>
    <Text>"{address}"</Text>
  </Space>
)

const UnregisteredTab = ({ form, modalData }: { form: FormInstance, modalData: any }) => {
  const dispatch = useAppDispatch()

  const handleValues = (values: any) => {
    if (values.streetNumber && values.province && values.address && values.city && values.state && values.zipCode) {
      dispatch(SAVE_APP_FLUX({
        modalData: {
          ...modalData,
          onAccept: () => {
            form.setFieldValue('receptionChannel', 'Mensajería')
            dispatch(UPDATE_FACULTATED_DATA({
              field: 'address',
              data: `${values.streetNumber}, ${values.province}, ${values.address}, ${values.city}, ${values.state}, ${values.zipCode}`
            }))
            dispatch(SAVE_APP_FLUX({ modalData: { active: false }}))
          }
        }
      }))
    }
  }

  return (
    <Space orientation='vertical' size={16} style={{ width: '100%', padding: '1rem' }}>
      <StepForm
        mainForm={form}
        values={messagingComplement}
        initialValues={{
          streetAndNumber: '',
          province: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
        }}
        handleValues={handleValues}
        isReadOnly={false}
      />
    </Space>
  )
}

const MessagingChanel = ({ form }: { form: FormInstance }) => {
  const { facultatedUser, modalData } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const [subTab, setSubTab] = useState('register')
  const tabs = [
    {
      id: 'register',
      name: 'Domicilio Registrado'
    },
    {
      id: 'unregistered',
      name: 'Registrar otro domicilio'
    }
  ]

  return (
      <Space orientation='vertical' size={16} style={{ width: '100%' }}>
        <SubTabs subTabActual={subTab} tabs={tabs} setTab={setSubTab} />
        {
          subTab === 'register' ? <RegisterTab address={facultatedUser.address} /> : <UnregisteredTab form={form} modalData={modalData} />
        }
      </Space>
  )
}

export default MessagingChanel