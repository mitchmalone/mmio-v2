import { Hidden, ScrollArea, View, Text } from "reshaped";
import ArticleItem from "@/components/ArticleItem";
import MdxContent from "@/components/MdxContent";
import LayoutContent from "@/components/LayoutContent";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import { getUserArticles, getArticleMarkdown } from "@/utils/medium_api";
import { ArticleInfo } from "@/types";

export async function generateStaticParams() {
  const data: any = await getUserArticles();
  return data.map((article: ArticleInfo) => ({
    slug: article.unique_slug,
  }));
}

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const split = slug.split("-");
  const lastElement = split.pop() as string;
  const markdown = await getArticleMarkdown(lastElement);
  const data: any = await getUserArticles();

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
          <ScrollArea scrollbarDisplay="hover" className="ct--divider">
            <View padding={{ s: 4, l: 6 }} paddingBlock={3} gap={6}>
              <View direction="row" gap={4} align="center">
                <Hidden hide={{ s: false, l: true }}>
                  <LayoutMenuModal />
                </Hidden>
                <View.Item grow>
                  <Text variant="body-3" weight="bold">
                    Writing
                  </Text>
                </View.Item>
              </View>

              <View gap={1}>
                {data.map((article: ArticleInfo) => {
                  const articleHref = `/article/${article.unique_slug}`;
                  return (
                    <ArticleItem
                      key={articleHref}
                      title={article.title}
                      date={new Date()}
                      href={articleHref}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollArea>
        </View>
      </Hidden>
      <LayoutContent noPadding={true}>
        <MdxContent source={markdown} parentUrl="/article" />
      </LayoutContent>
    </>
  );
}
