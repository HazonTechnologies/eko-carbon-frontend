import React, { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import ReactHtmlParser from "react-html-parser";

import { EditOutlined } from "@ant-design/icons";
import DefaultFul from "../../lib/common/defaultLister";
import QuillEditor from "./quillEditor";
import { useUser } from "../../context/userCtx";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { useLoading } from "../../context/loadingCtx";

interface EditorPropType {
  //   getContentUrl: string;
  setContentUrl: string;
}

const Editor = ({ setContentUrl }: EditorPropType) => {
  const { setLoadingStatus } = useLoading();
  const {
    state: { userPayload },
  } = useUser();
  const [content, setContent] = useState<string>(DefaultFul());
  useEffect(() => {
    console.warn(userPayload?.profile, userPayload?.profile.company.description);
    if (!userPayload?.profile?.company?.description) return;
    setContent(userPayload.profile.company.description);
  }, []);

  const [showEditor, toggleEditor] = useState<boolean>(false);

  const saveContent = (description: string) => {
    setLoadingStatus(true);
    postApi(setContentUrl, { description })
      .then((res) => {
        console.warn(res);
        if (!res.successful) return;
        console.warn("success", res);
      })
      .finally(() => setLoadingStatus(false));
  };

  const saveOrCancelEditor = (val: "save" | "cancel") => {
    if (val === "save") {
      saveContent(content);
      return;
    }

    toggleEditor(!showEditor);
    console.log(val);
    if (val === "cancel") {
      toggleEditor(false);
      return;
    }
    // make request to server
    console.log(content);
  };

  return (
    <>
      <div className="">
        {!showEditor && (
          <div className="flex justify-end">
            <EditOutlined
              onClick={() => toggleEditor(true)}
              className="editContent text-lg"
            />
          </div>
        )}
        {!showEditor && ReactHtmlParser(content)}
      </div>
      {showEditor && (
        <QuillEditor
          content={content}
          setContent={setContent}
          defaultVal={content}
          title="Edit Company Profile"
          actionTriggered={saveOrCancelEditor}
        />
      )}
    </>

  );
};

export default Editor;
