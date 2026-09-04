import { Space, Typography } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { StepForm } from '..';
import { firstForm } from '../../utils';
import { FirstStepLabels, FirstFormValues } from '../../interface';
import { SAVE_APP_FLUX, UPDATE_STEP_VALUES, useAppDispatch } from '../../state';

const { Title } = Typography

const FirstStep = ({ initialValues, isReadOnly }: { initialValues: FirstFormValues, isReadOnly: boolean }) => {
  const dispatch = useAppDispatch()
  const handleValues = (values: FirstFormValues) => {
    dispatch(SAVE_APP_FLUX({ totalValues: Object.values(values).filter((valor) => valor !== undefined && valor !== null).length}))
    dispatch(UPDATE_STEP_VALUES({ stepId: 0, data: {id:0, ...values} }))
  }

  return (
    <Space vertical size={24}>
      <Space orientation='vertical' >
        <Title level={1} style={{ margin: 0, fontSize: '1.35rem' }}>
          <Space align="center" style={{ color: 'var(--font-blue-normal)' }}>
            <SlidersOutlined style={{ fontSize: '1.5rem' }} />
            <span>{FirstStepLabels.TITLE}</span>
          </Space>
        </Title>
        <Title level={2} style={{ margin: 0, fontSize: '1rem', color: 'var(--darker-gray-font)' }}>
          {FirstStepLabels.DESCRIPTION}
        </Title>
      </Space>
      <StepForm values={firstForm} initialValues={initialValues} handleValues={handleValues} isReadOnly={isReadOnly} />
    </Space>
  )
}

export default FirstStep
