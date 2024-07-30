import React from "react";
import { Container, View } from "reshaped";
import LayoutContent from "@/components/LayoutContent";
import LayoutSubmenu from "@/components/LayoutSubmenu";
import config from "@/config";

const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="stacking">
      <LayoutSubmenu title={config.menu[2].title} />

      <LayoutContent noPadding>
        <Container width="760px">
          <View
            gap={8}
            padding={{ s: 0, l: 10 }}
            paddingBlock={{ s: 20, l: 15 }}
            as="main"
          >
            <View gap={1}>{children}</View>
          </View>
        </Container>
      </LayoutContent>
    </div>
  );
};

export default Page;
