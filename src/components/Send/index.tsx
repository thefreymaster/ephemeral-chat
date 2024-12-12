import { Button, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";
import "./send.css";

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
      <Input
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        colorScheme="brand"
        color="brand.200"
        borderRadius="25px 0px 0px 25px"
        borderRightRadius={0}
        backgroundColor="brand.800"
        variant="filled"
        placeholder="Start typing..."
        onKeyDown={handleKeyDown}
        autoFocus
        focusBorderColor="transparent"
        _hover={{
          backgroundColor: "brand.700",
        }}
        style={{
          outline: "none !important",
        }}
        outline="none"
        _focus={{
          outline: "none !important",
          "-webkit-box-shadow": "none",
          "box-shadow": "none",
          borderRadius: "25px 0px 0px 25px",
          color: "white",
          backgroundColor: "brand.600",
        }}
        opacity="1"
        zIndex={100}
        isDisabled={!sessionId}
      />
      <Button
        isDisabled={!sessionId || !message?.length}
        borderLeftRadius={0}
        opacity={1}
        zIndex={100}
        colorScheme={!sessionId || !message?.length ? "brand" : "orange"}
        onClick={send}
        borderRadius="0px 25px 25px 0px"
        border="2px solid"
        borderColor="brand.300"
        borderWidth={0}
      >
        <IoSendSharp />
      </Button>
    </>
  );
};
