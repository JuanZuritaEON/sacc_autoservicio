import { SAVE_APP_FLUX, UPDATE_STEP_VALUES, useAppDispatch, useAppSelector, RootState } from '../../state';
import { FirstStepLabels, FirstFormValues, FirstFieldValues } from '../../interface';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { FormInstance, Space, Typography } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';
import { firstForm } from '../../utils';
import { StepForm } from '..';

const { Title } = Typography

const FirstStep = ({ form, initialValues, isReadOnly }: { form: FormInstance, initialValues: FirstFormValues, isReadOnly: boolean }) => {
  const dispatch = useAppDispatch()
  const { userKey, individualConsultant,  } = useAppSelector((state: RootState) => state.app.appFluxContext)

  const handleValues = (values: FirstFormValues) => {
    if (values.reportType === FirstFieldValues.CONSUMER) {
      dispatch(SAVE_APP_FLUX({
        individualConsultant: '',
        userKey: '',
        facultatedUser: {
          id: '',
          name: '',
          email: '',
          address: '',
          phone: ''
        }}))
    } else if (values.reportType === FirstFieldValues.BUSINESS && values.receptionChannel === '') form.setFieldValue('receptionChannel', 'Otorgante')
    const fields = firstForm.map((field) => field.name)
    const filteredObject = fields.reduce((acc, key) => {
      if (key in values) {
        acc[key] = values[key as keyof FirstFormValues];
      }
      return acc;
    }, {} as Record<string, any>)

    dispatch(SAVE_APP_FLUX({ totalValues: fields.length}))
    dispatch(UPDATE_STEP_VALUES({ stepId: 0, data: {id:0, ...filteredObject} }))
  }

  const formattedValues = firstForm.map(value => {
    if (value.id === 1) {
      return {
        ...value,
        options:  value.options.map(option => ({
          ...option,
          isComplex: option.value === FirstFieldValues.BUSINESS,
          onClick: () => {
            dispatch(SAVE_APP_FLUX({
              individualConsultant: '',
              userKey: '',
              facultatedUser: {
                id: '',
                name: '',
                email: '',
                address: '',
                phone: ''
              },
              modalData: {
                active: true,
                title: `Flujo Otorgante`,
                idRender: option.label.toLowerCase(),
            }}))
          }
        }))
      }
    }
    if (value.id === 3) {
      return {
        ...value,
        options: value.options.flatMap((option, index) => {
          if (!userKey) return option
          const newOption = {
            ...option,
            isComplex: option.value === FirstFieldValues.OFFICE || option.value === FirstFieldValues.MESSAGING || option.value === FirstFieldValues.EMAIL,
            onClick: (setterField: (field: string, value: any) => void) => {
              dispatch(SAVE_APP_FLUX({ modalData: {
                active: true,
                title: `Canal ${option.label}`,
                idRender: option.label.toLowerCase(),
                acceptButtonLabel: option.value === FirstFieldValues.OFFICE ? 'Aceptar' : 'Guardar',
                backButtonLabel: 'Cancelar',
                onAccept: () => {
                  setterField(value.name, option.value)
                  dispatch(SAVE_APP_FLUX({ modalData: { active: false } }))
                }
              }}))
            }
          }
          if (index === 0 && individualConsultant) {
            return [
              {
                label: FirstStepLabels.BUSINESS,
                value: FirstFieldValues.BUSINESS,
                icon: BuildingOfficeIcon
              },
              newOption
            ]
          }
          return newOption
        })
      }
    }
    return value
  })

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
      <StepForm mainForm={form} values={formattedValues} initialValues={initialValues} handleValues={handleValues} isReadOnly={isReadOnly} />
    </Space>
  )
}

export default FirstStep
