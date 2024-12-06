import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";

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
        colorScheme="brand"
        color="brand.200"
        borderRightRadius={0}
        backgroundColor="brand.800"
        variant="filled"
        placeholder="Start typing your message..."
        onKeyDown={handleKeyDown}
        autoFocus
        _hover={{
          backgroundColor: "brand.700",
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
        colorScheme="brand"
        onClick={send}
      >
        <IoSendSharp />
      </Button>
    </>
  );
};
