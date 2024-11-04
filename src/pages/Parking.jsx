import React, { useState } from "react";
import TitleHeader from "../component/TitleHeader";
import TabPage from "../component/TapPage";
import InquiryTrx from "../component/Table/InquiryTrx";
import PaymentConfirmation from "../component/Table/PaymentConfirmation";

function Parking() {
  const [activeTab, setActiveTab] = useState("Inquiry Transaction");
  const tab = ["Inquiry Transaction", "Payment Confirmation"];
  return (
    <div className="max-h-screen max-w-full">
      <TitleHeader
        title={"Parking"}
        subtitle={"Monitoring Transaction Parking"}
      />

      <TabPage tabs={tab} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-auto max-h-[calc(100vh-200px)]">
        {" "}
        {/* Sesuaikan tinggi sesuai kebutuhan */}
        {activeTab === "Inquiry Transaction" && <InquiryTrx />}
        {activeTab === "Payment Confirmation" && <PaymentConfirmation />}
      </div>
    </div>
  );
}

export default Parking;
