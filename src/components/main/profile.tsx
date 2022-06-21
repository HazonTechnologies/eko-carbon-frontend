import React, { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { Divider } from "antd";
import { ProfileInfo } from "../../models/listers";
import { dummyProfileInfo } from "../../lib/common/listerBoard";
import Gallery from "./gallery";
import {
  AddListerCompanyPicUrl,
  GetListerCompanyPicUrl,
  RemoveListerCompanyPicUrl,
  UpdateListerCompanyDesUrl,
} from "../../lib/common/endpoints";
import Editor from "./editor";
import { useUser } from "../../context/userCtx";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(dummyProfileInfo);
  const {
    state: { userPayload },
  } = useUser();
  useEffect(() => {
    setProfileInfo(dummyProfileInfo);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 bg-secondary-high m-2 rounded-l mt-8">
      <div id="overview">
        <h2 className="text-base my-3">{userPayload?.profile.company.businessName ?? profileInfo.overview.header}</h2>
        <h6 className="opacity-60 my-2 text-xs">
          {profileInfo.overview.subheader}
        </h6>
        <Divider />
        <p className="bg-tertiary-low text-tertiary-high p-6 rounded">
          {userPayload?.profile.company.summary ?? profileInfo.overview.summary}
        </p>
        <Gallery
          imageListUrl={GetListerCompanyPicUrl}
          deleteUrl={RemoveListerCompanyPicUrl}
          addUrl={AddListerCompanyPicUrl}
        />
      </div>
      <Divider className="my-1" />
      <Editor setContentUrl={UpdateListerCompanyDesUrl} />
    </div>
  );
};

export default Profile;
