import { useAuth } from '@/hooks/utils/useAuth';
import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdDashboardCustomize } from 'react-icons/md';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { animated, useSpring } from 'react-spring';
import { DiscordConnectBtn } from '../common/DiscordConnectBtn';
import { Logo } from '../common/Logo';

type Props = {
  children: ReactNode;
  bgClassName?: string;
  showLogo?: boolean;
};
const DefaultLayout: React.FC<Props> = (props) => {
  const [isShowSideNav, setIsShowSideNav] = useState(false);
  const stylesSideNav = useSpring({ width: isShowSideNav ? '300px' : '0px' });
  const router = useRouter();
  const screenSize = useScreenSize();
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={`flex flex-col min-h-screen w-screen ` + props.bgClassName}
      >
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
            {(props.showLogo ?? true) && screenSize === 'lg' && (
              <div className="absolute top-0 right-1/2 translate-x-1/2">
                <Logo />
              </div>
            )}

            <div className="absolute top-0 right-3">
              <DiscordConnectBtn />
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
                <MenuItem
                  icon={<MdDashboardCustomize />}
                  onClick={() => router.push('/owner/dashboard')}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  icon={<AiFillInfoCircle />}
                  onClick={() => router.push('/landing')}
                >
                  Discord HOME AI ?
                </MenuItem>
                <MenuItem
                  icon={<FaRobot />}
                  onClick={() => router.push('/guild/2')}
                >
                  Sample Page
                </MenuItem>
                <MenuItem
                  icon={<FaRobot />}
                  onClick={() => router.push('/guild/1')}
                >
                  Sample Page 🇯🇵
                </MenuItem>
                {user && (
                  <MenuItem icon={<BiLogOut />} onClick={logout}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </ProSidebar>
          </div>
          <animated.div style={stylesSideNav} />

          {/* Contents */}
          <div className="w-full p-3 lg:p-8 pb-48 md:pl-14 lg:pl-16">
            {props.children}
          </div>
        </div>

        <div className="h-24" />
      </div>
    </>
  );
};

export default DefaultLayout;
