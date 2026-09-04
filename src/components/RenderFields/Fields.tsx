import { Radio, Input, Select, InputNumber, Space, Button, Typography, Flex } from 'antd';
import Icon from '@ant-design/icons';
import { FormValues } from '../../interface';
import RenderIcon from '../RenderIcon';

const { Text } = Typography;
interface InputWithButtonProps {
  values: FormValues;
  value?: any;
  onChange?: (val: any) => void;
}

const InputWithButtonControl = ({ values, value, onChange }: Readonly<InputWithButtonProps>) => {
  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={values.placeholder}
        disabled={values.isDisabled}
        maxLength={values.maxLength}
        onInput={values.onInput}
      />
      <Button
        type="primary"
          onClick={() => values.onButtonClick?.(value) }
          disabled={value.length < (values.maxLength || 0)}
      >
        {values.buttonText}
      </Button>
    </Space.Compact>
  )
}

const renderFields = (values: FormValues) => {
  switch (values.type) {
    case 'button':
      return (
        <Radio.Group className={values.className} optionType="button" buttonStyle="outline" size="large">
          {values.options?.map((option) => {
            const OptionIcon = option.icon;
            return (
              <Radio.Button key={String(option.value)} name={values.name} value={option.value}>
                {OptionIcon ? <RenderIcon icon={OptionIcon} /> : null}
                {option.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      )

    case 'select':
      return (
        <Select
          className={values.className}
          placeholder={values.placeholder || 'Selecciona una opción'}
          size="large"
          options={values.options || []}
          disabled={values.isDisabled}
        />
      )

    case 'text':
      return <Input placeholder={values.placeholder || 'Ingresa un valor'} size="large" disabled={values.isDisabled} />;

    case 'number':
      return <InputNumber controls={false} placeholder={values.placeholder} style={{ width: '100%' }} size="large" disabled={values.isDisabled} />;

    case 'input-btn':
      return <InputWithButtonControl values={values} />
    
      case 'display':
        return (
          <Flex vertical gap="small">
            <Space align="center">
              {values.displayIcon ? <span className='anticon'>
                <Icon component={values.displayIcon} style={{ fontSize: '1rem' }} />
                </span> : null}
                
              <Text style={{ fontSize: '1rem' }}>
                {`$${values.valueText} MXN`}
              </Text>
            </Space>
          </Flex>
        );

    default:
      return null;
  }
}

export default renderFields;
