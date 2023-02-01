import React from "react";
import { RoundedCard } from ".";
import { IconAndValue, ReferenceLink, TitleAndValue } from "../label";

export default ({
  onClick,
  eventId,
  eventName,
  calendlyLink,
  attendeeEmail,
  eventLocation,
  eventCreatedAt,
  eventExpiryDate,
  onClickDelete = null
}) => {
  return (
    <RoundedCard 
      roundedSize="lg" 
      paddingValue={8}
      allowClick={true}
      onClick={()=>onClick(eventId)}
      className="flex flex-col items-start border-solid border-2 border-slate-200 rounded-full shadow-lg overflow-hidden"
    >
      <TitleAndValue 
        title={eventName}
        value={eventLocation}
        className="flex flex-col justify-between items-center"
      />
      {attendeeEmail &&
        <TitleAndValue
          title="With:"
          value={attendeeEmail}
          className="flex flex-col justify-between items-center"
        />
      }
      <div className="w-full flex flex-row justify-between items-center mt-4">
          <TitleAndValue
            title="Created At"
            value={eventCreatedAt}
            classNameTitle="flexflex-col"
          />
        {eventExpiryDate &&
          <TitleAndValue
            title="Expire At:"
            value={eventExpiryDate}
            classNameTitle="flex flex-col"
          />
        }
      </div>
      <div className="w-full flex flex-wrap flex-row justify-between mt-8">
        {calendlyLink &&
          <ReferenceLink
            allowClick={true}
            link={calendlyLink}
            text="Copy Calendly Link"
            afterCopyText="Like Copied"
          />
        }
        {onClickDelete !== null &&
          <IconAndValue
            imgWidth={24}
            imgHeight={24}
            allowClick={true}
            text="Delete Event"
            iconSrc="/48X48/trashRed48.svg"
            textClassName="ml-2 text-red-500 text-md"
            onClick={() => {onClickDelete(eventId, eventName)}}
          />
        }
      </div>
    </RoundedCard>
  )
}