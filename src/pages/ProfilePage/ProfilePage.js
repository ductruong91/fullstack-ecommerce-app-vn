import React from 'react'
import styled from 'styled-components';
import UserSidebar from '../../components/UserSlidebar/UserSlidebar';
import AccountSetting from '../../components/AccountSetting/AccountSetting';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;
  gap: 20px; /* Khoảng cách giữa các phần */
`;

const LeftMargin = styled.div`
  flex: 1; /* Lề trái chiếm 1 phần */
`;

const SidebarWrapper = styled.div`
  flex: 2; /* Sidebar chiếm 1 phần */
  ${'' /* background: red; */}
`;

const AccountWrapper = styled.div`
  flex: 4; /* AccountSetting chiếm 2 phần */
  padding: 20px;
  border: 1px solid #ddd; /* Viền mờ màu xám */
  border-radius: 10px;
  background: #fff;
`;

const RightMargin = styled.div`
  flex: 1; /* Lề phải chiếm 1 phần */
`;
const ProfilePage = () => {
  return (
    <Wrapper>
      <LeftMargin />
      <SidebarWrapper>
        <UserSidebar />
      </SidebarWrapper>
      <AccountWrapper>
        <AccountSetting />
      </AccountWrapper>
      <RightMargin />
    </Wrapper>
  );
}

export default ProfilePage