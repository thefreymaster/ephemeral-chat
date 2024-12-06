import { Box, ScaleFade, Text, useTheme } from "@chakra-ui/react";
import { useDeviceSize } from "../../hooks/useDeviceSize";

export const Messages = ({
  messages,
  user,
}: {
  messages: Array<{ message: string; messageAuthor: string }>;
  user: string;
}) => {
  const theme = useTheme();
  const { isMobile } = useDeviceSize();

  return (
    <Box display="flex" flexDir="column" width="100%">
      {messages.map((m, i) => (
        <Box display="flex" flex="1" flexGrow="grow">
          {m.messageAuthor !== user && (
            <Box display="flex" flex="1" flexGrow="grow" />
          )}
          <Box
            key={m.messageAuthor + m.message + i}
            display="flex"
            flexDir="column"
            flexWrap="wrap"
            margin="5px 5px 0px 5px"
            width={isMobile ? "75%" : "50%"}
            padding="2"
            backgroundColor={
              m.messageAuthor === user
                ? theme.colors.brand["700"]
                : theme.colors.brand["800"]
            }
            borderRadius={
              m.messageAuthor === user ? "5px 0px 5px 5px" : "5px 5px 5px 0px"
            }
            style={{
              display: "inline-block", // Treats each character as a block so it wraps
              whiteSpace: "pre", // Preserves spaces as they are
            }}
          >
            <Text color={theme.colors.brand["500"]} fontSize="xs">
              {m.messageAuthor === user ? "You" : m.messageAuthor}
            </Text>
            <Text
              color={theme.colors.brand["200"]}
              fontSize="md"
              display="flex"
              flexDir="row"
              flexWrap="wrap"
            >
              {Array.from(m.message).map((char, index) => (
                <ScaleFade in delay={index / 100}>
                  {char === " " ? "\u00A0" : char}
                </ScaleFade>
              ))}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
