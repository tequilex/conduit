import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import { CommentCard } from '../../../entities/comment/ui';
import { CommentFooter } from '../../../shared/ui/CommentFooter';
import { FaTrashCan } from 'react-icons/fa6';
import styles from './styles.module.scss';
import { useStores } from '../../../app/RootStore.context';
import { Comment } from '../../../shared/utils/types';
import { createComment } from '../../../features/comment/createComment/api/createComment';
import { deleteComment } from '../../../features/comment/deleteComment/api/deleteComment';
import { observer } from 'mobx-react-lite';

interface CommentFormValues {
  body: string;
}

interface FormCommentProps {
  slug?: string;
}

const FormCreateComment = observer(({ slug }: FormCommentProps) => {
  const {
    userStore: { user },
    commentsStore: { comments, setComments, fetchComments, cleanComments },
  } = useStores();

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      body: '',
    },
  });

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
    resetField('body');
  };

  const submit = (data: CommentFormValues) => {
    if (!slug) return;
    createComment(slug, data)
      .then((response) => response.json())
      .then((response) => {
        setComments([response.comment, ...comments]), fieldReset();
      });
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
    <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
      <CommentCard
        body={
          <FormField
            {...register('body')}
            placeholder='Write your comment...'
            name='body'
          />
        }
        footer={
          <CommentFooter
            avatar={user?.image}
            button={<FormButton size='small' nameBut='Post comment' />}
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
