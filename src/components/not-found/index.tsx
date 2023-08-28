import { Center, Image, Box } from "@mantine/core";
import React from "react";
import { IMAGE_404 } from "../../common/index";
export default function NotFound() {
  return (
    <React.Fragment>
      <Center>
        <Box py="lg">
          <Image src={IMAGE_404} alt="not-found" maw={500} />
        </Box>
      </Center>
    </React.Fragment>
  );
}
