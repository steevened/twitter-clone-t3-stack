import InfiniteTweetsList from "~/components/InfiniteTweetsList";
import NewTweetForm from "~/components/NewTweetForm";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <header className="sticky  top-0 z-10 border-b border-white/20  pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm />
      <RecentTweets />
    </>
  );
}

const RecentTweets = () => {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteTweetsList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage ? true : false}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
};
