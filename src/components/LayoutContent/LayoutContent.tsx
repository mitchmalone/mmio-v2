"use client";

import { ReactNode } from "react";
import { ScrollArea, View } from "reshaped";
import DialogMedium from "@/components/DialogMedium";

type Props = {
  href?: string;
  isLocked?: boolean;
  noPadding: boolean;
  children: ReactNode;
};

const LayoutContent = (props: Props) => {
  const { href = "", isLocked = false, noPadding, children } = props;

  if (href) {
    return (
      <View grow height="100dvh" padding={noPadding ? 0 : 4}>
        <div className="ct--article">
          <div>{children}</div>
          <div className="ct--article-gradient" />
          <DialogMedium isLocked={isLocked} href={href} />
        </div>
      </View>
    );
  }

  return (
    <View grow height="100dvh" padding={noPadding ? 0 : 4}>
      <ScrollArea scrollbarDisplay="hover">{children}</ScrollArea>
    </View>
  );
};

export default LayoutContent;
