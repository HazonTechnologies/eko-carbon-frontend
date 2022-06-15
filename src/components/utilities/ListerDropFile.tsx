import { PlusOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
// import formatBytes from "../../lib/helperFunctions/formatBytes";
// import formatFileName from "../../lib/helperFunctions/formatFileName";

type FileTypes = "pdf" | "jpg" | "jpeg" | "png" | "gif" | "svg";

interface DropFileProp {
  allowMultiple: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  acceptedFileTypes: FileTypes[];
  title?: string;
  width?: number;
  height?: number;
}

const ListerDropFile = ({
  allowMultiple,
  setFiles,
  acceptedFileTypes,
  //   width,
  //   height,
  title,
}: DropFileProp) => {
  const processFile = (acceptedFile: File[], errors: any) => {
    //   toast.error("Hello")
    if (errors && errors.length) {
      toast.error(errors[0].errors[0].message);
      return;
    }
    if (acceptedFile.length) {
      const file = acceptedFile;
      if (!allowMultiple) return setFiles(file);
      setFiles((selectedFile) => [...file, ...selectedFile]);
    }
  };

  const acceptedFileType = useMemo(() => {
    const fileType: any = {};
    fileType[`image/*`] = [];
    acceptedFileTypes.forEach((file) => {
      if (
        file === "jpg" ||
        file === "png" ||
        file === "jpeg" ||
        file === "gif" ||
        file === "pdf"
      ) {
        fileType[`image/*`] = [...fileType[`image/*`], `.${file}`];
      }
    });
    return fileType;
  }, [acceptedFileTypes]);

  //   const expand = (cert: File) => {
  //     window.open(URL.createObjectURL(cert), "_blank", "fullScreen=yes");
  //   };

  return (
    <div className="">
      {title && <h2 className="pb-2">{title}</h2>}
      <Dropzone
        onDrop={processFile}
        accept={acceptedFileType}
        multiple={allowMultiple}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="border border-primary-lower h-[270px] w-[250px] flex flex-col items-center justify-center rounded py-3">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center">
                <p className="flex flex-col items-center opacity-50">
                  <PlusOutlined className="text-[35px] " />
                  <span>Upload Picture</span>
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ListerDropFile;
