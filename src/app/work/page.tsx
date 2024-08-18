import { Hidden, ScrollArea, View, Text } from "reshaped";
import ArticleItem from "@/components/ArticleItem";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import { getAllFrontmatters } from "@/utils/github_api";
import { getWorksDirContents } from "@/utils/markdown_api";
import LayoutSubmenu from "@/components/LayoutSubmenu";
import config from "@/config";

export default async function Page() {
  const data: any = await getWorksDirContents();

  return (
    <>
      <LayoutSubmenu title={config.menu[1].title} data={data} />
      <Hidden
        hide={{
          /**
           * Hide on small viewports if we're on the article route
           */
          s: true,
          l: false,
        }}
      >
        <View
          width={{ s: "100%", l: "320px", xl: "384px" }}
          height="100%"
          backgroundColor="elevation-base"
        >
          <ScrollArea
            scrollbarDisplay="hover"
            className="ct--divider"
            height="100vh"
          >
            <View padding={{ s: 4, l: 6 }} paddingBlock={3} gap={6}>
              <View direction="row" gap={4} align="center">
                <Hidden hide={{ s: false, l: true }}>
                  <LayoutMenuModal />
                </Hidden>
                <View.Item grow>
                  <Text variant="body-3" weight="bold">
                    {config.menu[2].title}
                  </Text>
                </View.Item>
              </View>

              <View gap={1}>
                {data.map((work: any) => {
                  const workHref = `/work/${work.slug}`;
                  return (
                    <ArticleItem
                      key={workHref}
                      title={work.title}
                      date={work.startDate}
                      href={workHref}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollArea>
        </View>
      </Hidden>
    </>
  );
}
