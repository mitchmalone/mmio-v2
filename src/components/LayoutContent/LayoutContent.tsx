"use client";

import { ReactNode } from "react";
import { View, ScrollArea } from "reshaped";

type Props = {
  noPadding: boolean;
  children: ReactNode;
};

const LayoutContent = (props: Props) => {
  const { noPadding, children } = props;

  return (
    <View grow height="100dvh" padding={noPadding ? 0 : 4}>
      <ScrollArea scrollbarDisplay="hover">{children}</ScrollArea>
    </View>
  );
};

export default LayoutContent;
