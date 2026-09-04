import { Space, Typography } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { StepForm } from '..';
import { fourthForm } from '../../utils';
import { FourthStepLabels, FourthFormValues } from '../../interface';
import { SAVE_APP_FLUX, UPDATE_STEP_VALUES, useAppDispatch } from '../../state';

const { Title } = Typography

const FourthStep = ({ initialValues, isReadOnly }: { initialValues: FourthFormValues, isReadOnly: boolean }) => {
  const dispatch = useAppDispatch()
  const handleValues = (values: FourthFormValues) => {
    dispatch(SAVE_APP_FLUX({ totalValues: Object.values(values).filter((valor) => valor !== undefined && valor !== null).length}))
    dispatch(UPDATE_STEP_VALUES({ stepId: 3, data: {id:3, ...values} }))
  }

  return (
    <Space vertical size={16}>
      <Space orientation='vertical'>
        <Title level={1} style={{ margin: 0, fontSize: '1.25rem' }}>
          <Space align="center" style={{ color: 'var(--font-blue-normal)' }}>
            <SlidersOutlined style={{ fontSize: '1.5rem' }} />
            <span>{FourthStepLabels.TITLE}</span>
          </Space>
        </Title>
        <Title level={2} style={{ margin: 0, fontSize: '1rem', color: 'var(--darker-gray-font)' }}>
          {FourthStepLabels.DESCRIPTION}
        </Title>
      </Space>
      <StepForm values={fourthForm} initialValues={initialValues} handleValues={handleValues} isReadOnly={isReadOnly} />
    </Space>
  )
}

export default FourthStep
