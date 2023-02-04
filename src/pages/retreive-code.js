import React from "react";
import { ImageLoader } from "@/ui/components/actionComponents";

export default ({router, rootStore}) => {
  
  if (router?.query?.code) {

    const code = router.query.code;
    const {userStore} = rootStore;
    userStore.setUserToken(code);

    router.push(`http://localhost:3000/set-user-tokens?code=${code}`)
  }
  return (
    <div className="w-full h-full flex flex-row justify-center items-ceter">
      <h1>You'll redirect in secs...</h1>
      <ImageLoader/>
    </div>
  );
}