import React from "react";
import { RoundedButton } from "../buttons";
import ContentNotFound from "./ContentNotFound";
import { RoundedCard } from "@/ui/components/cards";

export default ({onClick, message}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-400 h-full">
      <RoundedCard
        paddingValue={14}
        className="w-8/12 h-full flex flex-col items-center justify-center px-10 py-5 rounded-xl bg-white"
      >
        <ContentNotFound message={message}/>
        <RoundedButton
          onClick={onClick}
          allowContinue={true}
          className="mt-4 font-bold w-fit p-4"
        >
          Go Back
       </RoundedButton>
      </RoundedCard>
    </div>
  )
}