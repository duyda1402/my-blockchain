import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Stack,
  Textarea,
  Box,
  Avatar,
  Tooltip,
  Flex,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { toSvg } from "jdenticon";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/features/project";

type FormType = {
  name: string;
  description: string;
};
type FormCreactProjectProps = {
  onClose: () => void;
};
function FormCreactProject({ onClose }: FormCreactProjectProps) {
  const [iconProject, setIconProject] = useState<string>("");
  const [idProject, setIdProject] = useState<string>("");
  const dispatch = useDispatch();
  const generateIcon = useCallback(() => {
    const id = uuidv4();
    const svgString = toSvg(id, 300);
    setIdProject(id);
    setIconProject(svgString);
  }, []);

  useEffect(() => {
    generateIcon();
  }, []);

  const form = useForm<FormType>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : "Invalid Display Name",
    },
  });

  const handlerSubmit = useCallback(
    (values: FormType) => {
      dispatch(
        addProject({
          name: values.name,
          description: values.description,
          id: idProject,
          image: iconProject,
        })
      );
      onClose();
    },
    [iconProject, idProject]
  );
  return (
    <React.Fragment>
      <form onSubmit={form.onSubmit(handlerSubmit)}>
        <Stack>
          <Flex gap="lg">
            <Box onClick={() => generateIcon()}>
              <Tooltip label="refresh">
                <Avatar
                  size="xl"
                  radius="md"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    iconProject
                  )}`}
                  alt="icon"
                />
              </Tooltip>
            </Box>

            <Stack sx={{ flexGrow: 1 }}>
              <TextInput
                withAsterisk
                label="Project id"
                value={idProject}
                disabled
              />
            </Stack>
          </Flex>
          <TextInput
            withAsterisk
            sx={{ flexGrow: 1 }}
            label="Project Name"
            placeholder="Project 1"
            {...form.getInputProps("name")}
          />
          <Textarea
            placeholder="Your description"
            label="Description"
            {...form.getInputProps("description")}
          />
          <Group position="right" mt="md">
            <Button
              type="button"
              color="gray"
              variant="subtle"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" color="violet" variant="light">
              New
            </Button>
          </Group>
        </Stack>
      </form>
    </React.Fragment>
  );
}

export default FormCreactProject;
