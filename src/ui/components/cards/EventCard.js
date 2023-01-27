import Link from "next/link";
import React from "react";
import { RoundedCard } from ".";
import { TitleAndValue } from "../label";

export default ({
  eventName,
  calendlyLink,
  eventLocation,
  showExpiryDate,
  eventCreatedAt,
  eventExpiryDate,
  onClickDelete = null
}) => {
  return (
    <RoundedCard paddingValue={8} className="flex flex-col items-start border-solid border-2 border-slate-200 rounded-full shadow-lg overflow-hidden">
      <div className="w-full flex flex-row justify-between items-center">
        <TitleAndValue title={eventName} value={eventLocation}/>
      </div>
      <div className="w-full flex flex-col justify-between items-center mt-4">
        <div className="flex flex-row items-baseline justify-between w-full">
          <TitleAndValue title="Created At" value={eventCreatedAt}/>
        </div>
        {showExpiryDate &&
          <div className="flex flex-row items-baseline justify-between w-full">
            <TitleAndValue title="Expire At:" value={eventExpiryDate}/>
          </div>
        }
      </div>
      <div className="w-full flex flex-row justify-between mt-8">
        <Link className="text-md text-slate-400 whitespace-nowrap" target="_blank" href={calendlyLink? calendlyLink : ""}>Copy Event Link</Link>
        {onClickDelete !== null &&
          <button className="text-md text-red-500" onClick={onClickDelete}>Delete Event</button>
        }
      </div>
    </RoundedCard>
  )
}