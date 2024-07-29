import {
  Home,
  Feather,
  Twitter,
  GitHub,
  Linkedin,
  Camera,
  Edit2,
  Briefcase,
  Layers,
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
          icon: Edit2,
          title: "Medium Articles",
          href: "https://mitchmalone.medium.com",
        },
        {
          icon: Briefcase,
          title: "Nomad More",
          href: "https://nomadmo.re",
        },
        {
          icon: Camera,
          title: "Photography",
          href: "https://mitchmalone.photography",
        },
      ],
    },
    {
      title: "Online",
      items: [
        {
          icon: Linkedin,
          title: "Linkedin",
          href: "https://www.linkedin.com/in/mitchmalone",
        },
        {
          icon: Twitter,
          title: "Twitter",
          href: "https://twitter.com/mitch__malone",
        },
        {
          icon: GitHub,
          title: "GitHub",
          href: "https://github.com/mitchmalone",
        },
      ],
    },
  ],
};

export default config;
