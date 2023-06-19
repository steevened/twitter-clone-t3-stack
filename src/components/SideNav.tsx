import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

const SideNav: FC = ({}) => {
  const session = useSession();

  const user = session.data?.user;

  console.log(user);

  return (
    <nav className="sticky top-0 bg-black px-2 ">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
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
