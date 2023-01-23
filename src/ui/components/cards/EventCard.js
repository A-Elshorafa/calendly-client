import React from "react";
import { RoundedCard } from ".";

export default ({
  eventName,
  calendlyLink,
  eventLocation,
  eventCreatedAt,
  eventExpiryDate,
  onClickDelete = null
}) => {
  return (
    <RoundedCard paddingValue={8} className="flex flex-col items-start border-solid border-2 border-slate-200 rounded-lg shadow-lg">
      <div className="w-full flex flex-row justify-between items-center">
        <label className="text-2xl text-slate-700 font-bold whitespace-nowrap">{eventName}</label>
        <label className="text-xl text-slate-500 font-bold whitespace-nowrap">{eventLocation}</label>
      </div>
      <div className="w-full flex flex-col justify-between items-center mt-4">
        <div className="flex flex-row items-start justify-between w-full">
          <label className="text-xl text-slate-500 font-bold whitespace-nowrap">Created At:</label>
          <label className="text-xl text-slate-300 font-normal">{eventCreatedAt}</label>
        </div>
        <div className="flex flex-row items-start justify-between w-full">
          <label className="text-xl text-slate-500 font-bold whitespace-nowrap">Expire At:</label>
          <label className="text-xl text-slate-300 font-normal">{eventExpiryDate}</label>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between mt-8">
        <a className="text-md text-slate-400 whitespace-nowrap" target="_blank" href={calendlyLink}>Copy Event Link</a>
        {onClickDelete !== null &&
          <button className="text-md text-red-500" onClick={onClickDelete}>Delete Event</button>
        }
      </div>
    </RoundedCard>
  )
}