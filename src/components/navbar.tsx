import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, LinkedInIcon, XingIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <NextUINavbar>
      <NavbarBrand>
        <Link className="font-extrabold text-inherit" href="/">
          <span>Jan von Sondern</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isExternal href={siteConfig.links.linkedin} title="LinkedIn">
            <LinkedInIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isExternal href={siteConfig.links.xing} title="XING">
            <XingIcon className="text-default-500" />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
