"use client";

import { WebSocketComposer } from "./components/WebSocketComposer";
import { WebSocketMessageList } from "./components/WebSocketMessageList";
import { WebSocketStatusBanner } from "./components/WebSocketStatusBanner";
import { WebSocketWindowHeader } from "./components/WebSocketWindowHeader";
import { useTestWebsocket } from "./utils/useTestWebsocket";
import { useWebSocketContentSwitcher } from "./utils/useWebSocketContentSwitcher";

export const WebSocketTest = () => {
  const {
    canSend,
    connectionStatus,
    displayName,
    draftDisplayName,
    draftMessage,
    endpoint,
    isConnecting,
    messages,
    messagesContainerRef,
    sendMessage,
    setDraftDisplayName,
    setDraftMessage,
    statusMessage,
    submitDisplayName,
    trackMessagesScroll,
  } = useTestWebsocket();

  const messageItems = useWebSocketContentSwitcher(messages);

  return (
    <section className="w-full  max-w-xl overflow-hidden rounded-lg border border-white/25 bg-black/30">
      <WebSocketWindowHeader
        displayName={displayName}
        draftDisplayName={draftDisplayName}
        endpoint={endpoint}
        messageCount={messageItems.length}
        onDisplayNameSubmit={submitDisplayName}
        onDraftDisplayNameChange={setDraftDisplayName}
        status={connectionStatus}
      />
      <WebSocketStatusBanner
        message={statusMessage}
        status={connectionStatus}
      />
      <WebSocketMessageList
        containerRef={messagesContainerRef}
        isConnecting={isConnecting}
        messages={messageItems}
        onScroll={trackMessagesScroll}
      />
      <WebSocketComposer
        canSend={canSend}
        connectionStatus={connectionStatus}
        draftMessage={draftMessage}
        onDraftMessageChange={setDraftMessage}
        onSendMessage={sendMessage}
      />
    </section>
  );
};
