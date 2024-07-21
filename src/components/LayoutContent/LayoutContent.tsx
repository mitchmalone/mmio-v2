"use client";

import { ReactNode } from "react";
import { View, ScrollArea, Hidden } from "reshaped";

type Props = {
  noPadding: boolean;
  children: ReactNode;
};

const LayoutContent = (props: Props) => {
  const { noPadding, children } = props;

  return (
    <Hidden hide={{ s: true, l: false }}>
      <View grow height="100dvh" padding={noPadding ? 0 : 4}>
        <ScrollArea scrollbarDisplay="hover">{children}</ScrollArea>
      </View>
    </Hidden>
  );
};

export default LayoutContent;
