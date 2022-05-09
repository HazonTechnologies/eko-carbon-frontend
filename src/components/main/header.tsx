// import Link from "next/link";
import {
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import Image from "next/image";

import imageLoader from "../../lib/helperFunctions/loader";
// import headerLinks from "../../lib/common/links";

const Header = () => (
  <header className="bg-tertiary-high sm:px-8 p-1 flex justify-between items-center text-secondary-mid">
    <h2>
      <Image
        priority={true}
        unoptimized={true}
        loader={imageLoader}
        src="/assets/icons/logo_white.svg"
        alt="Icon"
        width={160}
        height={60}
      />
    </h2>
    <nav className="flex sm:gap-x-8 gap-x-4 items-center text-lg">
      <p id="search">
        <SearchOutlined />
      </p>
      <p id="setting">
        <SettingOutlined />
      </p>
      <p id="notification">
        <Badge
          size="small"
          offset={[-2, 5]}
          className="!-mb-5 !text-xs"
          count={10}
          overflowCount={99}
        >
          <BellOutlined className="text-xl text-secondary-high" />
        </Badge>
      </p>
      <p>
        <Avatar
          size={28}
          className="!bg-transparent border border-secondary-high -mb-1"
          icon={<UserOutlined />}
        />
      </p>
    </nav>
  </header>
);

export default Header;
