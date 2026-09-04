import {
  CheckCircleOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  SendOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  KeyOutlined,
  UserSwitchOutlined,
  WhatsAppOutlined,
  PullRequestOutlined
} from "@ant-design/icons";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  Square3Stack3DIcon,
  BriefcaseIcon,
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  TableCellsIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'
import {
  Labels,
  FormType,
  FirstFieldNames,
  FirstFieldValues,
  FirstStepLabels,
  SecondFieldNames,
  SecondFieldValues,
  SecondStepLabels,
  ThirdFieldNames,
  ThirdFieldValues,
  ThirdStepLabels,
  FourthStepLabels,
  FourthFieldNames,
  FourthFieldValues
} from "../interface/enums";

export const layoutStyle = {
  padding: '0.25rem',
  maxHeight: '100dvh',
  maxWidth: '100dvw'
}
export const contentStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  padding: '2rem 1rem',
  backgroundColor: 'var(--white-color)',
  height: '100%',
  overflow: 'auto',
}
export const headerStyle = {
  width: 'auto',
  height: '10dvh',
  alignContent: 'center',
  padding: '0 1rem',
  borderRadius: '0.5rem 0.5rem 0 0',
  backgroundColor: 'white',
}
export const footerStyle = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  padding: '0 1rem',
  gap: '1rem',
  width: 'auto',
  height: '10dvh',
  backgroundColor: 'white',
}

export const headerSteps = [
  {
    id: 1,
    label: Labels.STEP_1,
    icon: SettingOutlined
  },
  {
    id: 2,
    label: Labels.STEP_2,
    icon: UserOutlined
  },
  {
    id: 3,
    label: Labels.STEP_3,
    icon: LoadingOutlined
  },
  {
    id: 4,
    label: Labels.STEP_4,
    icon: SendOutlined
  },
  {
    id: 5,
    label: Labels.STEP_5,
    icon: CheckCircleOutlined
  },
]
export const firstForm = [
  {
    id: 1,
    label: FirstStepLabels.REPORT_TYPE,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 12,
    className: 'custom-radio-button',
    icon: FileTextOutlined,
    name: FirstFieldNames.REPORT_TYPE,
    options: [
      {
        label: FirstStepLabels.CONSUMER,
        value: FirstFieldValues.CONSUMER,
        icon: UserSwitchOutlined
      },
      {
        label: FirstStepLabels.BUSINESS,
        value: FirstFieldValues.BUSINESS,
        icon: BuildingOfficeIcon
      },
    ]
  },
  {
    id: 2,
    label: FirstStepLabels.PERSON_TYPE,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 12,
    icon: TeamOutlined,
    className: 'custom-radio-button',
    name: FirstFieldNames.PERSON_TYPE,
    options: [
      {
        label: FirstStepLabels.FISICA,
        value: FirstFieldValues.FISICA,
        icon: UserOutlined
      },
      {
        label: FirstStepLabels.MORAL,
        value: FirstFieldValues.MORAL,
        icon: BriefcaseIcon
      },
    ]
  },
  {
    id: 3,
    label: FirstStepLabels.RECEPTION_CHANNEL,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 24,
    icon: QuestionCircleOutlined,
    className: 'custom-radio-button',
    name: FirstFieldNames.RECEPTION_CHANNEL,
    options: [
      {
        label: FirstStepLabels.OFFICE,
        value: FirstFieldValues.OFFICE,
        icon: MapPinIcon
      },
      {
        label: FirstStepLabels.MESSAGING,
        value: FirstFieldValues.MESSAGING,
        icon: TruckIcon
      },
      {
        label: FirstStepLabels.EMAIL,
        value: FirstFieldValues.EMAIL,
        icon: EnvelopeIcon
      },
      {
        label: FirstStepLabels.PHONE,
        value: FirstFieldValues.PHONE,
        icon: PhoneIcon
      },
      {
        label: FirstStepLabels.WHATSAPP,
        value: FirstFieldValues.WHATSAPP,
        icon: WhatsAppOutlined
      },
    ]
  },
  {
    id: 4,
    label: FirstStepLabels.OFFICE_CLASSIFICATION,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 24,
    icon: Square3Stack3DIcon,
    className: 'custom-radio-button',
    name: FirstFieldNames.OFFICE_CLASSIFICATION,
    options: [
      {
        label: FirstStepLabels.WINDOW,
        value: FirstFieldValues.WINDOW,
        icon: TableCellsIcon
      },
      {
        label: FirstStepLabels.CC,
        value: FirstFieldValues.CC,
        icon: PullRequestOutlined
      },
      {
        label: FirstStepLabels.CONDUSEF,
        value: FirstFieldValues.CONDUSEF,
        icon: ScaleIcon
      }
    ]
  },
  {
    id: 5,
    label: FirstStepLabels.USER_KEY,
    placeholder: 'Selecciona una opción...',
    type: FormType.SELECT,
    span: 12,
    icon: KeyOutlined,
    className: 'custom-select-comp',
    name: FirstFieldNames.USER_KEY,
    dependsOn: {
      field: FirstFieldNames.REPORT_TYPE,
      value: FirstFieldValues.BUSINESS
    },
    rules: [
      {
        required: true,
        message: 'Por favor selecciona una opción'
      }
    ],
    options: [
      {
        label: FirstStepLabels.YES,
        value: FirstFieldValues.YES
      },
      {
        label: FirstStepLabels.NO,
        value: FirstFieldValues.NO
      }
    ]
  },
  {
    id: 6,
    label: FirstStepLabels.FACULTATED_USER,
    placeholder: 'Selecciona una opción...',
    type: FormType.SELECT,
    span: 12,
    icon: UserAddOutlined,
    className: 'custom-select-comp',
    name: FirstFieldNames.FACULTATED_USER,
    dependsOn: {
      field: FirstFieldNames.REPORT_TYPE,
      value: FirstFieldValues.BUSINESS
    },
    options: [
      {
        label: FirstStepLabels.YES,
        value: FirstFieldValues.YES
      },
      {
        label: FirstStepLabels.NO,
        value: FirstFieldValues.NO
      }
    ]
  }
]
export const secondForm = [
  {
    id: 1,
    label: SecondStepLabels.CURP,
    placeholder: 'EJ. PIRN850201MOCMDY05',
    type: FormType.INPUT_BTN,
    span: 24,
    icon: UserAddOutlined,
    name: SecondFieldNames.CURP,
    buttonText: SecondFieldValues.VALIDATE_CURP,
    maxLength: 18,
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }
  },
  {
    id: 2,
    label: SecondStepLabels.FIRST_NAME,
    placeholder: 'Nombre',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.FIRST_NAME,
    isDisabled: true,
  },
  {
    id: 3,
    label: SecondStepLabels.SECOND_NAME,
    placeholder: 'Segundo nombre',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.SECOND_NAME,
    isDisabled: true,
  },
  {
    id: 4,
    label: SecondStepLabels.LAST_NAME,
    placeholder: 'Apellido paterno',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.LAST_NAME,
    isDisabled: true,
  },
  {
    id: 5,
    label: SecondStepLabels.SECOND_LAST_NAME,
    placeholder: 'Apellido materno',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.SECOND_LAST_NAME,
    isDisabled: true,
  },
  {
    id: 6,
    label: SecondStepLabels.BIRTH_DATE,
    placeholder: 'Fecha de nacimiento',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.BIRTH_DATE,
    isDisabled: true,
  },
  {
    id: 7,
    label: SecondStepLabels.RFC,
    placeholder: 'RFC',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.RFC,
    isDisabled: true,
  },
  {
    id: 8,
    label: SecondStepLabels.CP,
    placeholder: 'Ej. 16655',
    type: FormType.INPUT_BTN,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.CP,
    buttonText: SecondFieldValues.SEARCH_CP,
    maxLength: 5,
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
  },
  {
    id: 9,
    label: SecondStepLabels.PROVINCE,
    placeholder: 'Esperando datos de código postal...',
    type: FormType.SELECT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.PROVINCE,
    isDisabled: true,
    options: []
  },
  {
    id: 10,
    label: SecondStepLabels.ADDRESS,
    placeholder: 'Escriba la calle, numero interior y exterior',
    type: FormType.TEXT,
    span: 24,
    icon: UserAddOutlined,
    name: SecondFieldNames.ADDRESS,
  },
  {
    id: 11,
    label: SecondStepLabels.CITY,
    placeholder: 'Municipio',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.CITY,
    isDisabled: true,
  },
  {
    id: 12,
    label: SecondStepLabels.STATE,
    placeholder: 'Estado',
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: SecondFieldNames.STATE,
    isDisabled: true,
  },
  {
    id: 13,
    label: SecondStepLabels.SERVICE_CAL,
    type: FormType.BUTTON,
    span: 24,
    icon: UserAddOutlined,
    name: SecondFieldNames.SERVICE_CAL,
    options: [
      {
        label: SecondFieldValues.USE_CAL,
        value: SecondFieldValues.USE_CAL,
        icon: UserAddOutlined
      },
      {
        label: SecondFieldValues.DONT_USE_CAL,
        value: SecondFieldValues.DONT_USE_CAL,
        icon: UserAddOutlined
      },
    ]
  },
]
export const thirdForm = [
  {
    id: 1,
    label: ThirdStepLabels.ID_VALID,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.ID_VALID,
    options: [
      {
        label: ThirdFieldValues.YES,
        value: ThirdFieldValues.YES,
        icon: UserAddOutlined
      },
      {
        label: ThirdFieldValues.NO,
        value: ThirdFieldValues.NO,
        icon: UserAddOutlined
      }
    ]
  },
  {
    id: 2,
    label: ThirdStepLabels.SIGNATURE,
    placeholder: 'test',
    type: FormType.BUTTON,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.SIGNATURE,
    options: [
      {
        label: ThirdFieldValues.YES,
        value: ThirdFieldValues.YES,
        icon: UserAddOutlined
      },
      {
        label: ThirdFieldValues.NO,
        value: ThirdFieldValues.NO,
        icon: UserAddOutlined
      }
    ]
  },
  {
    id: 3,
    label: ThirdStepLabels.AUTH_REQUIRED,
    type: FormType.DISPLAY,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.AUTH_REQUIRED,
    valueText: ThirdStepLabels.AUTH_REQUIRED,
    displayIcon: InfoCircleOutlined,
    dependsOn: {
      field: ThirdFieldNames.ID_VALID,
      value: ThirdFieldValues.NO
    }
  },
  {
    id: 4,
    label: ThirdStepLabels.AUTH_QUESTIONNAIRE,
    type: FormType.DISPLAY,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.AUTH_QUESTIONNAIRE,
    valueText: ThirdStepLabels.AUTH_QUESTIONNAIRE,
    displayIcon: InfoCircleOutlined,
    dependsOn: {
      field: ThirdFieldNames.SIGNATURE,
      value: ThirdFieldValues.NO
    }
  },
  {
    id: 5,
    label: ThirdStepLabels.CREDIT_CARD,
    placeholder: 'test',
    type: FormType.TEXT,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.CREDIT_CARD,
    dependsOn: {
      field: ThirdFieldNames.ID_VALID,
      value: ThirdFieldValues.NO
    }
  },
  {
    id: 6,
    label: ThirdStepLabels.ADDITIONAL_CREDIT,
    placeholder: 'test',
    type: FormType.TEXT,
    span: 24,
    icon: UserAddOutlined,
    name: ThirdFieldNames.ADDITIONAL_CREDIT,
    dependsOn: {
      field: ThirdFieldNames.SIGNATURE,
      value: ThirdFieldValues.NO
    }
  },
]
export const fourthForm = [
  {
    id: 1,
    label: FourthStepLabels.RCE,
    type: FormType.SELECT,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.RCE,
    options: [
      {
        label: FourthFieldValues.OFFICE,
        value: FourthFieldValues.OFFICE,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.MESSAGING,
        value: FourthFieldValues.MESSAGING,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.EMAIL,
        value: FourthFieldValues.EMAIL,
        icon: UserAddOutlined
      }
    ]
  },
  {
    id: 2,
    label: FourthStepLabels.COST_CRITERIA,
    type: FormType.SELECT,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.COST_CRITERIA,
    options: [
      {
        label: FourthFieldValues.CONDUSEF,
        value: FourthFieldValues.CONDUSEF,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.CC,
        value: FourthFieldValues.CC,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.BURO,
        value: FourthFieldValues.BURO,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.PRE_FOLIO,
        value: FourthFieldValues.PRE_FOLIO,
        icon: UserAddOutlined
      }
    ]
  },
  {
    id: 3,
    label: FourthStepLabels.IMPORT,
    type: FormType.DISPLAY,
    span: 24,
    icon: UserAddOutlined,  
    name: FourthFieldNames.IMPORT,
    valueText: FourthFieldValues.IMPORT_VALUE,
  },
  {
    id: 4,
    label: FourthStepLabels.PAYMENT_VIA,
    type: FormType.BUTTON,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.PAYMENT_VIA,
    options: [
      {
        label: FourthFieldValues.DEPOSIT,
        value: FourthFieldValues.DEPOSIT,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.TERMINAL,
        value: FourthFieldValues.TERMINAL,
        icon: UserAddOutlined
      },
    ]
  },
  {
    id: 5,
    label: FourthStepLabels.BANK,
    type: FormType.SELECT,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.BANK,
    options: [
      {
        label: FourthFieldValues.BANAMEX,
        value: FourthFieldValues.BANAMEX,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.BBVA,
        value: FourthFieldValues.BBVA,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.SANTANDER,
        value: FourthFieldValues.SANTANDER,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.BANORTE,
        value: FourthFieldValues.BANORTE,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.HSBC,
        value: FourthFieldValues.HSBC,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.AZTECA,
        value: FourthFieldValues.AZTECA,
        icon: UserAddOutlined
      }
    ]
  },
  {
    id: 6,
    label: FourthStepLabels.FOLIO,
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.FOLIO,
  },
  {
    id: 7,
    label: FourthStepLabels.LOCATION,
    type: FormType.TEXT,
    span: 12,
    icon: UserAddOutlined,
    name: FourthFieldNames.LOCATION,
  },
  {
    id: 8,
    label: FourthStepLabels.CFDI,
    type: FormType.BUTTON,
    span: 24,
    icon: UserAddOutlined,
    name: FourthFieldNames.CFDI,
    options: [
      {
        label: FourthFieldValues.YES,
        value: FourthFieldValues.YES,
        icon: UserAddOutlined
      },
      {
        label: FourthFieldValues.NO,
        value: FourthFieldValues.NO,
        icon: UserAddOutlined
      }
    ]
  },
]
export const stepForms = [firstForm, secondForm, thirdForm]
