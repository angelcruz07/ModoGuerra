import type { User } from "@interfaces";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

interface Props {
  postId: string;
  user?: User | null;
}

export const PostLikes = ({ postId, user }: Props) => {
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const getTotalLikes = async (postId: string) => {
    const { data } = await actions.likes.getLikesByPostId({ postId });
    const totalLikes = data?.count || 0;
    setTotalLikes(totalLikes);

    if (data?.userLiked) {
      setIsLiked(true);
    }
  };

  const handleLikeClick = async () => {
    if (!user?.id) {
      alert("Debes iniciar sesión para dar like.");
      return;
    }

    const { data } = await actions.likes.createUpdateLikeByPost({
      postId: postId!,
    });

    if (data?.success) {
      setIsLiked((prev) => !prev);
      getTotalLikes(postId!);
    }
  };

  useEffect(() => {
    getTotalLikes(postId!);
  }, [postId]);

  return (
    <div className="mt-10 flex items-start justify-between">
      <div>
        <span>Likes</span>
        <div className="flex gap-x-2 text-white">
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
            className={`icon icon-tabler icons-tabler-filled icon-tabler-heart ${
              isLiked ? "text-secondary" : ""
            }`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>

          {totalLikes}
        </div>
      </div>
      <button
        id="like-button"
        onClick={handleLikeClick}
        className={`hover:bg-secondary flex cursor-pointer gap-2 rounded-md border p-3 text-white ${
          isLiked ? "border-secondary bg-secondary" : "border-secondary"
        }`}
      >
        <svg
          className="text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
        Dar me gusta
      </button>
    </div>
  );
};
