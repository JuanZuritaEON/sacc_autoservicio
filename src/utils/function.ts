import React from 'react';
import { FirstFormValues, FirstStepPayload, FourthFormValues, FourthStepPayload, SecondFormValues, SecondStepPayload, ThirdFormValues, ThirdStepPayload } from "../interface";
import { toast } from 'react-toastify';

export const calcPercentage = (
  totalValues: number,
  formValues: Record<string, any> = {}
): number => {
  if (!totalValues || totalValues <= 0) return 0
  const {id, ...rest} = formValues
  const filledValues = Object.values(rest).filter((valor) => {
    if (typeof valor === 'string') return valor.trim() !== '';
    if (Array.isArray(valor)) return valor.length > 0;
    return valor !== undefined && valor !== null;
  }).length

  const percentage = Math.round((filledValues / totalValues) * 100)
  return Math.min(percentage, 100)
}

const stepMappers: Record<number, (data: unknown, reportId?: number) => unknown> = {
  0: (data) => {
    const values = data as FirstFormValues;
    return {
      cveUsuario: "test",
      tipoReporteEspecial: values.reportType,
      tipoPersona: values.personType,
      medioRecepcion: values.receptionChannel,
      clasificacionOficina: values.officeClassification,
      usuarioFacultado: values.facultatedUser,
      claveUsuario: values.userKey,
    } satisfies FirstStepPayload;
  },
  1: (data, reportId) => {
    const values = data as SecondFormValues;
    return {
      cveReporte: reportId?.toString() || '',
      cveUsuario: 'test',
      curp: values.curp,
      primerNombre: values.firstName,
      segundoNombre: values.secondName,
      apellidoPaterno: values.lastName,
      apellidoMaterno: values.secondLastName,
      fechaNacimiento: values.birthDate,
      rfc: values.rfc,
      codigoPostal: values.cp,
      colonia: values.province,
      direccionCompleta: values.address,
      municipioAlcaldia: values.city,
      estadoEntidadFederativa: values.state,
      incluyeMiCalificate: values.serviceCal.slice(0, 2),
    } satisfies SecondStepPayload;
  },
  2: (data, reportId) => {
    const values = data as ThirdFormValues;
    return {
      cveReporte: reportId?.toString() || '',
      cveUsuario: 'test',
      identificacionOficialVigente: values.idValid,
      firmaAutografaIdentica: values.signature,
      otorganteTarjetaCredito: values.creditCard,
      bancoCreditoHipotecario: values.additionalCredit,
    } satisfies ThirdStepPayload;
  },
  3: (data, reportId) => {
    const values = data as FourthFormValues;
    return {
      cveReporte: reportId?.toString() || '',
      cveUsuario: 'test',
      viaEnvioRce: values.rce,
      criterioCosto: values.costCriteria,
      importeSolicitud: values.import,
      modalidadCobro: values.paymentVia,
      institucionBancaria: values.bank,
      folioClaveOperacion: values.folio,
      sucursalRegistro: values.location,
      solicitaCfdi: values.cfdi,
    } satisfies FourthStepPayload;
  }
}

export const formatStepPayload = (stepId: number, stepData: unknown, reportId?: number) => {
  const mapper = stepMappers[stepId];
  if (!mapper) throw new Error(`El step es incorrecto: ${stepId}`);
  return mapper(stepData, reportId);
}

export const sendToastMessage = ({
  position = "top-right",
  message,
  type,
  theme = 'colored',
  hideProgressBar = true,
  closeButton = true,
  closeOnClick = true,
  closeTimer,
  progress,
  optionalComponent,
  icon,
}: {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  message?: string;
  type: 'error' | 'success' | 'warning' | 'info';
  theme?: 'colored' | 'light' | 'dark'
  hideProgressBar?: boolean
  closeButton?: boolean
  closeOnClick?: boolean
  closeTimer?: number;
  progress?: number;
  optionalComponent?: React.ReactNode;
  icon?: React.ReactNode
}) => {
  let responseMessage = optionalComponent ?? message
  return toast[type](responseMessage, {
    position,
    autoClose: closeTimer ?? false,
    hideProgressBar: hideProgressBar,
    closeButton: closeButton,
    closeOnClick: closeOnClick,
    pauseOnHover: false,
    draggable: false,
    progress,
    theme,
    icon
  })
}

export const sendAppError = (e: unknown) => {
  let error
  if (typeof e === "string") {
      error = e
  } else if (e instanceof Error) {
      error = e.message
  }
  return sendToastMessage({ type: 'error', message: error })
}