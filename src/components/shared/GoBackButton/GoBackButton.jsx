"use client";

import { IconButton, MatIcon } from "@/components/ui";
import { useRouter } from "next/navigation";
import { RenderWhen } from "..";

export const GoBackButton = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();
  return (
    <RenderWhen condition={window.innerWidth < 600}>
      <IconButton
        onClick={handleGoBack}
        style={{
          justifyContent: "flex-start",
        }}
      >
        <MatIcon iconName="arrow_back" />
      </IconButton>
    </RenderWhen>
  );
};
