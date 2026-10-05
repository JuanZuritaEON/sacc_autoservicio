import { useEffect } from 'react';
import { Form, FormInstance, Layout } from 'antd';
import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
import { ConsultantFlux, EmailChanel, FirstStep, FourthStep, LoaderSkeleton, MessagingChanel, Modal, OfficeChanel, SecondStep, ThirdStep } from '../components';
import { RootState, SAVE_APP_FLUX, apiSlice, useAppDispatch, useAppSelector } from '../state';
import { contentStyle, layoutStyle, formatStepPayload, sendAppError, sendToastMessage } from '../utils';

const { Content } = Layout;
const stepComponent = [FirstStep, SecondStep, ThirdStep, FourthStep]
const complementsComponent = {
  otorgante: ConsultantFlux,
  oficina: OfficeChanel,
  mensajeria: MessagingChanel,
  email: EmailChanel,
}

const RenderComplement = ({ idRender, form }: { idRender: string, form: FormInstance }) => {
  const ComplementComponent = complementsComponent[idRender as keyof typeof complementsComponent]
  if (!ComplementComponent) return <span>No existe el ID de los datos.</span>
  return <ComplementComponent form={form} />
}

const Container = () => {
  const {
    currentStep,
    individualConsultant,
    facultatedUser,
    userKey,
    steps,
    maxStepReach,
    generalLoader,
    reportId,
    modalData
  } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const { saveStep, getListConsultants } = apiSlice.endpoints
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const CurrentStepComponent = stepComponent[currentStep];
  const initialValues = steps.find(step => step.id === currentStep) || {} as any
  const isReadOnly = currentStep < maxStepReach;
  
  ///Actualiza el Step actual con los botones Siguiente y Regresar y tambien con el Nav Header
  const updateStep = (step: number) => {
    try {
      dispatch(SAVE_APP_FLUX({ generalLoader: true, currentStep: step }))
      if (step > maxStepReach) dispatch(SAVE_APP_FLUX({ maxStepReach: step }))
    } catch (error) {
      sendAppError(error)
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
      const payload: any = formatStepPayload(step, stepData, reportId)
      if (currentStep === 0 && individualConsultant) {
        payload.numOtorgante = individualConsultant
        payload.usuarioFacultado = {    
          idFuncionarioFacultado: facultatedUser.id,
          nombre: facultatedUser.name,
          apellidoPaterno: facultatedUser.lastName,
          apellidoMaterno: facultatedUser.secondLastName,
          correoElectronico: facultatedUser.email,
          direccion: facultatedUser.address,
          telefono: facultatedUser.phone
        }
        payload.claveUsuario = userKey
      }
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
        const promise = dispatch(getListConsultants.initiate({}))
        const { data, isSuccess, isError, error } = await promise
        if (isSuccess) {
          dispatch(SAVE_APP_FLUX({
            consultants: data.otorgantes.map((result: any) => ({
              id: result.numeroOtorgante,
              name: result.razonSocialOtorgante
            }))
          }))
        }
        if (isError) throw error
        dispatch(SAVE_APP_FLUX({ currentStep: 0}))
      } catch (error) {
        sendAppError(error)
      } finally {
        dispatch(SAVE_APP_FLUX({ generalLoader: false }))
      }
    }
    void initialLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (generalLoader) return <LoaderSkeleton />
  return (
    <>
      <Layout style={layoutStyle}>
        <HeaderContainer changeStep={updateStep} />
        <Content style={contentStyle}>
          {CurrentStepComponent && <CurrentStepComponent form={form} initialValues={initialValues} isReadOnly={isReadOnly} />}
        </Content>
        <FooterContainer changeStep={updateStep} sendStepInfo={sendStepInfo} />
      </Layout>
      <Modal onAccept={modalData.onAccept}>
        <RenderComplement idRender={modalData.idRender} form={form} />
      </Modal>
    </>
  )
}

export default Container
