"use client";

import formatDate from "@/utils/date";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem, Text, View } from "reshaped";

type Props = {
  title: string;
  date: string; // YYYY-MM-DD HH:MM:SS
  href: string;
};

const ArticleItem = (props: Props) => {
  const { title, date, href } = props;
  const pathname = usePathname();

  return (
    <MenuItem.Aligner>
      <NextLink href={href} passHref legacyBehavior>
        <MenuItem
          className="ct--rounded-corners"
          roundedCorners
          selected={href === pathname}
          color="neutral"
        >
          <View gap={0.5}>
            <Text>{title}</Text>
            {date && (
              <Text color="neutral-faded" weight="regular">
                {formatDate(date)}
              </Text>
            )}
          </View>
        </MenuItem>
      </NextLink>
    </MenuItem.Aligner>
  );
};

export default ArticleItem;
