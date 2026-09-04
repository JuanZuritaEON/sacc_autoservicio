import { FC, useEffect } from 'react';
import { Flex, Layout, Progress, Steps } from 'antd';
import { headerSteps, headerStyle, calcPercentage } from '../utils';
import { SAVE_APP_FLUX, RootState, useAppDispatch, useAppSelector } from '../state';

const { Header } = Layout;

const HeaderContainer: FC<{
  changeStep: (step: number) => void
}> = ({ changeStep }) => {
  const { currentStep, totalValues, maxStepReach, steps } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const dispatch = useAppDispatch()
  const percentage = currentStep === 4 ? 100 : calcPercentage(totalValues, steps[currentStep])
  const onChange = (value: number) => changeStep(value)

  const items = headerSteps.map((step, i) => {
    let status: "error" | "finish" | "process" | "wait" | undefined = 'wait'
    if (i === currentStep) status = 'process'
    if (i === maxStepReach) status = 'process'
    if (i < maxStepReach) status = 'finish'

    return {
      title: step.label,
      icon: <step.icon />,
      status,
      disabled:  i > maxStepReach,
      content: i === currentStep ? (
      <Flex vertical gap="small" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '0 1rem',
      }}>
        <Progress
          showInfo={false}
          size={{ height: 2 }}
          percent={percentage} 
          status={percentage === 100 ? 'success' : 'active'}
          strokeColor='#1677ff'
        />
      </Flex>
      ) : null,
    }
  })

  useEffect(() => {
    dispatch(SAVE_APP_FLUX({ percentage }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage])

  return (
    <Header style={headerStyle}>
      <Steps
        className={`custom-selectors-steps ${percentage === 100 && currentStep === maxStepReach ? 'custom-navigation-steps' : ''}`}
        type='navigation'
        current={currentStep} 
        items={items}
        onChange={onChange}
      />
    </Header>
  )
}

export default HeaderContainer;