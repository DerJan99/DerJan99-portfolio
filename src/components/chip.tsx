import { Chip as NextUIChip } from "@nextui-org/chip";

import { ChipType } from "@/types";

export const Chip = ({ text, color = "success" }: ChipType) => {
  return <NextUIChip color={color}>{text}</NextUIChip>;
};
