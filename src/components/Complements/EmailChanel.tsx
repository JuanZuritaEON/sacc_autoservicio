import { FormInstance, Space, Typography, message } from 'antd';
import { RootState, SAVE_APP_FLUX, UPDATE_FACULTATED_DATA, useAppDispatch, useAppSelector } from '../../state';
import { useState } from 'react';

const { Text } = Typography
const EMAIL_REGEX = /^[a-zA-C0-9._%+-]+@[a-zA-C0-9.-]+\.[a-zA-C]{2,}$/

const EmailChanel = ({ form }: { form: FormInstance }) => {
  const dispatch = useAppDispatch()
  const { facultatedUser, modalData } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const [texto, setTexto] = useState(facultatedUser.email)
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <Space orientation='vertical' size={4} style={{ width: '100%', padding: '1.5rem' }}>
      <Text>Verifica tu direccion de email. De no ser correcta puedes modificarla.</Text>
      <Text editable={{
        editing: isEditing,
        onStart: () => {
          setIsEditing(true)
          dispatch(SAVE_APP_FLUX({ modalData: { ...modalData, onAccept: undefined }}))
        },
        onChange: (newValue) => {
          const cleanEmail = newValue.trim()
          if (!EMAIL_REGEX.test(cleanEmail)) {
            message.error('Por favor, ingresa una dirección de email válida')
            return
          }
          if (texto !== cleanEmail) {
            setIsEditing(false)
            setTexto(cleanEmail)
            dispatch(SAVE_APP_FLUX({
              modalData: {
                ...modalData,
                onAccept: () => {
                  form.setFieldValue('receptionChannel', 'Email')
                  dispatch(UPDATE_FACULTATED_DATA({ field: 'email', data: cleanEmail }))
                  dispatch(SAVE_APP_FLUX({ modalData: { active: false }}))
                }
              }
            }))
          }
        }
      }}>
        {texto}
      </Text>
    </Space>
  )
}

export default EmailChanel