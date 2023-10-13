import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1>Chat</h1>
      <div>
        <Chat />
      </div>
    </main>
  );
}
