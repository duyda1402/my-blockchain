import { ProjectType } from "../common/types";
import { Group, Avatar, Text, UnstyledButton } from "@mantine/core";

interface ProjectCardProps extends React.ComponentPropsWithoutRef<"button"> {
  item: ProjectType;
  isActive?: boolean;
}

function ProjectCard({ item, isActive, ...others }: ProjectCardProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor: isActive ? theme.colors.violet[0] : "",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.violet[1],
        },
      })}
      {...others}
    >
      <Group>
        {item.image ? (
          <Avatar src={item.image} radius="xl" />
        ) : (
          <Avatar src={item.image} radius="xl" color="violet">
            {item.displayName.charAt(0)}
          </Avatar>
        )}
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500} lineClamp={1}>
            {item.displayName}
          </Text>

          <Text color="dimmed" size="xs">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
export default ProjectCard;
