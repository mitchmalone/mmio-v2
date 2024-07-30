"use client";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "@/components/MdxContent";
import IndexMDX from "@/posts/index.mdx";

const IndexPageContent = () => {
  return (
    <MDXProvider components={components}>
      <IndexMDX />
    </MDXProvider>
  );
};

export default IndexPageContent;
