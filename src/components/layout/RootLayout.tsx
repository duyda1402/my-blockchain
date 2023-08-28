import { Outlet } from "react-router-dom";
import { AppShell, Navbar, Container, Button, Stack } from "@mantine/core";
import React, { useCallback, useState } from "react";
import EnvButton from "../EnvButton";
import { EnvType } from "../../common/types";

function RootLayout() {
  const menu: EnvType[] | null = (() => {
    const envs = localStorage.getItem("envs");
    if (!envs) return null;
    return JSON.parse(envs);
  })();
  const [curActive, setCurActive] = useState(() => {
    const envId = localStorage.getItem("envActive");
    if (menu?.some((env: EnvType) => env.id === envId)) {
      console.log(menu);
      return envId;
    }
    return menu ? menu[0] : null;
  });
  const handlerEnvButton = useCallback((id: string) => {
    setCurActive(id);
    localStorage.setItem("envActive", id);
  }, []);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height="100vh" p="xs">
          <Stack py="md">
            {menu && menu[0] && (
              <React.Fragment>
                {menu.map((item: EnvType) => {
                  return (
                    <React.Fragment key={item.id}>
                      <EnvButton
                        item={item}
                        isActive={curActive === item.id}
                        onClick={() => handlerEnvButton(item.id)}
                      />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            )}
            <Button variant="light" color="violet">
              New
            </Button>
          </Stack>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
    >
      <Container py="md">
        <Outlet />
      </Container>
    </AppShell>
  );
}
export default RootLayout;
