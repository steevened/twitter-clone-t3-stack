import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import IconHoverEffect from "./IconHoverEffect";
import { VscHome } from "react-icons/vsc";

const SideNav: FC = ({}) => {
  const session = useSession();

  const user = session.data?.user;

  return (
    <nav className="sticky top-0  p-2 ">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user !== null && user !== undefined && (
          <li>
            <Link href={`/profile/${user.id}`}>Profile</Link>
          </li>
        )}

        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>Log In</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
