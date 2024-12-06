import { Input, FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const navigate = useNavigate();

  const [sessionId, setValue] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.currentTarget?.value);
  };

  useEffect(() => {
    if (sessionId.length === 4) {
      navigate(`/${sessionId}`);
      setValue("");
    }
  }, [sessionId]);

  return (
    <FormControl>
      <Input
        maxW="120px"
        value={sessionId}
        onChange={(e) => handleInputChange(e)}
        placeholder="Join..."
        color="white"
        variant="filled"
        outline="none"
        _focus={{
          outline: "none",
          borderColor: "inherit",
          "-webkit-box-shadow": "none",
          "box-shadow": "none",
        }}
      />
    </FormControl>
  );
};
