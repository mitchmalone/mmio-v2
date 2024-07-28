/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button, Text, View } from "reshaped";

type DialogMediumProps = { href: string; isLocked: boolean };

const DialogMedium = ({ href, isLocked }: DialogMediumProps) => {
  const copyHasLocked = isLocked ? "paid" : "free";

  return (
    <div className="ct--article-modal">
      <View direction="column" gap={6}>
        <View direction="row" gap={4}>
          <img src="/img/medium-logo.svg" alt="Medium.com" loading="lazy" />
          <Text as="h2" variant="featured-2" weight="bold">
            {copyHasLocked.charAt(0).toUpperCase() + copyHasLocked.slice(1)}{" "}
            article on Medium.com
          </Text>
        </View>
        <Text color="neutral-faded" variant="body-2">
          Keep reading this <strong>{copyHasLocked}</strong> on Medium.com by
          clicking the link below.
        </Text>
        <View width="fit-content">
          <a href={href} target="_blank" rel="noreferrer">
            <Button color="primary" variant="outline">
              Go to article
            </Button>
          </a>
        </View>
      </View>
    </div>
  );
};

export default DialogMedium;
