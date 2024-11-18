import { ButtonType } from "./button";
import { ChipType } from "./chips";

export interface AccordionType {
  title: string;
  expanded?: boolean;
  editorContent?: string;
  ctaButton?: ButtonType[];
  description?: string;
  breadcrumbPath?: string[];
  language: "typescript" | "javascript" | "html" | "css" | "json";
  technologyChips?: ChipType[];
}
