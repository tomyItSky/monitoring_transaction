import React from 'react';
import TitleHeader from '../component/TitleHeader';
import Users from '../component/Table/Users';

function UserManagement() {
  return (
    <>
      <TitleHeader
        title="User Management"
        subtitle={'Monitoring User Management'}
      />

      <div className="border-b border-gray-200 w-full mb-5"></div>

      <Users />
    </>
  );
}

export default UserManagement;
