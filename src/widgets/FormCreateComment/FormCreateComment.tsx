import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../entities/User/user.context";
import { FormButton } from "../../shared/ui/FormButton";
import { FormField } from "../../shared/ui/FormField";
import { authFetch } from "../../shared/api/apiAuth";
import { CommentCard } from "../../entities/CommentCard";
import { CommentFooter } from "../../shared/ui/CommentFooter";
import { FaTrashCan } from "react-icons/fa6";
import styles from "./styles.module.scss";

interface FormCommentProps {
  slug?: string;
}

interface Comment {
  id: number;
  body: string;
  createdAt: string
  author: {
    username: string;
    image: string;
  };
}

export function FormCreateComment({ slug }: FormCommentProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [bodyComment, setBodyComment] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    authFetch(`/articles/${slug}/comments`)
      .then((response) => response.json())
      .then((response) => setComments(response.comments));
  }, [slug]);

  const fieldReset = () => {
    setBodyComment("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authFetch(`/articles/${slug}/comments`, {
      body: JSON.stringify({ comment: { body: bodyComment } }),
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        setComments([response.comment, ...comments]), fieldReset();
      });
  };

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { value } = e.target;
    setBodyComment(value);
  };

  const handleDelete = (id: number) => {
    authFetch(`/articles/${slug}/comments/${id}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    });
};

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <CommentCard
        body={
          <FormField placeholder="Write your comment..." value={bodyComment} onChange={handleChange} name="body" />
        }
        footer={
          <CommentFooter
            avatar={user?.image}
            button={<FormButton size="small" nameBut="Post comment" />}
          />
        }
      />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          body={<div className={styles.body}>{comment.body}</div>}
          footer={
            <CommentFooter
              button={<FaTrashCan className={styles.deleteButton} onClick={() => handleDelete(comment.id)} />}
              avatar={comment.author.image}
              username={comment.author.username}
              date={comment.createdAt}
            />
          }
        />
      ))}
    </form>
  );
}
