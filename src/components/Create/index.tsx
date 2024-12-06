import { IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();
  const handleCreateSession = () => {
    const sessionId = Math.random().toString(36).substr(2, 4);
    navigate(`/${sessionId}`);
  };
  return (
    <IconButton
      icon={<FiPlus />}
      colorScheme="brand"
      onClick={handleCreateSession}
      aria-label={""}
    />
  );
};
