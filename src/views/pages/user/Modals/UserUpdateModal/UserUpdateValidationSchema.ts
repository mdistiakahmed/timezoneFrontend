import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

export const USER_UPDATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    username: yup.string().email().required('Please enter username'),
    role: yup.string().required('Please select role'),
});
