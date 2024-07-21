import React from "react";
import LayoutContent from "@/components/LayoutContent";
import { Container, View, Text } from "reshaped";

const Page = () => {
  return (
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
  );
};

export default Page;
