import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../entities/User/user.context";
import { FormField } from "../../shared/ui/FormField";
import { FormButton } from "../../shared/ui/FormButton";
import { authFetch } from "../../shared/api/apiAuth";
import styles from "./styles.module.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export function FormSignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    authFetch("/users/login", {
      body: JSON.stringify({ user: formFields }),
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }
        return response.json();
      })
      .then((response) => {
        setUserData(response.user), navigate("/");
      })
      .catch(() => alert("что то пошло не так"));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <FormField
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
        />
        <FormField
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <FormButton size='big' nameBut="Sign in" />
      </form>
    </div>
  );
}
