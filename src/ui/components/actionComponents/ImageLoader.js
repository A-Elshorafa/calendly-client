import React from "react";
import Image from "next/image";
import { RoundedCard } from "../cards";

export default () => {
  return (
    <RoundedCard className="w-full h-full absolute flex items-center justify-center z-10 bg-gray-500 bg-opacity-30">
      <Image
        width={80}
        height={43}
        alt="loading..."
        className="bg-opacity-30"
        src="/128X43/screenLoading.gif"
      />
    </RoundedCard>
  )
}