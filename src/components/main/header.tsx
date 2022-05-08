// import Link from "next/link";
import {
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
    <nav className="flex sm:gap-x-8 gap-x-3 items-center text-base">
      <p id="search">
        <SearchOutlined />
      </p>
      <p id="setting">
        <SettingOutlined />
      </p>
      <p id="notification">
        <BellOutlined />
      </p>
      <p className="rounded-3xl text-sm pb-2.5 -mb-2 px-2.5 p-1 border border-secondary-mid" id="avatar">
        <UserOutlined />
      </p>
    </nav>
  </header>
);

export default Header;
