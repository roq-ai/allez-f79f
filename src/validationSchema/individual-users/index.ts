import * as yup from 'yup';

export const individualUserValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
});
