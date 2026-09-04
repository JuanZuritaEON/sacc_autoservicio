import { ComponentType, Dispatch, SetStateAction } from "react";
import {
  FirstFieldValues,
  SecondFieldValues,
  ThirdFieldValues,
  FourthFieldValues
} from "./enums";
import { Rule } from "antd/es/form";

export type FormOptions = FirstFieldValues | SecondFieldValues | ThirdFieldValues | FourthFieldValues
interface OptionItem<T = FormOptions> {
  label: string;
  value: T;
  icon?: ComponentType<any>;
}
export type FormValues = {
  id: number,
  label: string,
  name: string,
  placeholder?: string,
  className?: string,
  span?: number,
  icon: ComponentType<any>,
  options?: OptionItem[],
  style?: React.CSSProperties,
  isDisabled?: boolean,
  valueText?: string,
  buttonText?: string;
  onButtonClick?: (value: any) => void;
  displayIcon?: ComponentType<any>,
  type: 'button' | 'select' | 'text' | 'number' | 'input-btn' | 'display',
  maxLength?: number,
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  rules?: Rule[],
  dependsOn?: {
    field: string;
    value: FormOptions;
  }
}
export type FormState = FormOptions | undefined
export type FormSetter = Dispatch<SetStateAction<any>> | undefined

export type FirstFormValues = {
  reportType: string,
  personType: string,
  receptionChannel: string,
  officeClassification: string,
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
  clasificacionOficina: string,
  usuarioFacultado: string,
  claveUsuario: string,
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