import { Option } from "../../models/utilities";

export const typeHeader = "What would you like to do ?";
export const typeSubHeader =
  "Share your intent with us for a more customized experience";
export const userTypes: Option[] = [
  {
    title: "Calculate & Offset Carbon Footprint",
    description: "Calculate and offset your carbon footprint",
    value: "offset",
    icon: "pluscircleoutlined",
  },
  {
    title: "List Green Projects",
    description: "List your environmentally friendly projects",
    value: "list",
    icon: "bulboutlined",
  },
];
export const offsetTypes: Option[] = [
  {
    title: "Calculate & Offset my Personal Emissions",
    description: "Calculate and offset your carbon footprint",
    value: "personal",
    icon: "pluscircleoutlined",
  },
  {
    title: `Calculate & Offset my Organisation's Emissions`,
    description: "Calculate and offset your carbon footprint",
    value: "organisation",
    icon: "pluscircleoutlined",
  },
];
