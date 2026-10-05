import { ComponentType, Dispatch, SetStateAction } from "react";
import {
  FirstFieldValues,
  SecondFieldValues,
  ThirdFieldValues,
  FourthFieldValues,
  FormType
} from "./enums";
import { Rule } from "antd/es/form";

export type FormOptions = FirstFieldValues | SecondFieldValues | ThirdFieldValues | FourthFieldValues | string
export type DependencyCondition = {
  field: string,
  value?: FormOptions,
  values?: any[],
  hasValue?: boolean,
  condition?: (selectedValue: any, parentValue?: Record<string, any>) => boolean
}
interface OptionItem<T = FormOptions> {
  label: string;
  value: T;
  icon?: ComponentType<any>;
  isComplex?: boolean;
  onClick?: (setterField: (field: string, value: any) => void) => void;
}
export type FormValues = {
  id: number,
  label: string,
  name: string,
  placeholder?: string,
  className?: string,
  buttonClassName?: string,
  span?: number,
  icon: ComponentType<any>,
  options?: OptionItem[],
  style?: React.CSSProperties,
  isDisabled?: boolean,
  valueText?: string,
  buttonText?: string,
  onButtonClick?: (value: any, setterField?: (field: string, newVal: any) => void) => void,
  displayIcon?: ComponentType<any>,
  type: FormType,
  maxLength?: number,
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  rules?: Rule[],
  dependsOn?: DependencyCondition
}
export type FormState = FormOptions | undefined
export type FormSetter = Dispatch<SetStateAction<any>> | undefined
export interface ModalData {
  title?: string;
  children: React.ReactNode;
  activeModal?: {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  headerComponent?: JSX.Element;
  footerComponent?: JSX.Element;
  noHeader?: boolean;
  noFooter?: boolean;
  onAccept?: () => void;
}
export type SubTabsInfo<T> = {
  id: T;
  name: string;
  icon?: ComponentType<any>;
}[]
export interface SubTabsProps<T>{
  subTabActual: T
  classNames?: string
  tabs: SubTabsInfo<T>
  setTab: React.Dispatch<React.SetStateAction<T>>
}

export type FirstFormValues = {
  reportType: string,
  personType: string,
  receptionChannel: string,
  officeClassification: string,
}
export type StepOneComplements = {
  consultant: string,
  userKey: string,
  facultatedUser: string,
}
export type SecondFormValues = {
  curp: string,
  firstName: string,
  secondName: string,
  lastName: string,
  secondLastName: string,
  birthDate: string,
  rfc: string,
  cp: string,
  province: string,
  address: string,
  city: string,
  state: string,
  serviceCal: string,
}
export type ThirdFormValues = {
  idValid: string,
  signature: string,
  authRequired: string,
  authQuestionnaire: string,
  creditCard: string,
  additionalCredit: string,
}
export type FourthFormValues = {
  rce: string,
  costCriteria: string,
  import: string,
  paymentVia: string,
  bank: string,
  folio: string,
  location: string,
  cfdi: string,
}

export interface FirstStepPayload {
  cveUsuario: string,
  tipoReporteEspecial: string,
  tipoPersona: string,
  medioRecepcion: string,
  clasificacionOficina: string
}
export interface SecondStepPayload {
  cveReporte: string,
  cveUsuario: string,
  curp: string,
  primerNombre: string,
  segundoNombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  fechaNacimiento: string,
  rfc: string,
  codigoPostal: string,
  colonia: string,
  direccionCompleta: string,
  municipioAlcaldia: string,
  estadoEntidadFederativa: string,
  incluyeMiCalificate: string,
}
export interface ThirdStepPayload {
  cveReporte: string,
  cveUsuario: string,
  identificacionOficialVigente: string,
  firmaAutografaIdentica: string,
  otorganteTarjetaCredito: string,
  bancoCreditoHipotecario: string,
}
export interface FourthStepPayload {
  cveReporte: string,
  cveUsuario: string,
  viaEnvioRce: string,
  criterioCosto: string,
  importeSolicitud: string,
  modalidadCobro: string,
  institucionBancaria: string,
  folioClaveOperacion: string,
  sucursalRegistro: string,
  solicitaCfdi: string,
}