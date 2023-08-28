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
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ProjectType } from "../../common/types";
import { RootState } from "../../store/store";
import FormCreactProject from "../project/FormCreate";
import ProjectCard from "../project/ProjectCard";
import { activeProject } from "../../store/features/project";

function RootLayout() {
  const projectsState = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const handlerEnvButton = useCallback((id: string) => {
    dispatch(activeProject(id));
  }, []);
  return (
    <AppShell
     
      navbar={
        <Navbar width={{ base: 250 }} height ="100%" p="xs">
          <Stack py="md">
            {projectsState && projectsState.list[0] && (
              <React.Fragment>
                {projectsState.list.map((item: ProjectType) => {
                  return (
                    <React.Fragment key={item.id}>
                      <ProjectCard
                        item={item}
                        isActive={projectsState.idAcitve === item.id}
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
              <FormCreactProject onClose={close} />
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
