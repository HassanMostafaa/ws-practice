export type ServerToClientEvents = {
  message: (payload: { content: string }) => void;
};
