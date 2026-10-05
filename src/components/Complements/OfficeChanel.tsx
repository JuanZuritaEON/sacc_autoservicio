import { Space, Typography } from 'antd';
import { MapPinIcon } from '@heroicons/react/24/outline';
import RenderIcon from '../RenderIcon';

const { Text } = Typography;

const OfficeChanel = () => {
  return (
    <Space orientation='vertical' size={4} style={{ width: '100%', padding: '1.5rem' }}>
      <Text>Deberas recoger tu Reporte de Credito Especial en la Unidad Especializada de Atencion a Clientes de Circulo de Credito.</Text>
      <Text>Domicilio:</Text>
      <Text><RenderIcon icon={MapPinIcon} />Jaime Balme No. 11, Edificio E, Mezanine 1, Seccion A, Plaza Polanco, Col. Los Morales Polanco, Alcaldia Miguel Hidalgo, C.P 11510, Ciudad de Mexico.</Text>
    </Space>
  )
}

export default OfficeChanel