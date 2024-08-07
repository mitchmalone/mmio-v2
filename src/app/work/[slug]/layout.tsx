import { Hidden, ScrollArea, View, Text } from "reshaped";
import ArticleItem from "@/components/ArticleItem";
import LayoutContent from "@/components/LayoutContent";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import { getAllFrontmatters } from "@/utils/github_api";
import config from "@/config";
import slugify from "slugify";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const res: any = await getAllFrontmatters();
  const data = res.map(({ data }: any) => data);

  return (
    <>
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
                  const workSlug = slugify(work.name, { lower: true });
                  const workHref = `/work/${workSlug}`;
                  return (
                    <ArticleItem
                      key={workHref}
                      title={work.name}
                      date={work.date.start}
                      href={workHref}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollArea>
        </View>
      </Hidden>
      <LayoutContent noPadding={true}>{children}</LayoutContent>
    </>
  );
}
