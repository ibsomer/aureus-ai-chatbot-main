
'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder('utf-8');
    let assistantMessage: Message = { role: 'assistant', content: '' };

    const processStream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMessage.content += chunk;
        setMessages([...newMessages, { ...assistantMessage }]);
      }
    };

    await processStream();
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex flex-col items-center justify-between p-8 h-screen">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div ref={chatContainerRef} className="p-4 h-[70vh] overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            className="flex-1 border rounded px-2 py-1 mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
