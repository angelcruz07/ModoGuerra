import { Input } from "../forms/Input";
import { useForm } from "react-hook-form";
import { actions } from "astro:actions";

interface CommentFormProps {
  content: string;
  postId: string;
}

interface Props {
  postId: string;
  userId: string;
  parentId?: string;
  replies?: string;
}

export const CommentForm = ({ postId, userId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CommentFormProps>();

  const onSubmit = async (data: CommentFormProps) => {
    console.log(userId);
    if (userId === null) {
      alert("Necesitas authenticarte para poder comentar");
      return;
    }

    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("userId", userId);
    formData.append("postId", postId);

    const { error } = await actions.comment.createUpdateComment(formData);

    if (!error) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between gap-x-5"
    >
      <Input className="w-full" name="content" register={register} />
      <button
        disabled={!isValid}
        type="submit"
        className="bg-secondary w-20 rounded-md text-white"
      >
        Enviar
      </button>
    </form>
  );
};
