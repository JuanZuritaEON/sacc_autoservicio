import { FC, useEffect } from 'react';
import { Col, Form, FormInstance, Row, Typography } from 'antd';
import { FormType, FormValues } from '../../interface';
import renderFields from './Fields';
import { RenderIcon } from '..';
import { isDependencyMet } from '../../utils';

const { Title } = Typography;

const StepForm: FC<{
  mainForm: FormInstance,
  values: FormValues[],
  initialValues: Record<string, any>,
  handleValues: (values: any, setterField?: (field: string, value: any) => void) => void,
  isReadOnly: boolean
}> = ({ mainForm,values, initialValues, handleValues, isReadOnly }) =>{
  const stepValues = values
  const formValues = Form.useWatch([], mainForm)
  
  const isVisible = (field: FormValues) => {
    if (!field.dependsOn) return true;
    
    return isDependencyMet(field.dependsOn, formValues ?? {})
  }
  
  useEffect(() => {
    if (formValues) handleValues(formValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues])
  
  return (
    <Form
      disabled={isReadOnly}
      form={mainForm}
      layout="vertical"
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
                  value: ((values.type === FormType.SELECT || values.type === FormType.SELECT_BTN) && value === '') ? undefined : value,
                })}
                normalize={(value) => (((values.type === FormType.SELECT || values.type === FormType.SELECT_BTN) && value === undefined) ? '' : value)}
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
