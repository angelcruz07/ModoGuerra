import type { PostWithRelations } from "@actions/post/getPostsByPage.action";
import { type Post } from "@interfaces";
import { dateFormat } from "@utils/date-format";
import { actions } from "astro:actions";

interface PropsBadge {
  className: string;
  children: React.ReactNode;
  variant: string;
}

interface Props {
  post: PostWithRelations;
}

const Badge = ({ children, variant, className }: PropsBadge) => {
  let baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  let variantClasses = "";

  switch (variant) {
    case "outline":
      variantClasses = "border-primary text-primary";
      break;
    default:
      variantClasses = "bg-neutral text-primary-foreground";
      break;
  }
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

export const PostView = ({ post }: Props) => {
  const onDelete = async (postId: string) => {
    // ⚠️ Paso 1: Pedir confirmación al usuario
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este post? Esta acción es irreversible.",
    );

    // ⚠️ Paso 2: Si el usuario confirma, procede con la eliminación
    if (confirmed) {
      try {
        const deletePost = await actions.post.deletePost({ id: postId });
        if (deletePost) {
          alert("Post eliminado con éxito.");
          window.location.reload();
        }
      } catch (error) {
        // Manejo de errores si la eliminación falla
        console.error("Error al eliminar el post:", error);
        alert("Ocurrió un error al intentar eliminar el post.");
      }
    } else {
      // Si el usuario cancela, no se hace nada
      alert("Eliminación cancelada.");
    }
  };

  return (
    <div className="bg-card border-secondary rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex gap-4">
          {post.image && (
            <div className="flex-shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <a
                    href={`/dashboard/posts/${post.slug}`}
                    className="text-neutral truncate text-lg font-semibold"
                  >
                    {post.title}
                  </a>

                  <p
                    onClick={() => onDelete(post.id ?? "")}
                    className="cursor-pointer hover:underline"
                  >
                    Eliminar
                  </p>
                </div>
                <p className="text-neutral mb-3 line-clamp-2 text-sm">
                  {post.description}
                </p>
                <div className="text-neutral flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    {post.author.name}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <Tag className="h-3 w-3" /> */}
                    {/* {post.categories.map((category, index) => (
                      <span key={index}>{category}</span>
                    ))} */}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <Calendar className="h-3 w-3" /> */}
                    {dateFormat(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <Eye className="h-3 w-3" /> */}
                    {/* {post.views.toLocaleString()} vistas */}
                  </div>
                  {/* {post.comments > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments} comentarios
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
