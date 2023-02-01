import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { CardTitle, LabeledButton } from "@/ui/components/label";

export default class SuccessfulCreationLayout extends Component
{
  render() {
    const {
      eventName,
      calendlyLink,
      goToDashoard,
      onClickCalendly
    } = this.props;
    return (
      <div className="flex items-center justify-center py-8 bg-gray-400 h-full">
        <RoundedCard
          paddingValue={14}
          className="w-5/12 h-fit flex flex-col items-center p-8 rounded-xl bg-white"
        >
          <CardTitle text="Successful Event Creation"/>
          <p className="text-xl font-semibold text-slate-600 mt-2 text-center">
            You are Successfully created a new event
          </p>
          <div className="flex flex-col items-center justify-center mt-8">
            <label className="text-3xl font-bold text-slate-600">
              {eventName}
            </label>
          </div>
          <LabeledButton
            onClick={onClickCalendly}
            buttonText={calendlyLink}
            title="Here's your calendly link:"
          />
          <button
            onClick={goToDashoard}
            className="mt-4 text-blue-700 font-semibold"
          >
            Go back to dashboard
          </button>
        </RoundedCard>
      </div>
    )
  }
}