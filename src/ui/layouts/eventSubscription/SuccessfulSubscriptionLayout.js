import React, {Component} from "react";
import {RoundedCard} from "@/ui/components/cards";
import { CardTitle, IconAndValue } from "@/ui/components/label";

export default class SuccessfulSubscriptionLayout extends Component
{
  render() {
    const {
      hostName,
      eventName,
      emailAccounts,
      subscriptionFullDateAndTime
    } = this.props;
    return (
      <div className="flex items-center justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12 h-fit flex flex-col items-center p-8 rounded-xl bg-white">
          <div className="flex flex-col items-center px-14 w-full overflow-hidden">
            <CardTitle title="Successful Event Subscription" />
            <p 
              className="w-full self-center text-md text-slate-500 text-center text-ellipsis whitespace-nowrap overflow-hidden font-semibold mt-2 border-b-2 border-solid border-gray-200"
            >
              You are Successfully Subscriped with<span className="ml-2 font-bold tex-lg text-slate-600">{hostName}</span>
            </p>
            <div className="w-full flex flex-col items-start justify-center">
              <IconAndValue
                imgWidth={28}
                imgHeight={28}
                text={eventName}
                iconSrc="/48X48/filledCircleBlue48.svg"
              />
              <IconAndValue
                imgWidth={24}
                imgHeight={24}
                marginTopValue={4}
                text={subscriptionFullDateAndTime}
                iconSrc="/19X19/grayCalender19.svg"
              />
              <IconAndValue
                marginTopValue={4}
                inOneValueLine={false}
                iconSrc="/16X16/videoCam16.svg"
                text="Web Conferencing details to follow"
              />
              <IconAndValue
                imgWidth={24}
                imgHeight={24}
                marginTopValue={4}
                text={emailAccounts}
                inOneValueLine={false}
                textClassName="text-start"
                iconSrc="/19X19/grayCalender19.svg"
              />
              <p
                className="mt-8 self-center font-semibold text-lg text-ellipsis text-black whitespace-nowrap overflow-hidden"
              >
                A calender invitation has been sent to your email address.
              </p>
            </div>
          </div>
        </RoundedCard>
      </div>
    )
  }
}