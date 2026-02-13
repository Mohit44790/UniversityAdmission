import { useEffect } from "react";

const CursorHearts = () => {
  useEffect(() => {
    const handleMove = (e) => {
      const heart = document.createElement("div");

      heart.className =
        "fixed pointer-events-none w-4 h-4 bg-red-500 rotate-45 animate-[floatHeart_1s_ease-out_forwards] z-[9999]";

      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";

      // create circle parts of heart
      const before = document.createElement("div");
      before.className =
        "absolute w-4 h-4 bg-red-500 rounded-full -top-2 left-0";

      const after = document.createElement("div");
      after.className =
        "absolute w-4 h-4 bg-red-500 rounded-full left-[-8px] top-0";

      heart.appendChild(before);
      heart.appendChild(after);

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
};

export default CursorHearts;
