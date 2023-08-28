import {
  AppShell,
  Button,
  Container,
  Modal,
  Navbar,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ProjectType } from "../../common/types";
import { RootState } from "../../store/store";
import FormCreactProject from "../project/FormCreate";
import ProjectCard from "../project/ProjectCard";

function RootLayout() {
  // Other code such as selectors can use the imported `RootState` type
  const projects = useSelector((state: RootState) => state.project.list);
  const [opened, { open, close }] = useDisclosure(false);
  const handlerEnvButton = useCallback((id: string) => {}, []);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height="100vh" p="xs">
          <Stack py="md">
            {projects && projects[0] && (
              <React.Fragment>
                {projects.map((item: ProjectType) => {
                  return (
                    <React.Fragment key={item.id}>
                      <ProjectCard
                        item={item}
                        //isActive={curActive === item.id}
                        onClick={() => handlerEnvButton(item.id)}
                      />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            )}
            <Button variant="light" color="violet" onClick={open}>
              New
            </Button>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
              <FormCreactProject />
            </Modal>
          </Stack>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container py="md">
        <Outlet />
      </Container>
    </AppShell>
  );
}
export default RootLayout;
