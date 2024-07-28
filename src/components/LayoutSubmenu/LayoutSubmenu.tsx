"use client";

import { View, Text, Hidden, ScrollArea } from "reshaped";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import ArticleItem from "@/components/ArticleItem";
import { ArticleInfo } from "@/types";

type LayoutSubmenuProps = {
  title?: string;
  data?: any[];
};

const LayoutSubmenu = ({ title = "", data = [] }: LayoutSubmenuProps) => {
  return (
    <>
      <Hidden
        hide={{
          s: false,
          l: true,
        }}
      >
        {(className) => (
          <View
            width={{ s: "100%", l: "320px", xl: "384px" }}
            height="100%"
            backgroundColor="elevation-base"
            className={className}
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
                      {title}
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
                        date={article.published_at}
                        href={articleHref}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollArea>
          </View>
        )}
      </Hidden>
    </>
  );
};

export default LayoutSubmenu;
