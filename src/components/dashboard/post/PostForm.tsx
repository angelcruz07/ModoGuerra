import { Input } from "@components/forms/Input";
import { type Category, type Post } from "@interfaces";
import MDEditor from "@uiw/react-md-editor";
import { actions } from "astro:actions";
import clsx from "clsx";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface PostFormData {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string | null;
  slug: string;
  tags: string[];
  categories: string[];
  userId: string;
}

interface Props {
  post?: Post;
  categories: Category[];
  userId: string;
}

export default function PostForm({
  categories,
  post: initialPost,
  userId,
}: Props) {
  const [content, setContent] = useState(initialPost?.content || "");
  const [post, setPost] = useState<Post | null>(initialPost || null);
  const [image, setImage] = useState<string | null>(initialPost?.image || null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    defaultValues: {
      ...post,
      categories: post?.categories.map((cat) => cat.id) || [],
    },
  });

  watch("categories");

  const onCategoryChange = (category: Category) => {
    const categories = new Set(getValues("categories"));
    categories.has(category.id)
      ? categories.delete(category.id)
      : categories.add(category.id);
    setValue("categories", Array.from(categories));
  };

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    data.content = content;
    data.userId = userId;

    const formData = new FormData();

    if (data.id) {
      formData.append("id", data.id);
    }

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("userId", data.userId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("tags", data.tags.toString());

    data.categories.forEach((categoryId) => {
      formData.append("categories", categoryId);
    });

    const { error } = await actions.post.createUpdatePost(formData);

    console.log("Form submission error:", error);
    if (!error) {
      alert("Post guardado con éxito!");
      window.location.replace("/dashboard/posts");
    }
  };

  const onClickDelete = async (postId: string) => {
    const { error } = await actions.post.deletePostImage({ postId });

    if (!error) {
      alert("Imagen eliminada con éxito!");
      setImage(null);
    }
    console.log("Delete image error:", error);
  };

  const isRequired =
    (!post?.id || post?.slug === "new") && image === null ? true : false;

  return (
    <section className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-4xl flex-col gap-y-5"
      >
        <Input name="title" label="Titulo del post" register={register} />

        <Input
          name="description"
          label="Descripción del post"
          register={register}
        />

        <MDEditor
          value={content}
          style={{ minHeight: 500, backgroundColor: "#130c25" }}
          onChange={(value) => setContent(value || "")}
          textareaProps={{
            placeholder: "Utiliza formato markdown",
          }}
        />

        <Input
          name="tags"
          label="Ingresa los tags (separados por una coma)"
          register={register}
        />

        <Input
          label="Cargar imagen"
          name="image"
          type="file"
          required={isRequired}
          register={register}
        />

        {image && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div key={post?.image}>
              <img
                alt={post?.title ?? ""}
                src={image}
                width={600}
                height={300}
                className="w-full rounded-t-xl shadow-md"
              />

              <button
                onClick={() => post?.id && onClickDelete(post.id)}
                type="button"
                className="w-full cursor-pointer rounded-b-xl bg-red-500 text-white"
                disabled={!post?.id}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <span>Categorias</span>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategoryChange(category)}
                className={clsx(
                  "cursor-pointer rounded-md border p-2 text-center transition-all",
                  {
                    "bg-secondary text-white": getValues("categories").includes(
                      category.id,
                    ),
                  },
                )}
              >
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx("bg-secondary cursor-pointer rounded-md p-5", {
            "bg-secondary": isValid,
            "bg-gray-500": !isValid,
          })}
        >
          Guardar
        </button>
      </form>
    </section>
  );
}
