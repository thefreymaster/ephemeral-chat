export const getSessionId = () => {
  const sessionId = Math.random().toString(36).substr(2, 4);

  return sessionId;
};
