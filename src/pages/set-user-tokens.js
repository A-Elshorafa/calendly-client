import pages from "@/constants/pages";
import React, { useState } from "react";
import { GetAuthUserInfo } from "@/apis";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { ImageLoader } from "@/ui/components/actionComponents";

export default ({router, axios, rootStore}) => {
  const [hasErrors, setHasErrors] = useState(false);

  const redirectToDashboard = () => {
    router.push(pages.EVENTS_DASHBORAD);
  }

  // will implemented once component triggered
  if (router?.query?.code) {
    const {userStore} = rootStore;
    if (userStore.id === -1) {
      GetAuthUserInfo(userInfo => {
        userStore.updateUserInfo(userInfo)
        axios.post("http://localhost:8000/api/setUserTokens", {code: router.query.code, third_party_name: "zoom", user_id: userInfo.id}).then(_ => {
          // clear user authorization link to don't require the authorization from the user again
          userStore.clearAuthorizationLink();
          router.push(pages.EVENTS_DASHBORAD);
        }).catch(_=>{
          setHasErrors(true);
        });
      }, axios)
    }
  }

  return (
    <div className="w-full h-full flex flex-row justify-center items-ceter">
    {
      hasErrors?
      <>
        <h1>Sorry we couldn't authorize you with zoom</h1>
        <RoundedFilledButton
          onClick={redirectToDashboard}
        />
      </>
      :
        <>
          <h1>You'll redirect in secs...</h1>
          <ImageLoader/>
        </>
    }
    </div>
  );
}