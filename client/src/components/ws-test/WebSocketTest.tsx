"use client";
import React, { useEffect } from "react";

export const WebSocketTest = () => {
  const [state, setState] = React.useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("WebSocketTest component mounted");
  }, []);
  return <div>{state}</div>;
};
