import { authFetch } from '../../../../shared/api/apiAuth';

interface FormFieldsProps {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const createArticle = (formFields: FormFieldsProps) => {
  return authFetch('/articles', {
    body: JSON.stringify({ article: formFields }),
    method: 'POST',
  });
};
