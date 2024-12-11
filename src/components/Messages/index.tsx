// @ts-nocheck
import { Box, ScaleFade, Text, useTheme } from "@chakra-ui/react";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { useParams } from "react-router-dom";

export const Messages = ({
  messages,
  user,
}: {
  messages: Array<{ message: string; messageAuthor: string }>;
  user: string;
}) => {
  const theme = useTheme();
  const { isMobile } = useDeviceSize();
  const { sessionId } = useParams();

  return (
    <Box display="flex" flexDir="column" width="100%">
      {messages?.[sessionId ?? ""]?.map((m, i) => (
        <Box display="flex" flex="1" flexGrow="grow">
          {m.messageAuthor !== user && (
            <Box display="flex" flex="1" flexGrow="grow" />
          )}
          <Box
            key={m.messageAuthor + m.message + i}
            display="flex"
            flexDir="column"
            flexWrap="wrap"
            margin="0px 20px 20px 20px"
            padding="5px 20px"
            width={isMobile ? "75%" : "50%"}
            backgroundColor={
              m.messageAuthor === user
                ? theme.colors.brand["100"]
                : theme.colors.brand["800"]
            }
            borderRadius={
              m.messageAuthor === user
                ? "100px 0px 100px 100px"
                : "100px 100px 100px 0px"
            }
            style={{
              display: "inline-block", // Treats each character as a block so it wraps
              whiteSpace: "pre", // Preserves spaces as they are
            }}
          >
            <Text
              color={
                m.messageAuthor === user
                  ? theme.colors.brand["800"]
                  : theme.colors.brand["100"]
              }
              fontSize="xs"
            >
              {m.messageAuthor === user ? "You" : m.messageAuthor}
            </Text>
            <Text
              color={
                m.messageAuthor === user
                  ? theme.colors.brand["800"]
                  : theme.colors.brand["100"]
              }
              fontSize="md"
              display="flex"
              flexDir="row"
              flexWrap="wrap"
              fontWeight="medium"
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
