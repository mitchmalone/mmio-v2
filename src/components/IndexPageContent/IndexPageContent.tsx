"use client";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "@/components/MdxContent";
import IndexMDX from "@/posts/index.mdx";
import { View } from "reshaped";

const IndexPageContent = () => {
  return (
    <View direction="column" gap={6}>
      <MDXProvider components={components}>
        <IndexMDX />
      </MDXProvider>
    </View>
  );
};

export default IndexPageContent;
