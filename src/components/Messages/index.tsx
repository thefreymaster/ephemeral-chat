import { Box, Text } from "@chakra-ui/react";

export const Messages = ({
  messages,
}: {
  messages: Array<{ message: string; messageAuthor: string }>;
}) => {
  return (
    <Box>
      {messages.map((m, i) => (
        <Text color="white" key={m.messageAuthor + m.message + i}>
          {m.messageAuthor}: {m.message}
        </Text>
      ))}
    </Box>
  );
};
