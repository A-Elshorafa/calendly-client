import Link from "next/link";
import Image from "next/image";
import React, {Component} from "react";
import messages from "@/constants/messages";
import { RoundedCard } from "@/ui/components/cards";
import { CustomModal } from "@/ui/components/modals";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { ImageLoader } from "@/ui/components/actionComponents";
import { LabeledInput, LabeledTextArea } from "@/ui/components/inputs";

export default class MeetingSummary extends Component
{
  render() {
    const {
      // static data
      duration,
      userName,
      eventName,
      modalType,
      numberOfDays,
      calendlyLink,
      numberOfTimes,
      allowContinue,
      isScreenLoading,
      validationErrors,
      authorizationLink,
      // callbacks
      onCancelModal,
      onConfirmModal,
      onClickContinue,
      onChangeCustomUrl,
      onChangeMeetingName,
      onChangeMeetingAgenda
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full relative">
        {modalType !== '' && <CustomModal
          cancelText="Cancel"
          confirmText="Try Again"
          onClickCancel={onCancelModal}
          onClickConfirm={onConfirmModal}
          withButtons={modalType === 'error'}
          title={modalType === 'error'? "Create Event Error" : "Event Created Successfully"}
          description={
            modalType === 'error'? 
              messages.ERROR_OCCURRED_WHILE_CREATE : messages.YOU_WILL_REDIRECT_IN_SECS
            }
        />}
        {isScreenLoading && 
          <ImageLoader/>
        }
        <RoundedCard 
          className="px-24 py-5 w-8/12 h-full flex flex-col items-center rounded-xl bg-white overflow-y-auto overflow-x-hidden">
          <label className="text-3xl font-bold">Add Meeting Details</label>
          <div className="flex flex-col flex-1">
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
                value={eventName}
                isRequired={true}
                label="Meeting Name"
                placeholder="Meeting Name"
                onChangeText={onChangeMeetingName}
                invalidText={validationErrors?.name ? validationErrors['name'] : ''}
              />
              <LabeledInput
                value="Zoom"
                disabled={true}
                className="mt-4"
                isRequired={true}
                label="Meeting Location"
                invalidText={authorizationLink? messages.CLICK_THIRD_ICON_TO_AUTHORIZE : ''}
                leftComponent={() => (
                  authorizationLink?
                    (<Link
                      href={authorizationLink}
                    >
                      <Image
                        alt="#"
                        width={24}
                        height={24}
                        className="ml-2 my-2" //todo: find better way to handle input padding (with left component) automatically
                        src="/48X48/zoom48.svg"
                      />
                    </Link>)
                  :  
                    (<Image
                      alt="#"
                      width={24}
                      height={24}
                      className="ml-2 my-2" //todo: find better way to handle input padding (with left component) automatically
                      src="/48X48/zoom48.svg"
                    />)
                  )
                }
              />
              <LabeledInput 
                isRequired={true}
                value={calendlyLink}
                label="Expected Custom Url"
                className="mt-4 overflow-hidden"
                placeholder="put your custom url"
                onChangeText={onChangeCustomUrl}
                leftComponent={() => (
                  <label className="whitespace-nowrap p-2">
                    http://localhost:3000/event-subscription/9126732/
                  </label>
                )}
              />
              <LabeledTextArea 
                label="Agenda"
                className="mt-4"
                initialHeight={8}
                placeholder="Agenda"
                onChangeText={onChangeMeetingAgenda}
              />
            </RoundedCard>
            <RoundedFilledButton
              paddingValue={8}
              onClick={onClickContinue}
              allowContinue={allowContinue}
              className={`mt-2 font-bold w-fit p-4 self-end`}
            >Continue</RoundedFilledButton>
          </div>
        </RoundedCard>
      </div>
    )
  }
}