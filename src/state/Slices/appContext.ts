import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  appFluxContext: {
    currentStep: 0,
    reportId: 0,
    totalValues: 0,
    percentage: 0,
    maxStepReach: 0,
    steps: [
      { 
        id: 0,
        reportType: '',
        personType: '',
        userKey: '',
        facultatedUser: '',
        receptionChannel: '',
        officeClassification: '',
      },
      {
        id: 1,
        curp: '',
        firstName: '',
        secondName: '',
        lastName: '',
        secondLastName: '',
        birthDate: '',
        rfc: '',
        cp: '',
        province: '',
        address: '',
        city: '',
        state: '',
        serviceCal: ''
      },
      {
        id: 2,
        idValid: '',
        signature: '',
        creditCard: '',
        additionalCredit: ''
      },
      {
        id: 3,
        rce: '',
        costCriteria: '',
        paymentVia: '',
        bank: '',
        folio: '',
        location: '',
        cfdi: ''
      }
    ],
    liferayUser: {
      data: {
        nameUser: '',
        contexts: [{}],
        numOtorgante: '',
        permisos: [{}],
        token: '',
        userId: 0,
      },
      properties: {
        CDC_ID_AUD: '',
        CDC_SEC_AUD: '',
        CDC_URL_AUD: '',
        CDC_AWS_AUD: '',
        CDC_SPW_HDK: '',
        CDC_WAP_AUD: '',
        CDC_IFB_AUD: '',
        CDC_EKY_AUD: ''
      }
    },
    noInfoRequest: false,
    generalLoader: false,
  },
  errors: [{
    url: '',
    code: 0,
    message: '',
    active: false,
  }]
};

export const appContextSlice = createSlice({
  name: 'App Context State',
  initialState,
  reducers: {
    SAVE_APP_FLUX: (state, action) => {
      return {
        ...state,
        appFluxContext: {
          ...state.appFluxContext,
          ...action.payload
        }
      }
    },
    UPDATE_STEP_VALUES: (state, action: PayloadAction<{ stepId: number; data: any }>) => {
      const { stepId, data } = action.payload;
      const step = state.appFluxContext.steps.find((s) => s.id === stepId);
      
      if (step) {
        Object.assign(step, data);
      }
    },
    SAVE_ERRORS: (state, action) => {
      return {
        ...state,
        errors: action.payload
      }
    }
  }
})

export const { 
  SAVE_APP_FLUX,
  UPDATE_STEP_VALUES,
  SAVE_ERRORS
} = appContextSlice.actions;
export default appContextSlice.reducer;
