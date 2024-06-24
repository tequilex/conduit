import { useEffect, useState } from "react";
import { FormButton } from "../../shared/ui/FormButton";
import { FormField } from "../../shared/ui/FormField";
import { User } from "../../shared/utils/types";
import styles from "./styles.module.scss";
import { useStores } from "../../app/RootStore.context";
import { updateProfile } from "../../features/profile/UpdateProfile/api/updateProfile";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  image: "",
  bio: "",
};

export function FormSettings() {
  const {userStore: {user, setUser}} = useStores()
  const [formFields, setFormFields] = useState<User>(defaultFormFields);
  const { image, username, email, bio } = formFields;

  useEffect(() => {
    if(!user) return
    setFormFields(user)
  }, [user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile(formFields)
    .then(response => response.json())
    .then(response => setUser(response.user))
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
