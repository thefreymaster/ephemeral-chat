import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Send = ({
  socket,
  message,
  setMessage,
}: {
  socket: any;
  message: string;
  setMessage(v: string): void;
}) => {
  const { sessionId } = useParams();

  const send = () => {
    socket.emit("send", { message, sessionId });
    setMessage("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      send();
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Flex flex="1" />
      <Input
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        colorScheme="gray"
        color="gray.200"
        borderRightRadius={0}
        backgroundColor="gray.800"
        variant="filled"
        placeholder="Start typing your message here..."
        onKeyDown={handleKeyDown}
        autoFocus
        _hover={{
          backgroundColor: "gray.700",
        }}
        outline="none"
        _focus={{
          outline: "none",
          borderColor: "inherit",
          "-webkit-box-shadow": "none",
          "box-shadow": "none",
          borderRadius: "5px 0px 0px 5px",
        }}
        isDisabled={!sessionId}
      />
      <Button
        isDisabled={!sessionId || !message?.length}
        borderLeftRadius={0}
        colorScheme="gray"
        onClick={send}
      >
        Send
      </Button>
    </>
  );
};
