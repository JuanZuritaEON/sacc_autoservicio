import { useState } from 'react';
import { FormInstance, Space, Typography } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { StepForm } from '..';
import { secondForm } from '../../utils';
import { SecondStepLabels, SecondFormValues } from '../../interface';
import { apiSlice, SAVE_APP_FLUX, useAppDispatch, UPDATE_STEP_VALUES, useAppSelector, RootState } from '../../state';

const { Title } = Typography

const SecondStep = ({ initialValues, isReadOnly, form }: { initialValues: SecondFormValues, isReadOnly: boolean, form: FormInstance }) => {
  const dispatch = useAppDispatch()
  const { steps } = useAppSelector((state: RootState) => state.app.appFluxContext)

  const { getCURPInfo, getCPInfo } = apiSlice.endpoints
  const [formValues, setFormValues] = useState(initialValues)
  
  const handleValues = (values: SecondFormValues) => {
    dispatch(SAVE_APP_FLUX({ totalValues: Object.keys(values).length}))
    dispatch(UPDATE_STEP_VALUES({ stepId: 1, data: {id:1, ...values} }))
  }

  const handleValidateCurp = async (value: string) => {
    try {
      dispatch(SAVE_APP_FLUX({ generalLoader: true }))
      const promise = dispatch(getCURPInfo.initiate({ curp: value }, { forceRefetch: true }))
      const { data, isSuccess, isError, error } = await promise
      if (isSuccess) {
        dispatch(UPDATE_STEP_VALUES({ stepId: 1, data: {
          ...formValues,
          curp: data.curp,
          firstName: data.firstName,
          secondName: data.secondName,
          lastName: data.lastName,
          secondLastName: data.secondLastName,
          birthDate: data.birthDate,
          rfc: data.rfc,
        } }))
        setFormValues({
          ...formValues,
          curp: data.curp,
          firstName: data.firstName,
          secondName: data.secondName,
          lastName: data.lastName,
          secondLastName: data.secondLastName,
          birthDate: data.birthDate,
          rfc: data.rfc,
        })
      }
      if (isError) {
        dispatch(UPDATE_STEP_VALUES({ stepId: 1, data: {
          ...formValues,
          curp: value,
          firstName: '',
          secondName: '',
          lastName: '',
          secondLastName: '',
          birthDate: '',
          rfc: '',
        }}))
        setFormValues({
          ...formValues,
          curp: value,
          firstName: '',
          secondName: '',
          lastName: '',
          secondLastName: '',
          birthDate: '',
          rfc: '',
        })
        throw error
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(SAVE_APP_FLUX({ generalLoader: false }))
    }
  }
  const handleSearchCp = async (value: string) => {
    try {
      dispatch(SAVE_APP_FLUX({ generalLoader: true }))
      const promise = dispatch(getCPInfo.initiate({ codigoPostal: value }, { forceRefetch: true }))
      const {...rest} = steps[1] as SecondFormValues
      const { data, isSuccess, isError, error } = await promise
      if (isSuccess) {
        dispatch(UPDATE_STEP_VALUES({ stepId: 1, data: {
          ...rest,
          cp: data.cp,
          province: data.province,
          city: data.city,
          state: data.state,
        } }))
        setFormValues({
          ...rest,
          cp: data.cp,
          province: data.province,
          city: data.city,
          state: data.state,
        })
      }
      if (isError) {
        dispatch(UPDATE_STEP_VALUES({ stepId: 1, data: {
          ...rest,
          cp: '',
          province: '',
          city: '',
          state: '',
        } }))
        setFormValues({
          ...rest,
          cp: '',
          province: '',
          city: '',
          state: '',
        })
        throw error
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(SAVE_APP_FLUX({ generalLoader: false }))
    }
  }
  const formattedValues = secondForm.map(value => {
    if (value.id === 1) {
      return {
        ...value,
        onButtonClick: handleValidateCurp
      }
    }
    if (value.id === 8) {
      return {
        ...value,
        onButtonClick: handleSearchCp
      }
    }
    return value
  })
  
  return (
    <Space vertical size={16}>
      <Space orientation='vertical'>
        <Title level={1} style={{ margin: 0, fontSize: '1.25rem' }}>
          <Space align="center" style={{ color: 'var(--font-blue-normal)' }}>
            <SlidersOutlined style={{ fontSize: '1.5rem' }} />
            <span>{SecondStepLabels.TITLE}</span>
          </Space>
        </Title>
        <Title level={2} style={{ margin: 0, fontSize: '1rem', color: 'var(--darker-gray-font)' }}>
          {SecondStepLabels.DESCRIPTION}
        </Title>
      </Space>
      <StepForm mainForm={form} values={formattedValues} initialValues={formValues} handleValues={handleValues} isReadOnly={isReadOnly} />
    </Space>
  )
}

export default SecondStep
