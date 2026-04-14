"use client";

import { WebSocketComposer } from "./WebSocketComposer";
import { WebSocketMessageList } from "./WebSocketMessageList";
import { WebSocketStatusBanner } from "./WebSocketStatusBanner";
import { WebSocketWindowHeader } from "./WebSocketWindowHeader";
import { useTestWebsocket } from "./utils/useTestWebsocket";
import { useWebSocketContentSwitcher } from "./utils/useWebSocketContentSwitcher";

export const WebSocketTest = () => {
  const {
    canSend,
    connectionStatus,
    draftMessage,
    endpoint,
    isConnecting,
    messages,
    messagesContainerRef,
    sendMessage,
    setDraftMessage,
    statusMessage,
    trackMessagesScroll,
  } = useTestWebsocket();

  const messageItems = useWebSocketContentSwitcher(messages);

  return (
    <section className="w-full max-w-xl overflow-hidden rounded-lg border border-white/25 bg-black/30">
      <WebSocketWindowHeader
        endpoint={endpoint}
        messageCount={messageItems.length}
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
