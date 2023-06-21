import { useState, type FC, FormEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const NewTweetForm: FC = ({}) => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (_newTweet) => {
      setInputValue("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.length <= 0) return;
    createTweet.mutate({ content: inputValue });
  };

  if (session.status !== "authenticated") return;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b border-white/20 px-4 py-2"
    >
      <div className="flex items-start gap-2">
        <ProfileImage src={session.data.user.image} />
        <TextareaAutosize
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" flex-grow resize-none overflow-hidden bg-transparent p-4 text-lg text-white/80 outline-none"
          placeholder="What's happening"
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
};

export default NewTweetForm;
