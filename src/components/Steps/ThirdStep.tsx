import { FormInstance, Space, Typography } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { StepForm } from '..';
import { thirdForm } from '../../utils';
import { ThirdStepLabels, ThirdFormValues } from '../../interface';
import { SAVE_APP_FLUX, UPDATE_STEP_VALUES, useAppDispatch } from '../../state';

const { Title } = Typography

const ThirdStep = ({ initialValues, isReadOnly, form }: { initialValues: ThirdFormValues, isReadOnly: boolean, form: FormInstance }) => {
  const dispatch = useAppDispatch()
  const handleValues = (values: ThirdFormValues) => {
    dispatch(SAVE_APP_FLUX({ totalValues: Object.values(values).filter((valor) => valor !== undefined && valor !== null).length}))
    dispatch(UPDATE_STEP_VALUES({ stepId: 2, data: {id:2, ...values} }))
  }

  return (
    <Space vertical size={16}>
      <Space orientation='vertical'>
        <Title level={1} style={{ margin: 0, fontSize: '1.25rem' }}>
          <Space align="center" style={{ color: 'var(--font-blue-normal)' }}>
            <SlidersOutlined style={{ fontSize: '1.5rem' }} />
            <span>{ThirdStepLabels.TITLE}</span>
          </Space>
        </Title>
        <Title level={2} style={{ margin: 0, fontSize: '1rem', color: 'var(--darker-gray-font)' }}>
          {ThirdStepLabels.DESCRIPTION}
        </Title>
      </Space>
      <StepForm mainForm={form} values={thirdForm} initialValues={initialValues} handleValues={handleValues} isReadOnly={isReadOnly} />
    </Space>
  )
}

export default ThirdStep
