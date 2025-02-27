'use client';
import { useState } from "react";

type Message = {
    text: string;
    sender: "user" | "bot";
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const supportResponses: string[] = [
        "Did you try turning it off and on again?",
        "Did you delete your node_modules and re-install?",
        "Did you update your env?",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() === "") return;

        // Add user message
        const newMessages: Message[] = [
            ...messages,
            { text: inputValue, sender: "user" },
        ];

        // Generate random bot response
        const randomIndex: number = Math.floor(
            Math.random() * supportResponses.length
        );
        const botResponse: string = supportResponses[randomIndex];

        // Add bot message with slight delay to feel more natural
        setTimeout(() => {
            setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
        }, 500);

        setInputValue("");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Tech Support Chat Bot
            </h1>
            <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                    <h2 className="text-xl font-bold">Tech Support Bot</h2>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-4">
                            Ask me any tech question!
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"
                                    }`}
                            >
                                <div
                                    className={`inline-block p-3 rounded-lg ${message.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
                    <div className="flex">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setInputValue(e.target.value)
                            }
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            <p className="mt-8 text-sm text-gray-500 text-center">
                No matter what you ask, this bot knows exactly what to suggest!
            </p>
        </main>);
}
