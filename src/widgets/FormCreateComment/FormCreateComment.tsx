import { useEffect, useState } from "react";
import { FormButton } from "../../shared/ui/FormButton";
import { FormField } from "../../shared/ui/FormField";
import { CommentCard } from "../../entities/comment/ui";
import { CommentFooter } from "../../shared/ui/CommentFooter";
import { FaTrashCan } from "react-icons/fa6";
import styles from "./styles.module.scss";
import { useStores } from "../../app/RootStore.context";
import { Comment } from "../../shared/utils/types";
import { createComment } from "../../features/comment/CreateComment/api/createComment";
import { deleteComment } from "../../features/comment/DeleteComment/api/deleteComment";
import { observer } from "mobx-react-lite";

interface FormCommentProps {
  slug?: string;
}

const FormCreateComment = observer(({ slug }: FormCommentProps) => {
  const [bodyComment, setBodyComment] = useState("");
  const {
    userStore: { user },
    commentsStore: { comments, setComments, fetchComments, cleanComments },
  } = useStores();

  const isCreater = (commentUser: Comment) => {
    if (user?.username === commentUser.author.username)
      return (
        <FaTrashCan
          className={styles.deleteButton}
          onClick={() => handleDelete(commentUser.id)}
        />
      );
    if (user?.username !== commentUser.author.username) return null;
  };

  useEffect(() => {
    if (!slug) return;
    fetchComments(slug);
    return () => {
      cleanComments();
    };
  }, [slug, fetchComments, cleanComments]);

  const fieldReset = () => {
    setBodyComment("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slug) return;
    createComment(slug, bodyComment)
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
    if (!slug) return;
    deleteComment(slug, id)
      .then((response) => response.json())
      .then(() => {
        setComments(comments.filter((comment: Comment) => comment.id !== id));
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <CommentCard
        body={
          <FormField
            placeholder="Write your comment..."
            value={bodyComment}
            onChange={handleChange}
            name="body"
          />
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
              button={isCreater(comment)}
              avatar={comment.author.image}
              username={comment.author.username}
              date={comment.createdAt}
            />
          }
        />
      ))}
    </form>
  );
});

export default FormCreateComment;
