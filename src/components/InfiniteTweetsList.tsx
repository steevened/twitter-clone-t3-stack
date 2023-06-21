import type { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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

  console.log(tweets);

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"loading"}
      >
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.content}</li>
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetsList;
