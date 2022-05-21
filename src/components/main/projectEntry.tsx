/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import randomColor from "randomcolor";

// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { ProfileInfo } from "../../models/listers";
import { dummyProfileInfo } from "../../lib/common/listerBoard";
import ButtonUI from "../utilities/ButtonUI";
import ModalPopUp from "../utilities/modal";
import DropFile from "../utilities/DropFile";

const { Option } = Select;
interface Type {
  name: string;
  value: string;
}
const projectType: Type[] = [
  {
    name: "Afforestation",
    value: "afforestation",
  },
  {
    name: "Alternative Energy",
    value: "altEnergy",
  },
];

interface ProjectEntryType {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectEntry = ({
  isModalVisible,
  setIsModalVisible,
}: ProjectEntryType) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(dummyProfileInfo);
  const [form] = Form.useForm();
  const [initialValues, setInitialValue] = useState(null);
  const [files, setFiles] = useState<File[]>([]);
  const tag = useRef<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const onFilter = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const saveToDraft = () => {
    console.log(form.getFieldsValue(), profileInfo);
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setInitialValue(values);
    setIsModalVisible(false);
  };
  const onError = (values: any) => {
    console.log(values);
  };

  const addToTags = () => {
    const inputRef: HTMLInputElement = tag?.current?.input;
    console.log(tag.current);
    const val = inputRef?.value;
    if (val && val !== "") {
      if (tags.find((tag) => tag === val)) return;
      setTags([...tags, val]);
      form.resetFields(["tag"]);
      tag.current.focus();
      inputRef.focus();
    }
  };

  const removeTag = (tag: string) => {
    const index = tags.findIndex((tg) => tg === tag);
    if (index < 0) return;
    tags.splice(index, 1);
    setTags(tags);
  };

  useEffect(() => {
    setProfileInfo(dummyProfileInfo);
  }, []);

  return (
    <ModalPopUp
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      title="Add New Project"
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={initialValues ?? {}}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Project Type"
          name="projectType"
          rules={[{ required: true, message: "Project Type is required!" }]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {projectType.length &&
              projectType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project Description"
          name="projectDes"
          rules={[
            {
              required: true,
              message: "Kindly fill in a description for your project!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Tonnes of co2"
          name="tonnes"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <DropFile
          title="Pictures?"
          acceptedFileTypes={["jpeg", "jpg", "png"]}
          files={files}
          setFiles={setFiles}
          allowMultiple={true}
        />
        <Form.Item
          label="Add external link describing this project"
          name="link"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Add Tags"
          name="tag"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <>
            <Input ref={tag} className="w-[90%]" />
            <PlusCircleOutlined
              className="text-xl ml-2 opacity-60"
              onClick={addToTags}
            />
            <div className="gap-y-4 mt-1 w-[90%]">
              {tags.length > 0 &&
                tags.map((tag) => (
                  <Tag
                    closable
                    onClose={() => removeTag(tag)}
                    color={randomColor()}
                    key={tag}
                  >
                    {tag}
                  </Tag>
                ))}
            </div>
          </>
        </Form.Item>

        <Form.Item className="mt-4">
          <div className="flex gap-x-2 justify-end w-full ">
            <ButtonUI
              bg="secondary-high"
              color="primary-high"
              className="bg-secondary-high h-[35px]"
              disabled={false}
              htmlType="button"
              onClickTrigger={() => setIsModalVisible(false)}
              width="25%"
            >
              Cancel
            </ButtonUI>
            <ButtonUI
              bg="tertiary-mid"
              className="bg-tertiary-mid hover:bg-tertiary-mid h-[35px]"
              disabled={false}
              onClickTrigger={() => saveToDraft()}
              htmlType="button"
              width="25%"
            >
              Save As Draft
            </ButtonUI>
            <ButtonUI
              className="h-[35px]"
              disabled={false}
              htmlType="submit"
              width="25%"
            >
              Submit
            </ButtonUI>
          </div>
        </Form.Item>
      </Form>
    </ModalPopUp>
  );
};

export default ProjectEntry;
