"use client";

import React from "react";
import { View } from "reshaped";
import { MDXProvider } from "@mdx-js/react";
import { components } from "@/components/MdxContent";
import StackMDX from "@/posts/stack.mdx";

const Page = () => {
  return (
    <View direction="column" gap={6}>
      <MDXProvider components={components}>
        <StackMDX />
      </MDXProvider>
    </View>
  );
};

export default Page;
