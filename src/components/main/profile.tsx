import { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import Image from "next/image";
import { Divider } from "antd";
import imageLoader from "../../lib/helperFunctions/loader";
import { ProfileInfo } from "../../models/listers";
import { dummyProfileInfo } from "../../lib/common/listerBoard";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(dummyProfileInfo);

  useEffect(() => {
    setProfileInfo(dummyProfileInfo);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-8 bg-secondary-high m-4 rounded-l mt-8">
      <div id="overview">
        <h2 className="text-base my-3">{profileInfo.overview.header}</h2>
        <h6 className="opacity-60 my-2 text-xs">
          {profileInfo.overview.subheader}
        </h6>
        <Divider />
        <p className="bg-tertiary-low text-tertiary-high p-6 rounded">
          {profileInfo.overview.summary}
        </p>
      </div>
      <div>
        <h2 className="text-base my-3">{profileInfo.about.header}</h2>
        <p className="my-4">{profileInfo.about.summary}</p>
        <ul className="!list-disc m-2 mb-4 p-4">
          {profileInfo.about.list.map((list) => (
            <li className="py-2" key={list}>
              {list}
            </li>
          ))}
        </ul>
        <ul className="flex gap-6 items-center">
          {profileInfo.about.pictures.map((picture) => (
            <Image
              key={picture}
              unoptimized={true}
              loader={imageLoader}
              src={picture}
              height={200}
              width={200}
              alt={picture}
            />
          ))}
        </ul>
      </div>
      <div className="my-2">
        <h2 className="text-base my-3">{profileInfo.target.header}</h2>
        <div className="flex flex-col gap-6">
          {profileInfo.target.summary.map((summary) => (
            <p key={summary}>{summary}</p>
          ))}
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-base my-3">{profileInfo.extra.header}</h2>
        <div className="flex flex-col gap-6">
          {profileInfo.extra.summary.map((summary) => (
            <p key={summary}>{summary}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
