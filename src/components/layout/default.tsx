import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { animated, useSpring } from 'react-spring';
import { CreateDiscordHomeBtn } from '../CreateDiscordHomeBtn';
import { Logo } from '../common/Logo';

type Props = {
  children: ReactNode;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const screenSize = useScreenSize();
  const [isShowSideNav, setIsShowSideNav] = useState(false);
  const stylesSideNav = useSpring({ width: isShowSideNav ? '300px' : '0px' });
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen">
        {/* Header */}
        <div className="sticky top-0 p-5 z-10 w-screen">
          <div className="relative h-12">
            {/* Hamburger menu toggle */}
            <button
              className="absolute top-0 left-0"
              onClick={() => {
                setIsShowSideNav(!isShowSideNav);
              }}
            >
              <FiMenu size={30} />
            </button>

            {/* Logo */}
            <div className="absolute top-0 right-1/2">
              <Logo />
            </div>

            <div className="absolute top-0 right-0">
              {/* <Button
                colorScheme="purple"
                onClick={() => {
                  router.push('/login');
                }}
              >
                <BiLogIn />
                <div className="mx-2">ログイン</div>
              </Button> */}
            </div>
          </div>
        </div>

        <div className="flex flex-row overflow-hidden">
          {/* Sidebar */}
          <div>
            <ProSidebar
              collapsed={!isShowSideNav}
              collapsedWidth="0px"
              className="!fixed top-[78px]"
            >
              <Menu>
                <MenuItem>
                  <CreateDiscordHomeBtn />
                </MenuItem>
                <MenuItem
                  icon={<AiOutlineHome />}
                  onClick={() => router.push('/')}
                >
                  HOME
                </MenuItem>
              </Menu>
            </ProSidebar>
          </div>
          <animated.div style={stylesSideNav} />

          {/* Contents */}
          <div className="w-full p-3 lg:p-8 pb-48 md:pl-14 lg:pl-16">
            {children}
          </div>
        </div>

        <div className="h-24" />
      </div>
    </>
  );
};

export default DefaultLayout;
