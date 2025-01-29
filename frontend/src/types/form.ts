import { IconType } from "react-icons";

export interface AuthFormLink {
  text?: string;
  link: {
    text: string;
    url: string;
  };
  icon?: IconType;
}

export interface InputProps {
  name: string;
  label: string;
  inputType?: string;
  placeholder?: string;
}

