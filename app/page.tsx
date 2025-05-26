'use client';

import { useState, useEffect } from 'react';
import Chat from '@/components/Chat';

export default function ChatPage() {
  const [apiKeyApp, setApiKeyApp] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKeyApp') || '';
    setApiKeyApp(savedApiKey);
  }, []);

  return <Chat />;
}
