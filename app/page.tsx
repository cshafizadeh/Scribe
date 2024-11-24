"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    const textElement = document.querySelector('.typewriter-text') as HTMLElement | null;
    if (textElement) {  // Check if textElement is not null
      const text = textElement.textContent || '';  // Ensure text is a string
      textElement.textContent = '';

      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          textElement.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 45); // Adjust typing speed here
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#DC4406] via-[#FAD7B0] to-[#DC4406] text-center">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full bg-black text-white py-4 px-6 flex justify-end">
        <button 
          className="px-4 py-2 text-sm font-semibold text-white bg-[#DC4406] rounded transition-all duration-200 transform hover:scale-110"
          onClick={handleLoginClick}
        >
          Log In
        </button>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-4" style={{ gap: "30px" }}>
          {/* SVG Logo with sideways spin effect */}
          <div className="w-[100px] h-[50px] transform transition-all duration-300 ">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          {/* SVG Text - SCRIBE */}
          <div className="w-[120px] h-[30px]">
            <img
              src="/SCRIBE.svg"
              alt="Text"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="typewriter-text text-2xl text-gray-600 max-w-xl">
          The all-in-one tool for transcribing lectures, taking notes, and analyzing content.
        </p>
        <button className="px-6 py-3 text-lg font-medium text-white bg-black rounded-full hover:bg-[#DC4406] hover:shadow-lg transform hover:scale-110 transition-all duration-200">
          Go Scribe →
        </button>
      </main>
    </div>
  );
}
