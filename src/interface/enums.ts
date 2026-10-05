export enum Labels {
  STEP_1 = 'Parametros',
  STEP_2 = 'Cliente',
  STEP_3 = 'Validacion',
  STEP_4 = 'Despacho',
  STEP_5 = 'Estatus',
  ERROR_CODE = 'Codigo de error',
}
export enum FormType {
  BUTTON = 'button',
  SELECT = 'select',
  TEXT = 'text',
  NUMBER = 'number',
  INPUT_BTN = 'input-btn',
  SELECT_BTN = 'select-btn',
  DISPLAY = 'display',
}

//// Steps Labels
export enum FirstStepLabels {
  TITLE = 'Solicitud de reporte',
  DESCRIPTION = 'Defina el tipo de reporte solicitado y la via de recepcion correspondiente.',
  //// Fields
  REPORT_TYPE = 'Tipo de Reporte Especial',
  PERSON_TYPE = 'Tipo de Persona',
  RECEPTION_CHANNEL = 'Canal / Medio de Recepcion',
  OFFICE_CLASSIFICATION = 'Clasificacion de oficina',
  USER_KEY = 'Clave de Usuario',
  FACULTATED_USER = 'Funcionario Facultado',
  CONSUMER = 'Consumidor',
  BUSINESS = 'Otorgante',
  FISICA = 'Persona Fisica',
  MORAL = 'Persona Moral',
  OFFICE = 'Oficina',
  MESSAGING = 'Mensajeria',
  EMAIL = 'Email',
  PHONE = 'Telefono',
  WHATSAPP = 'Whatsapp',
  WINDOW = 'Ventanilla',
  CC = 'CC / TU',
  CONDUSEF = 'Condusef',
  YES = 'Si',
  NO = 'No',
}
export enum FirstFieldNames {
  CONSULTANT = 'consultant',
  REPORT_TYPE = 'reportType',
  PERSON_TYPE = 'personType',
  RECEPTION_CHANNEL = 'receptionChannel',
  OFFICE_CLASSIFICATION = 'officeClassification',
  USER_KEY = 'userKey',
  FACULTATED_USER = 'facultatedUser',
}
export enum FirstFieldValues {
  CONSULTANT = 'Consultant',
  CONSUMER = 'Consumidor',
  BUSINESS = 'Otorgante',
  FISICA = 'Persona Fisica',
  MORAL = 'Persona Moral',
  OFFICE = 'Oficina',
  MESSAGING = 'Mensajeria',
  EMAIL = 'Email',
  PHONE = 'Telefono',
  WHATSAPP = 'Whatsapp',
  WINDOW = 'Ventanilla',
  CC = 'CC / TU',
  CONDUSEF = 'Condusef',
  YES = 'Si',
  NO = 'No',
}

export enum SecondStepLabels {
  TITLE = 'Informacion General del Solicitante',
  DESCRIPTION = 'Sincronizacion automatizada con RENAPO y SEPOMEX.',
  //// Fields
  CURP = 'Clave Unica de Registro de Poblacion',
  FIRST_NAME = 'Primer Nombre',
  SECOND_NAME = 'Segundo Nombre',
  LAST_NAME = 'Apellido Paterno',
  SECOND_LAST_NAME = 'Apellido Materno',
  BIRTH_DATE = 'Fecha de Nacimiento',
  RFC = 'RFC Calculado',
  CP = 'Codigo Postal',
  PROVINCE = 'Colonia',
  ADDRESS = 'Direccion Completa (Calle y Numeros)',
  CITY = 'Municipio o Alcaldia',
  STATE = 'Estado / Entidad Federativa',
  SERVICE_CAL = '¿Desea anexar el servicio de Mi Calificate?'
}
export enum SecondFieldNames {
  CURP = 'curp',
  FIRST_NAME = 'firstName',
  SECOND_NAME = 'secondName',
  LAST_NAME = 'lastName',
  SECOND_LAST_NAME = 'secondLastName',
  BIRTH_DATE = 'birthDate',
  RFC = 'rfc',
  CP = 'cp',
  PROVINCE = 'province',
  ADDRESS = 'address',
  CITY = 'city',
  STATE = 'state',
  SERVICE_CAL = 'serviceCal',
}
export enum SecondFieldValues {
  VALIDATE_CURP = 'Validar CURP',
  SEARCH_CP = 'Buscar CP',
  USE_CAL = 'Si, incluir Calificate',
  DONT_USE_CAL = 'No, omitir Calificate',
}

export enum ThirdStepLabels {
  TITLE = 'Mesa de Validacion y Controles Antifraude',
  DESCRIPTION = 'Contejo normativo obligatorio para autorizar la apertura de datos crediticios.',
  //// Fields
  ID_VALID = '¿Se identifico correctamente con ID Oficial vigente?',
  SIGNATURE = '¿La solicitud cuenta con Firma Autografa Identica?',
  AUTH_REQUIRED = 'Autenticacion obligatoria: Al no contar con confirmacion total de expediente (ID o Firma faltante), es obligatorio aplicar el cuestionario del historial crediticio del Buro.',
  AUTH_QUESTIONNAIRE = 'Preguntas de Autenticacion Obligatorias: Responda el cuestionario normativo para validar el historial en el Buro del cliente.',
  CREDIT_CARD = '¿Posee alguna Tarjeta de Credito Activa / Credito Comercial Activo?',
  ADDITIONAL_CREDIT = '¿Tiene o ha tenido un Credito Hipotecario / Financiamiento Activo?',
}
export enum ThirdFieldNames {
  ID_VALID = 'idValid',
  SIGNATURE = 'signature',
  AUTH_REQUIRED = 'authRequired',
  AUTH_QUESTIONNAIRE = 'authQuestionnaire',
  CREDIT_CARD = 'creditCard',
  ADDITIONAL_CREDIT = 'additionalCredit',
}
export enum ThirdFieldValues {
  YES = 'Si',
  NO = 'No',
}

export enum FourthStepLabels {
  TITLE = 'Datos de Despacho y Registro Financiero',
  DESCRIPTION = 'Indique la modalidad de entrega del RCE y aplique los tabuladores de pago correspondientes.',
  //// Fields
  RCE = 'Via de Envio del RCE',
  COST_CRITERIA = 'Criterio de Costo',
  IMPORT = 'Importe de la Solicitud:',
  PAYMENT_VIA = 'Modalidad de Cobro',
  BANK = 'Institucion Bancaria',
  FOLIO = 'Folio o Clave de Operacion',
  LOCATION = 'Sucursal de Registro',
  CFDI = '¿El cliente solicita Comprobante Fiscal Digital (CFDI)?',
}
export enum FourthFieldNames {
  RCE = 'rce',
  COST_CRITERIA = 'costCriteria',
  IMPORT = 'import',
  PAYMENT_VIA = 'paymentVia',
  BANK = 'bank',
  FOLIO = 'folio',
  LOCATION = 'location',
  CFDI = 'cfdi',
}
export enum FourthFieldValues {
  OFFICE = 'Oficina',
  EMAIL = 'Email',
  MESSAGING = 'Servicio de mensajeria especializada',
  CONDUSEF = 'Condusef',
  CC = 'Aclaracion CC',
  BURO = 'Aclaracion por Buro',
  PRE_FOLIO = 'Prefolio (Pendiente de pago)',
  IMPORT_VALUE = '100',
  DEPOSIT = 'Deposito',
  TERMINAL = 'Terminal',
  BANAMEX = 'BANAMEX',
  BBVA = 'BBVA',
  SANTANDER = 'SANTANDER',
  BANORTE = 'BANORTE',
  HSBC = 'HSBC',
  AZTECA = 'AZTECA',
  YES = 'Si',
  NO = 'No',
}