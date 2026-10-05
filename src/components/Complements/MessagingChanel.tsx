import { useState } from 'react';
import { SubTabs } from '..'
import { Space, Typography, Form, Input, Row, Col, FormInstance } from 'antd';

const { Text } = Typography;
const RegisterTab = () => (
  <Space orientation='vertical' size={2} style={{ width: '100%', padding: '1.5rem' }}>
    <Text>Av. Insurgentes Sur 125 Int. 2 Col. Del Valle Centro</Text>
    <Text>Benito Juarez, Ciudad de Mexico -C.P. 03100</Text>
  </Space>
)
const UnregisteredTab = ({ form }: { form: FormInstance }) => {
  
  return (
    <Form
      form={form}
      layout='vertical'
      style={{ width: '100%', padding: '1.5rem' }}
      initialValues={{
        streetAndNumber: '',
        province: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      }}
    >
      <Row gutter={[16,16]}>
        <Col span={12}>
          <Form.Item label='Calle y Numero' name='streetAndNumber'>
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Colonia o Poblacion' name='province'>
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label='Delegacion / Municipio' name='address' >
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Ciudad' name='city'>
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label='Estado' name='state'>
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Codigo Postal' name='zipCode'>
            <Input placeholder={'Ingresa un valor'} size="large" />
          </Form.Item>
        </Col>
      </Row>
{/*       <Row gutter={16}>
          {values && <Space orientation='vertical' style={{ width: 'fit-content' }}>
            <Text>{values.streetAndNumber}</Text>
            <Text>{values.province}</Text>
            <Text>{values.address}</Text>
            <Text>{values.city}</Text>
            <Text>{values.state}</Text>
            <Text>{values.zipCode}</Text>
          </Space>}
      </Row> */}
    </Form>
  )
}

const MessagingChanel = ({ form }: { form: FormInstance }) => {
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
          subTab === 'register' ? <RegisterTab /> : <UnregisteredTab form={form} />
        }
      </Space>
  )
}

export default MessagingChanel