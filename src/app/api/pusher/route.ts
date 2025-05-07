// app/api/trigger/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1985773',
  key: 'ef4483522954235bdfa0',
  secret: 'a39f077bf821a483691b',
  cluster: 'ap1',
  useTLS: true,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body.message;

  await pusher.trigger('my-channel', 'my-event', {
    message,
  });

  return NextResponse.json({ success: true });
}
