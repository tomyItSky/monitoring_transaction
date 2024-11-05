import React, { useState } from 'react';
import InquiryTable from '../component/Table/Inquiry';
import TitleHeader from '../component/TitleHeader';
import TabPage from '../component/TapPage';
import Redemption from '../component/Table/Redemption';
import Usage from '../component/Table/Usage';

export default function Voucher() {
  const [activeTab, setActiveTab] = useState('Voucher Inquiry');
  const tab = ['Voucher Inquiry', 'Voucher Redemption', 'Voucher Usage'];

  return (
    <>
      <TitleHeader title={'Voucher'} subtitle={'Monitoring Voucher'} />

      <TabPage tabs={tab} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-auto max-h-[calc(100vh-200px)]">
        {activeTab === 'Voucher Inquiry' && <InquiryTable />}
        {activeTab === 'Voucher Redemption' && <Redemption />}
        {activeTab === 'Voucher Usage' && <Usage />}
      </div>
    </>
  );
}
