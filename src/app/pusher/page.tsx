// app/pusher-test/page.tsx
'use client';

import { useEffect } from 'react';

export default function PusherTestPage() {
  useEffect(() => {
    // Load the Pusher library dynamically
    const script = document.createElement('script');
    script.src = 'https://js.pusher.com/8.4.0/pusher.min.js';
    script.onload = () => {
      // @ts-ignore
      Pusher.logToConsole = true;

      // @ts-ignore 
      const pusher = new Pusher('ef4483522954235bdfa0', {
        cluster: 'ap1',
      });

      const channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function (data: any) {
        alert(JSON.stringify(data));
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Pusher Test</h1>
      <p>
        Try publishing an event to channel <code>my-channel</code> with event
        name <code>my-event</code>.
      </p>
    </main>
  );
}
