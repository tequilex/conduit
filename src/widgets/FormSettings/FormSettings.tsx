import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../entities/User/user.context";
import { FormButton } from "../../shared/ui/FormButton";
import { FormField } from "../../shared/ui/FormField";
import { authFetch } from "../../shared/api/apiAuth";
import styles from "./styles.module.scss";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  image: "",
  bio: "",
};

export function FormSettings() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { image, username, email, bio } = formFields;
  const {setUserData} = useContext(UserContext)

  useEffect(() => {
    authFetch("/user")
      .then((response) => response.json())
      .then((response) => setFormFields(response.user));
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    authFetch('/user', {
      body: JSON.stringify({user: formFields}),
      method: 'PUT'
    })
    .then(response => response.json())
    .then(response => setUserData(response.user))
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <FormField
          onChange={handleChange}
          placeholder="Url of profile picture"
          value={image || ""}
          type="text"
          name="image"
        />
        <FormField
          onChange={handleChange}
          placeholder="Username"
          value={username || ""}
          type="text"
          name="username"
        />
        <FormField
          className={styles.textarea}
          placeholder="Short bio about you"
          value={bio || ""}
          onChange={handleChange}
          name="bio"
        />
        <FormField
          onChange={handleChange}
          placeholder="Email"
          value={email || ""}
          type="email"
          name="email"
        />
        <FormField
          onChange={handleChange}
          placeholder="New password"
          type="password"
          name="password"
        />
        <FormButton size="big" nameBut="Update setting" />
      </form>
    </div>
  );
}
