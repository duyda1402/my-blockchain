import { Text, Title, Box } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NotFound from "../../components/not-found";

export default function HomePage() {
  const curProject = useSelector(
    (state: RootState) => state.project.curProject
  );
  return (
    <React.Fragment>
      {curProject ? (
        <React.Fragment>
          <Box>
            <Title order={2} sx={{ textTransform: "capitalize" }}>
              {curProject?.name}
            </Title>
            <Text size="sm" color="gray">
              {curProject?.description}
            </Text>
          </Box>
        </React.Fragment>
      ) : (
        <NotFound />
      )}
    </React.Fragment>
  );
}
