import { FC, useEffect } from 'react';
import { Col, Form, Row, Typography } from 'antd';
import { FormType, FormValues } from '../../interface';
import renderFields from './Fields';
import { RenderIcon } from '..';

const { Title } = Typography;

const StepForm: FC<{
  values: FormValues[],
  initialValues: Record<string, any>,
  handleValues: (values: any) => void,
  isReadOnly: boolean
}> = ({ values, initialValues, handleValues, isReadOnly }) =>{
  const stepValues = values
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  const isVisible = (field: FormValues) => {
    if (!field.dependsOn) return true;

    const { field: fieldValue, value } = field.dependsOn;
    const valorActual = formValues?.[fieldValue];

    if (Array.isArray(value)) {
      return value.includes(valorActual);
    }

    return valorActual === value;
  }

  useEffect(() => {
    if (formValues) handleValues(formValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues,])
  
  return (
    <Form
      disabled={isReadOnly}
      form={form}
      layout="vertical"
      preserve={false}
      initialValues={initialValues}
    >
      <Row gutter={[32, 0]}>
        {stepValues.map((values) => {
          if (!isVisible(values)) return null;
          const SectionIcon = values.icon;
          const colSpan = values.span || 24;

          return (
            <Col
              key={`${values.name}-${values.id}`}
              span={colSpan}
              xs={24}
              md={colSpan}
            >
              <Form.Item
                name={values.name}
                label={values.displayIcon ? "" : (
                  <Title className='label-title' style={{ fontSize: '0.95rem' }} >
                    {SectionIcon ? <RenderIcon icon={SectionIcon} /> : null}
                    {values.label}
                  </Title>
                )}
                rules={values.rules}
                getValueProps={(value) => ({
                  value: (values.type === FormType.SELECT && value === '') ? undefined : value,
                })}
                normalize={(value) => ((values.type === FormType.SELECT && value === undefined) ? '' : value)}
              >
                {renderFields(values)}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
}

export default StepForm;
