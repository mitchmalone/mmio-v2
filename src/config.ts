import {
  Home,
  Feather,
  Twitter,
  GitHub,
  Figma,
  CheckSquare,
  Mic,
  Briefcase,
  Layers,
  Package,
} from "react-feather";

const config = {
  app: {
    title: "Mitch Malone",
    subtitle: "Product Shaped Person",
    thumbnailUrl: "/img/logo.svg",
  },
  meta: {
    url: "https://reshaped-blog-starter.vercel.app",
    title: "Reshaped",
    description: "Blog starter built on top of Next.js and Reshaped",
    twitter: {
      username: "blvdmitry",
    },
  },
  menu: [
    {
      icon: Home,
      title: "Home",
      href: "/",
    },
    {
      icon: Feather,
      title: "Writing",
      href: "/article",
    },
    {
      icon: Layers,
      title: "Stack",
      href: "/stack",
    },

    {
      title: "Projects",
      items: [
        {
          icon: Compass,
          title: "Roamin' Amok",
          href: "https://www.roaminamok.com/",
        },
        {
          icon: Hexagon,
          title: "Ramen Amok",
          href: "https://ramenamok.com/",
        },
      ],
    },
    {
      title: "Online",
      items: [
        {
          icon: LinkedIn,
          title: "LinkedIn",
          href: "https://www.linkedin.com/in/mitchmalone/",
        },
        {
          icon: Instagram,
          title: "Instagram",
          href: "https://instagram.com/mitchmalone",
        },
        {
          icon: Twitter,
          title: "X",
          href: "https://x.com/mitch__malone",
        },
        {
          icon: GitHub,
          title: "GitHub",
          href: "https://github.com/mitchmalone",
        },
        {
          icon: Figma,
          title: "Figma",
          href: "https://www.figma.com/@mitchmalone",
        },
        {
          icon: ,
          title: "",
          href: "",
        },
        {
          icon: ,
          title: "",
          href: "",
        },
        {
          icon: ,
          title: "",
          href: "",
        },
        {
          icon: ,
          title: "",
          href: "",
        },
      ],
    },
  ],
};

export default config;