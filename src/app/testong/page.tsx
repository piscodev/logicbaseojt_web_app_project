'use client';

import { useState } from 'react';

export default function PusherTestPage() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    await fetch('/api/pusher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Pusher Test</h1>
      <input
        className="border p-2 w-full mb-2"
        type="text"
        value={message}
        placeholder="Type your message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send via Pusher
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Try opening this page in another tab to see the alert when a message is triggered.
      </p>
    </main>
  );
}
