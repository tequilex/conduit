import { authFetch } from '../../../../shared/api/apiAuth';

interface FormFieldsProps {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const updateArticle = (slug: string, formFields: FormFieldsProps) => {
  return authFetch(`/articles/${slug}`, {
    body: JSON.stringify({ article: formFields }),
    method: 'PUT',
  });
};
