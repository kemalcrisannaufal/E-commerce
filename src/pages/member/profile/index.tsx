/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileMemberView from "@/components/views/member/Profile";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileMemberPage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    const getProfile = async () => {
      if (session.data?.accessToken && Object.keys(profile).length === 0) {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      }
    };
    getProfile();
  }, [profile, session]);
  return (
    <>
      {profile && (
        <ProfileMemberView
          profile={profile}
          setProfile={setProfile}
          session={session}
        />
      )}
    </>
  );
};

export default ProfileMemberPage;
