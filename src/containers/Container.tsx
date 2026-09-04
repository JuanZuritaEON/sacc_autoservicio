import { useEffect } from 'react';
import { Layout } from 'antd';
import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
import { FirstStep, FourthStep, LoaderSkeleton, SecondStep, ThirdStep } from '../components';
import { RootState, SAVE_APP_FLUX, apiSlice, useAppDispatch, useAppSelector } from '../state';
import { contentStyle, layoutStyle, formatStepPayload, sendAppError, sendToastMessage } from '../utils';

const { Content } = Layout;
const stepComponent = [FirstStep, SecondStep, ThirdStep, FourthStep]

const Container = () => {
  const { currentStep, steps, maxStepReach, generalLoader, reportId } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const { saveStep } = apiSlice.endpoints
  const dispatch = useAppDispatch()
  const CurrentStepComponent = stepComponent[currentStep];
  const initialValues = steps.find(step => step.id === currentStep) || {} as any
  const isReadOnly = currentStep < maxStepReach;
  
  ///Actualiza el Step actual con los botones Siguiente y Regresar y tambien con el Nav Header
  const updateStep = async (step: number) => {
    try {
      dispatch(SAVE_APP_FLUX({ generalLoader: true, currentStep: step }))
      if (step > maxStepReach) dispatch(SAVE_APP_FLUX({ maxStepReach: step }))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(SAVE_APP_FLUX({ generalLoader: false }))
    }
  }

  ///Envía la información del paso actual al backend, solo si el paso es el que esta en progreso actual.
  const sendStepInfo = async (step: number) => {
    try {
      dispatch(SAVE_APP_FLUX({ generalLoader: true }))
      if (step < maxStepReach) {
        updateStep(step + 1)
        return
      }
      updateStep(step + 1)
      const { id, ...stepData } = steps[step]
      const payload = formatStepPayload(step, stepData, reportId)
      const promise = dispatch(saveStep.initiate({ stepId: step + 1, payload }))
      const { data, isSuccess, isError, error } = await promise
      if (isSuccess) {
        sendToastMessage({
          type: 'success',
          message: 'Paso completado correctamente.',
          closeTimer: 5000,
        })
        dispatch(SAVE_APP_FLUX({ reportId: data.cveReporte }))
        updateStep(step + 1)
      }
      if (isError) throw error
    } catch (error) {
      console.error(error)
      sendAppError(error)
    } finally {
      dispatch(SAVE_APP_FLUX({ generalLoader: false }))
    }
  }

  useEffect(() => {
    const initialLoad = async () => {
      try {
        dispatch(SAVE_APP_FLUX({ generalLoader: true }))
        //Se va a obtener el paso si es que existe uno en progreso, por ahora dejar el inicial en 0
        dispatch(SAVE_APP_FLUX({ currentStep: 0}))
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(SAVE_APP_FLUX({ generalLoader: false }))
      }
    }
    initialLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (generalLoader) return <LoaderSkeleton />
  return (
    <Layout style={layoutStyle}>
      <HeaderContainer changeStep={updateStep} />
      <Content style={contentStyle}>
        {CurrentStepComponent && <CurrentStepComponent initialValues={initialValues} isReadOnly={isReadOnly} />}
      </Content>
      <FooterContainer changeStep={updateStep} sendStepInfo={sendStepInfo} />
    </Layout>
  )
}

export default Container
