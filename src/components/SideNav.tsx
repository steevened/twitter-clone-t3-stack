import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import ProfileImage from "./ProfileImage";

const SideNav: FC = ({}) => {
  const session = useSession();

  const user = session.data?.user;

  return (
    <nav className="sticky top-0  p-2">
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
            <Link href={`/profile/${user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  {/* <VscAccount className="h-8 w-8" /> */}

                  <ProfileImage
                    className="w-8"
                    src={session?.data?.user.image}
                  />

                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}

        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-500/80" />
                  <span className="hidden text-lg text-green-500/80 md:inline">
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignOut className="h-8 w-8 fill-red-500/80" />
                  <span className="hidden text-lg text-red-500/80 md:inline">
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
