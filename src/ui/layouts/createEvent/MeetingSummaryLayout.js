import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import {DatesSelect, MultipleValueSelect, SingleValueSelect} from "../../components/selects";
import { LabeledInput } from "@/ui/components/inputs";
import Image from "next/image";

export default class MeetingSummary extends Component
{
  render() {
    const {
      duration,
      userName,
      numberOfDays,
      numberOfTimes,
      allowContinue,
      onClickContinue,
      onChangeCustomUrl,
      onChangeMeetingName,
      onChangeMeetingAgenda
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12 h-full flex flex-col items-center p-8 rounded-xl bg-white overflow-y-auto overflow-x-hidden">
          <label className="text-3xl font-bold">Add Meeting Details</label>
          <div className="flex-1">
            <RoundedCard
              paddingValue={4}
              className="border-2 border-solid border-slate-400 mt-4 rounded-2xl"
            >
            <p className="text-xl font-normal">Meeting Summary</p>
            <p className="mt-2 font-normal"><span className="font-bold">Host:</span> {userName}(you)</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center pt-4">
                <label className="text-md font-bold">duration:</label>
                <label className="text-md ml-2 self-center ">{duration} Minutes</label>
              </div>
              <div className="flex flex-col items-center pt-4">
                <label className="text-md font-bold">availability:</label>
                <label>{numberOfTimes} Times on {numberOfDays} Days</label>
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
                label="Agenda"
                className="mt-4"
                placeholder="Agenda"
                onChangeText={onChangeMeetingAgenda}
              />
              <LabeledInput 
                className="mt-4 overflow-hidden"
                isRequired={true}
                label="Expected Custom Url"
                placeholder="put your custom url"
                onChangeText={onChangeCustomUrl}
                leftComponent={() =>
                  //todo: find better way to handle input padding (with left component) automatically
                  <label className="whitespace-nowrap p-2">http://localhost:3000/calendly-url/9126732/</label>
                }
              />
            </RoundedCard>
          </div>
          <RoundedButton
            paddingValue={8}
            onClick={allowContinue? onClickContinue : null}
            className={`${allowContinue? 'bg-indigo-500 hover:text-white hover:bg-indigo-700': 'bg-gray-500 cursor-default' } mt-2 font-bold w-fit p-4 self-end`}
          >Continue</RoundedButton>
        </RoundedCard>
      </div>
    )
  }
}