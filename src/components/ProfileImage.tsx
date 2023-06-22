import Image from "next/image";
import type { FC } from "react";
import { VscAccount } from "react-icons/vsc";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
};

const ProfileImage: FC<ProfileImageProps> = ({ src, className = "" }) => {
  return (
    <div
      className={`relative aspect-square w-12  overflow-hidden rounded-full  ${className}`}
    >
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="profile image" quality={100} fill />
      )}
    </div>
  );
};

export default ProfileImage;
