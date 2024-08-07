import IndexPageContent from "@/components/IndexPageContent";
import LayoutContent from "@/components/LayoutContent";
import LayoutSubmenu from "@/components/LayoutSubmenu";
import { Container, View } from "reshaped";

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
              <IndexPageContent />
            </View>
          </View>
        </Container>
      </LayoutContent>
    </div>
  );
}
