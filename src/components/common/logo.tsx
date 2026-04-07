import { ASSETS } from "@/constants/assets";
import { copy } from "@/constants/copy";

export default function Logo() {
  return (
    <img
      src={ASSETS.LOGO}
      alt={copy.brand.name}
      draggable={false}
      className="size-7 rounded-full object-cover"
    />
  );
}
