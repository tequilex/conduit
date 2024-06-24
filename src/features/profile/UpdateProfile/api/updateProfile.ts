import { authFetch } from "../../../../shared/api/apiAuth"

interface FormFieldsProps {
  username: string;
    email: string;
    password: string;
    image: string;
    bio: string;
}

export const updateProfile = (formFields: FormFieldsProps ) => {
  return authFetch('/user', {
    body: JSON.stringify({user: formFields}),
    method: 'PUT'
  })
}