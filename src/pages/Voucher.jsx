import React, { useState } from "react";
import InquiryTable from "../component/Table/Inquiry";
import TitleHeader from "../component/TitleHeader";
import TabPage from "../component/TapPage";
import Redemption from "../component/Table/Redemption";
import Usage from "../component/Table/Usage";

export default function Voucher() {
  const [activeTab, setActiveTab] = useState("Voucher Inquiry");
  const tab = ["Voucher Inquiry", "Voucher Redemption", "Voucher Usage"];

  return (
    <>
      {/* <div className="mx-auto p-3 bg-white rounded-md shadow-md min-h-0.5 max-h-screen flex flex-col"> */}
      <TitleHeader title={"Voucher"} subtitle={"Monitoring Voucher"} />

      <TabPage tabs={tab} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Kontainer untuk tabel dengan scroll */}
      <div className="flex-1 overflow-auto max-h-[calc(100vh-200px)]">
        {" "}
        {/* Sesuaikan tinggi sesuai kebutuhan */}
        {activeTab === "Voucher Inquiry" && <InquiryTable />}
        {activeTab === "Voucher Redemption" && <Redemption />}
        {activeTab === "Voucher Usage" && <Usage />}
      </div>
      {/* </div> */}
    </>
  );
}
