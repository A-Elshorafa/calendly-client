import React from "react";
import { AuthNavigator } from "@/ui/components/navigation";

export default () =>  {
  return (
    <AuthNavigator>
      <div className="flex items-center justify-center m-96">
        <label className="text-4xl whitespace-nowrap">Happy Schedules With Calendly :)</label>
      </div>
    </AuthNavigator>
  );
}