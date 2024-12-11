import { IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getSessionId } from "../../utils/getSessionId";

export const Create = () => {
  const navigate = useNavigate();
  const handleCreateSession = () => {
    const sessionId = getSessionId();
    navigate(`/${sessionId}`);
  };
  return (
    <IconButton
      icon={<FiPlus />}
      borderRadius="100px"
      colorScheme="brand"
      onClick={handleCreateSession}
      aria-label={""}
    />
  );
};
