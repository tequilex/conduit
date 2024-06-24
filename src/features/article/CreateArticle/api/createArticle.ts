import { authFetch } from "../../../../shared/api/apiAuth";

interface FormFieldsProps {
  title: string;
  description: string;
  body: string;
  tagList: never[];
}

export const createArticle = (formFields: FormFieldsProps) => {
  return authFetch("/articles", {
    body: JSON.stringify({ article: formFields }),
    method: "POST",
  });
};
