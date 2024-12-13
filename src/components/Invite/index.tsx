import { Button, useClipboard } from "@chakra-ui/react";
import { useEffect } from "react";

export const Invite = () => {
  const { value, setValue, onCopy, hasCopied } = useClipboard("");

  useEffect(() => {
    setTimeout(() => {
      if (value.length > 0) {
        setValue("");
      }
    }, 5000);
  }, [value]);

  return (
    <Button
      onMouseEnter={() => setValue(window.location.href)}
      onClick={() => {
        onCopy();
      }}
      borderRadius={100}
      colorScheme="orange"
      fontSize="sm"
    >
      {hasCopied ? "Copied!" : "Invite"}
    </Button>
  );
};
