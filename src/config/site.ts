export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jan's Portfolio",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Impressum",
      href: "/impressum",
    },
    {
      label: "Datenschutzerklärung",
      href: "/datenschutzerklaerung",
    },
  ],
  links: {
    github: "https://github.com/DerJan99",
    xing: "https://xing.com/profile/Jan_vonSondern",
    linkedin: "https://linkedin.com/in/jan-von-sondern/",
  },
};
