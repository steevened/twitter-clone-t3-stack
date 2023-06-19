import { useState, type FC } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";

const NewTweetForm: FC = ({}) => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");

  if (session.status !== "authenticated") return;

  return (
    <form className="flex flex-col gap-2 border-b border-white/20 px-4 py-2">
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
