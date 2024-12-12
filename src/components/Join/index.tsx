import { Input, FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const navigate = useNavigate();

  const [sessionId, setValue] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.currentTarget?.value?.toLowerCase());
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
        placeholder="Join"
        variant="filled"
        outline="none"
        colorScheme="brand"
        color="brand.200"
        borderRadius="100px"
        backgroundColor="brand.800"
        textAlign="center"
        _hover={{
          backgroundColor: "brand.700",
        }}
        _focus={{
          outline: "none",
          borderColor: "inherit",
          "-webkit-box-shadow": "none",
          "box-shadow": "none",
          borderRadius: "100px",
        }}
      />
    </FormControl>
  );
};
