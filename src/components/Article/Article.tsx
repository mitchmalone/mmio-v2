"use client";

import NextLink from "next/link";
import { ArrowLeft } from "react-feather";
import React, { type ReactNode } from "react";
import {
  Container,
  View,
  Text,
  Hidden,
  ActionBar,
  Button,
  useToggle,
} from "reshaped";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import s from "./Article.module.css";
import formatDate from "@/utils/date";

type Props = {
  children: ReactNode;
  title?: string;
  date?: string;
  intro?: string;
  dateRange?: [string, string];
  parentUrl?: string;
};

const Article = (props: Props) => {
  const { children, title, date, intro, dateRange, parentUrl } = props;
  const { activate, deactivate, active } = useToggle();
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const dateRangeDisplay = (dateRange: any) => {
    if (!dateRange) return undefined;

    if (!dateRange[1]) return formatDate(dateRange[0]);

    return `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`;
  };

  React.useEffect(() => {
    if (!titleRef.current || !headerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            deactivate();
          } else {
            activate();
          }
        });
      },
      { rootMargin: `-${headerRef.current.clientHeight}px` },
    );

    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [activate, deactivate]);

  return (
    <>
      <Hidden hide={{ s: false, l: true }}>
        <View
          position="fixed"
          insetTop={0}
          insetStart={0}
          insetEnd={0}
          zIndex={10}
        >
          <ActionBar position="top" attributes={{ ref: headerRef }}>
            <View gap={4} align="center" direction="row">
              {parentUrl ? (
                <Button.Aligner>
                  <NextLink href={parentUrl} passHref legacyBehavior>
                    <Button icon={ArrowLeft} variant="ghost" />
                  </NextLink>
                </Button.Aligner>
              ) : (
                <LayoutMenuModal />
              )}
              <View.Item grow>
                <Text
                  variant="body-3"
                  weight="medium"
                  maxLines={1}
                  className={[s.title, active && s["title--active"]]}
                >
                  {title}
                </Text>
              </View.Item>
            </View>
          </ActionBar>
        </View>
      </Hidden>
      <Container width="760px">
        <View
          gap={8}
          padding={{ s: 0, l: 10 }}
          paddingBlock={{ s: 20, l: 15 }}
          as="main"
        >
          {title && (
            <View gap={1}>
              <Text
                as="h1"
                variant="featured-1"
                weight="bold"
                attributes={{ ref: titleRef }}
              >
                {title}
              </Text>
              {date && (
                <Text variant="body-3" color="neutral-faded">
                  {formatDate(date)}
                </Text>
              )}
              {dateRange && (
                <Text variant="body-3" color="neutral-faded">
                  {dateRangeDisplay(dateRange)}
                </Text>
              )}
            </View>
          )}
          {intro && (
            <div className={s.content}>
              <Text color="neutral-faded" variant="body-2">
                {intro}
              </Text>
            </div>
          )}
          <div className={s.content}>{children}</div>
        </View>
      </Container>
    </>
  );
};

export default Article;
