import { useEffect } from "react";

const CursorHearts = () => {
  useEffect(() => {
    const moveHearts = (e) => {
      const heart = document.createElement("div");

      heart.className =
        "fixed pointer-events-none w-2 h-2 bg-pink-500 rotate-45 animate-floatHeart z-[9999]";

      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";

      const leftCircle = document.createElement("div");
      leftCircle.className =
        "absolute w-2 h-2 bg-pink-500 rounded-full -top-2 left-0";

      const rightCircle = document.createElement("div");
      rightCircle.className =
        "absolute w-2 h-2 bg-pink-500 rounded-full left-[-8px] top-0";

      heart.appendChild(leftCircle);
      heart.appendChild(rightCircle);

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    };

    window.addEventListener("mousemove", moveHearts);
    return () => window.removeEventListener("mousemove", moveHearts);
  }, []);

  return null;
};

export default CursorHearts;
