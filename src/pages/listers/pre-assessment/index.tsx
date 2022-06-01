import { useState } from "react";
import EnergyEfficient from "../../../components/main/energyEfficient";
import EnergyPhotovolatic from "../../../components/main/energyphotovolt";
import RecyclePreAssessment from "../../../components/main/recyclePreAssessment";
import SelectUI from "../../../components/utilities/SelectUI";
import ListerLayout from "../../../layouts/listerLayout";
import { Option as OptionType } from "../../../models/utilities";

const menuItem: OptionType[] = [
  {
    title: "Recyclable Materials",
    value: "recyclableMaterial",
  },
  {
    title: "Energy Photovolatic / Mini-grid",
    value: "energyPhotovolatic",
  },
  {
    title: "Energy Efficient: Clean Cook Stove",
    value: "energyEfficient",
  },
];

const PreAssessment = () => {
  const [selected, selectOption] = useState<null | string>(
    "recyclableMaterial"
  );

  const onSubmit = (values: any) => {
    console.log(values);
  };
  const onError = (values: any) => {
    console.log(values);
  };

  return (
    <div className="w-[350px] lg:w-[600px] m-[auto] my-2">
      <div className="">
        <h2 className="font-header text-xl">Pre-Assessment Calculator</h2>
        <p>Get an overview of a pre-assesment calculator</p>
      </div>
      <div className="shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <p className="my-2">I would liike to pre-assess this project type</p>
        <SelectUI
          width="w-[300px]"
          textSize="text-sm"
          menuItem={menuItem}
          selected={selected}
          selectOption={selectOption}
        />
        {selected === "recyclableMaterial" && (
          <RecyclePreAssessment onSubmit={onSubmit} onError={onError} />
        )}
        {selected === "energyPhotovolatic" && (
          <EnergyPhotovolatic onSubmit={onSubmit} onError={onError} />
        )}
        {selected === "energyEfficient" && (
          <EnergyEfficient onSubmit={onSubmit} onError={onError} />
        )}
      </div>
    </div>
  );
};
PreAssessment.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default PreAssessment;
