import Link from "next/link";
import type { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";
import { api } from "~/utils/api";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

interface User {
  id: string;
  image: string | null;
  name: string | null;
}

interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likesCount: number;
  likedByMe: boolean;
  user: User;
}

interface InfiniteTweetsListProps {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
}

const InfiniteTweetsList: FC<InfiniteTweetsListProps> = ({
  tweets,
  fetchNewTweets,
  hasMore,
  isError,
  isLoading,
}) => {
  if (isError) return <h1>Error...</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!tweets || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-200">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"loading"}
      >
        {tweets.map((tweet) => (
          <TweetCard
            content={tweet.content}
            createdAt={tweet.createdAt}
            likedByMe={tweet.likedByMe}
            id={tweet.id}
            likesCount={tweet.likesCount}
            user={tweet.user}
            key={tweet.id}
          />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

const TweetCard: FC<Tweet> = ({
  id,
  user,
  content,
  createdAt,
  likesCount,
  likedByMe,
}) => {
  const toggleLike = api.tweet.toggleLike.useMutation();

  const handleToggleLike = () => {
    toggleLike.mutate({ id });
  };

  return (
    <li className="flex gap-4 border-b border-white/20 p-4">
      <Link href={`/profile/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profile/${user.id}`}
            className="font-bold hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {user.name}
          </Link>
          <span className="text-gray-200">-</span>
          <span className="text-gray-400">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HearthButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={likedByMe}
          likesCount={likesCount}
        />
      </div>
    </li>
  );
};

type HearthButtonProps = {
  likedByMe: boolean;
  likesCount: number;
  isLoading: boolean;
  onClick: () => void;
};

const HearthButton = ({
  likedByMe,
  likesCount,
  isLoading,
  onClick,
}: HearthButtonProps) => {
  const session = useSession();
  const HearthIcon = likedByMe ? VscHeartFilled : VscHeart;

  if (session.status !== "authenticated") {
    return (
      <div className=" mb-1 mt-2 flex items-center gap-3 self-start text-gray-500">
        <HearthIcon />

        <span>{likesCount}</span>
      </div>
    );
  }
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group flex items-center gap-2 self-start transition-colors duration-100 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500 "
      }`}
    >
      <IconHoverEffect red>
        <HearthIcon
          className={`transition-colors duration-100 ${
            likedByMe
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
      </IconHoverEffect>
      <span className="">{likesCount}</span>
    </button>
  );
};

export default InfiniteTweetsList;
