import { Box, Text, useTheme } from "@chakra-ui/react";

export const Messages = ({
  messages,
  user,
}: {
  messages: Array<{ message: string; messageAuthor: string }>;
  user: string;
}) => {
  const theme = useTheme();

  return (
    <Box>
      {messages.map((m, i) => (
        <Box
          key={m.messageAuthor + m.message + i}
          display="flex"
          flexDir="column"
          margin="2"
          padding="2"
          backgroundColor={
            m.messageAuthor === user
              ? theme.colors.gray["700"]
              : theme.colors.gray["800"]
          }
          borderRadius="md"
        >
          <Text color={theme.colors.gray["500"]} fontSize="xs">
            {m.messageAuthor === user ? "You" : m.messageAuthor}
          </Text>
          <Text color={theme.colors.gray["200"]} fontSize="md">
            {m.message}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
