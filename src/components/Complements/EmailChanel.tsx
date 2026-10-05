import { Space, Typography } from 'antd';
import { RootState, useAppSelector } from '../../state';
import { useState } from 'react';

const { Text } = Typography

const EmailChanel = () => {
  const { facultatedUser } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const [texto, setTexto] = useState(facultatedUser.email)
  
  return (
    <Space orientation='vertical' size={4} style={{ width: '100%', padding: '1.5rem' }}>
      <Text>Verifica tu direccion de email. De no ser correcta puedes modificarla.</Text>
      <Text editable={{ onChange: setTexto }}>
        {texto}
      </Text>
    </Space>
  )
}

export default EmailChanel