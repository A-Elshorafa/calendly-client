import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import { LabeledInput, LabeledTextArea } from "@/ui/components/inputs";
import Image from "next/image";

export default class MeetingSummary extends Component
{
  customUrlComponent() {
    return (<label className="whitespace-nowrap p-2">
            http://localhost:3000/event-subscription/9126732/
          </label>);
  }

  render() {
    const {
      // static data
      duration,
      userName,
      numberOfDays,
      numberOfTimes,
      allowContinue,
      // callbacks
      onClickContinue,
      onChangeCustomUrl,
      onChangeMeetingName,
      onChangeMeetingAgenda,
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard 
          className="px-24 py-5 w-5/12 h-full flex flex-col items-center rounded-xl bg-white overflow-y-auto overflow-x-hidden">
          <label className="text-3xl font-bold">Add Meeting Details</label>
          <div className="flex-1">
            <RoundedCard
              paddingValue={4}
              className="border-2 border-solid border-slate-400 mt-4 rounded-2xl"
            >
            <p className="text-xl font-normal">Meeting Summary</p>
            <p className="mt-2 font-normal"><span className="font-bold">Host:</span> {userName}(you)</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start pt-4">
                <label className="text-md font-bold">duration:</label>
                <label className="text-md">{duration} Minutes</label>
              </div>
              <div className="flex flex-col items-start pt-4">
                <label className="text-md font-bold">availability:</label>
                <label className="text-md">{numberOfTimes} Times on {numberOfDays} Days</label>
              </div>
            </div>
            </RoundedCard>
            <RoundedCard
              paddingValue={4}
              className="border-2 border-solid border-slate-400 mt-4 rounded-2xl"
            >
              <p className="text-xl">Meeting details</p>
              <LabeledInput 
                className="mt-4"
                isRequired={true}
                label="Meeting Name"
                placeholder="Meeting Name"
                onChangeText={onChangeMeetingName}
              />
              <LabeledInput
                value="Zoom"
                disabled={true}
                className="mt-4"
                isRequired={true}
                label="Meeting Location"
                leftComponent={() => (
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    className="ml-2 my-2" //todo: find better way to handle input padding (with left component) automatically
                    src="//assets.calendly.com/assets/frontend/media/zoom-dd4ce5bef905d2b74c0a.svg"
                  />
                )}
              />
              <LabeledInput 
                isRequired={true}
                label="Expected Custom Url"
                className="mt-4 overflow-hidden"
                placeholder="put your custom url"
                onChangeText={onChangeCustomUrl}
                leftComponent={() => this.customUrlComponent()}
              />
              <LabeledTextArea 
                label="Agenda"
                className="mt-4"
                initialHeight={8}
                placeholder="Agenda"
                onChangeText={onChangeMeetingAgenda}
              />
            </RoundedCard>
          </div>
          <RoundedButton
            paddingValue={8}
            onClick={onClickContinue}
            allowContinue={allowContinue}
            className={` mt-2 font-bold w-fit p-4 self-end`}
          >Continue</RoundedButton>
        </RoundedCard>
      </div>
    )
  }
}