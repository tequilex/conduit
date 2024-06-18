import { useEffect, useState } from "react";
import { authFetch } from "../../shared/api/apiAuth";

const useGetTagsQuery = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    authFetch('/tags')
      .then((response) => response.json())
      .then((data) => setTags(data.tags));
  }, []);

  return tags
}

export default useGetTagsQuery