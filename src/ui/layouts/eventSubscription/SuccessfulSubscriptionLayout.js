import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import Image from "next/image";

export default class SuccessfulSubscriptionLayout extends Component
{
  render() {
    const {
      hostName,
      eventName,
      calendlyLink,
      eventDateTime,
      thirdPartyName,
      thirdPartyLink,
      authorizationLink
    } = this.props;
    return (
      <div className="flex items-center justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12 h-fit flex flex-col items-center p-8 rounded-xl bg-white">
          <label className="text-xl font-bold text-slate-600">Successful Event Subscription</label>
          <p className="text-xl font-semibold text-slate-600 mt-2 text-center">
            You are Successfully Subscriped with<span className="font-bold">&nbsp;{hostName}&nbsp;</span>on
            <span className="font-bold">&nbsp;{eventName}&nbsp;</span>event
          </p>
          <div className="flex flex-col items-center justify-center mt-8">
            <label className="text-md font-bold text-slate-600">{eventName}</label>
            <div className="flex flex-row items-center">
              <Image
                alt=""
                width={24}
                height={24}
                src="/19X19/grayCalender19.svg"
              />
              <label className="text-md text-gray-700 ml-2">{eventDateTime}</label>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <label className="text-lg text-gray-700 font-semibold">Here's your {thirdPartyName} link:</label>
            {thirdPartyLink?
              <a className="text-lg text-gray-500" href={thirdPartyLink}>{thirdPartyLink}</a>:
              <label>Sorry you should authorized to {thirdPartyName} to get event link
                <a className="text-lg text-gray-500" href={authorizationLink}>{thirdPartyLink}</a>
              </label>
            }
          </div>
          <div className="flex flex-col items-center mt-8">
            <label className="text-lg text-gray-700 font-semibold">Here's your calendly link:</label>
            <a className="text-lg text-gray-500" href={calendlyLink}>{calendlyLink}</a>
          </div>
        </RoundedCard>
      </div>
    )
  }
}