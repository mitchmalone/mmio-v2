import React from "react";
import { Container, View, Text } from "reshaped";
import LayoutContent from "@/components/LayoutContent";
import LayoutSubmenu from "@/components/LayoutSubmenu";
import config from "@/config";

const Page = () => {
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
            <View gap={1}>
              <Text as="h1" variant="featured-1" weight="bold">
                Stack
              </Text>
            </View>
          </View>
        </Container>
      </LayoutContent>
    </div>
  );
};

export default Page;
