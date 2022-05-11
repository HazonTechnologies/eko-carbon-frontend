/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-closing-tag-location */
// import Link from "next/link";
import { AlignCenterOutlined, PercentageOutlined } from "@ant-design/icons";
import { NextPage } from "next";
// import { Avatar, Badge } from "antd";
import Link from "next/link";

// import imageLoader from "../../lib/helperFunctions/loader";
// import headerLinks from "../../lib/common/links";

const SideNav: NextPage<any> = ({ isSideNavOpen, setIsSideNavOpen }) => (
  <>
    <div
      onClick={() => setIsSideNavOpen(true)}
      className={`w-[100vw] h-[100vh] ${
        !isSideNavOpen ? "opactity-100" : "opacity-0"
      } sm:hidden fixed bg-bg_overlay`}
    ></div>
    <nav className="text-md fixed flex flex-col gap-y-6 w-[220px] bg-secondary-high h-[100vh] top-0 left-0 pt-[15vh] px-[10px]">
      <Link href="/listers">
        <a className="flex items-center gap-x-4 px-2 py-2 rounded">
          <AlignCenterOutlined className="rotate-90" />
          <span>Ejiro &amp; Sons</span>
        </a>
      </Link>
      <Link href="/listers">
        <a className="flex items-center gap-x-4 px-2 py-2 rounded">
          <PercentageOutlined />
          <span>Pre-Assessment</span>
        </a>
      </Link>
    </nav>
  </>
);

export default SideNav;
