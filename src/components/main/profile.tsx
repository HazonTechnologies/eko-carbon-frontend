import React, { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import ReactHtmlParser from "react-html-parser";

import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  DeleteFilled,
  EditOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Divider } from "antd";
import imageLoader from "../../lib/helperFunctions/loader";
import { ProfileInfo } from "../../models/listers";
import { dummyProfileInfo } from "../../lib/common/listerBoard";
import DefaultFul from "../../lib/common/defaultLister";
import QuillEditor from "./quillEditor";
import ListerDropFile from "../utilities/ListerDropFile";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(dummyProfileInfo);
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    setProfileInfo(dummyProfileInfo);
    setImages(dummyProfileInfo.about.pictures);
  }, []);

  const [defaultContent, setDefaultContent] = useState(DefaultFul());
  const [showEditor, toggleEditor] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const saveOrCancelEditor = (val: "save" | "cancel") => {
    toggleEditor(!showEditor);
    console.log(val);
    if (val === "cancel") {
      toggleEditor(false);
      return;
    }
    // make request to server
    console.log(defaultContent);
  };

  useEffect(() => {
    if (!files[0]) return;
    if (images.find((image) => image === URL.createObjectURL(files[0]))) return;
    setImages([...images, URL.createObjectURL(files[0])]);
  }, [files]);

  const remove = (item: string | Blob) => {
    console.warn(item);
    const selectedItemIndex = images.findIndex((image) => image === item);
    console.log(selectedItemIndex, images);
    if (selectedItemIndex < 0) return;
    images.splice(selectedItemIndex, 1);
    setImages([...images]);
  };

  useEffect(() => {
    console.log(showEditor);
  }, [showEditor]);
  return (
    <div className="flex flex-col gap-4 p-4 bg-secondary-high m-2 rounded-l mt-8">
      <div id="overview">
        <h2 className="text-base my-3">{profileInfo.overview.header}</h2>
        <h6 className="opacity-60 my-2 text-xs">
          {profileInfo.overview.subheader}
        </h6>
        <Divider />
        <p className="bg-tertiary-low text-tertiary-high p-6 rounded">
          {profileInfo.overview.summary}
        </p>
        <ul className="">
          <PhotoProvider>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 my-3 items-center cursor-pointer">
              {images.map((item) => (
                <div
                  key={item}
                  className="flex flex-col hover:bg-primary-medium"
                >
                  <PhotoView src={item}>
                    <Image
                      className="hover:scale-110"
                      unoptimized={true}
                      loader={imageLoader}
                      src={item}
                      height={250}
                      width={250}
                      alt={item}
                    />
                  </PhotoView>
                  {/* <DeleteTwoTone /> */}
                  {/* <DeleteFilled /> */}
                  <DeleteFilled
                    onClick={() => remove(item)}
                    className=" py-1 rounded-b-xl bg-primary-high text-xl text-[#dd3a3a]"
                  />
                </div>
              ))}
              <ListerDropFile
                acceptedFileTypes={["jpg", "jpeg", "png"]}
                allowMultiple={false}
                files={files}
                setFiles={setFiles}
              />
            </div>
          </PhotoProvider>
        </ul>
      </div>
      <Divider className="my-1" />
      <div className="">
        {!showEditor && (
          <div className="flex justify-end">
            <EditOutlined
              onClick={() => toggleEditor(true)}
              className="editContent text-lg"
            />
          </div>
        )}
        {!showEditor && ReactHtmlParser(defaultContent)}
      </div>
      {showEditor && (
        <QuillEditor
          content={defaultContent}
          setContent={setDefaultContent}
          defaultVal={defaultContent}
          title="Edit Company Profile"
          actionTriggered={saveOrCancelEditor}
        />
      )}
    </div>
  );
};

export default Profile;
