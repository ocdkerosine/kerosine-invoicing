import { required } from "vuelidate/lib/validators";

export const FormValidation = {
  validations: {
    invoiceForm: {
      address: {
        address: {
          required,
        },
        city: {
          required,
        },
        postCode: {
          required,
        },
        country: {
          required,
        },
      },
      clientName: {
        required,
      },
      clientEmail: {
        required,
      },
      clientAdress: {
        address: {
          required,
        },
        city: {
          required,
        },
        postCode: {
          required,
        },
        country: {
          required,
        },
      },
      projectDesc: {
        required,
      },
      projects: {
        required,
      },
    },
  },
};
