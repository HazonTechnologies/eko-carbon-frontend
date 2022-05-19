/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker } from "antd";
import { useState } from "react";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { listerBreadNav } from "../../lib/common/links";
import { ListerLink } from "../../models/link";

const { RangePicker } = DatePicker;
const ListerBreadnav = () => {
  const [links, setActiveLink] = useState<ListerLink[]>(listerBreadNav);
  const [showDate, setShowDate] = useState<boolean>(true);

  const goTo = (selectedLink: string) => {
    if (selectedLink === "/listers/overview") {
      setShowDate(true);
    } else {
      setShowDate(false);
    }
    const allLinks = links.map((link) => {
      if (link.link === selectedLink) return { ...link, active: true };
      return { ...link, active: false };
    });
    setActiveLink(allLinks);
  };

  const onChange = (dates: RangeValue<Moment>, dateStrings: any[]) => {
    if (!dates || !dates.length) return;
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  };

  return (
    <div className="flex flex-wrap gap-y-2 my-2 justify-between items-center">
      <nav className="flex items-center gap-x-5 duration-400">
        {links.map((link) => (
          <button
            key={link.link}
            className={`${link.active && "boxProps"}
            duration-400 transition-all p-2 px-4 rounded`}
            type="button"
            onClick={() => goTo(link.link)}
          >
            {link.title}
          </button>
        ))}
      </nav>
      {showDate && (
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default ListerBreadnav;
