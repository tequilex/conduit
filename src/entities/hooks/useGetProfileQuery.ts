import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Profile } from "../../shared/utils/types";
import { authFetch } from "../../shared/api/apiAuth";

const useGetProfileQuery = (username?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      return;
    }

    authFetch(`/profiles/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }
      return response.json();
    })
    .then((data) => setProfile(data.profile))
    .catch(() => navigate("/"))
  }, [username])

  return profile

}

export default useGetProfileQuery