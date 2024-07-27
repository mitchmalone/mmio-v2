import LayoutContent from "@/components/LayoutContent";
import LayoutSubmenu from "@/components/LayoutSubmenu";
import config from "@/config";
import { Container, View, Text } from "reshaped";

export default function Home() {
  return (
    <div className="stacking">
      <LayoutSubmenu />

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
                Hello there!
              </Text>
            </View>
          </View>
        </Container>
      </LayoutContent>
    </div>
  );
}
