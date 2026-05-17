import { LoaderCircle } from "lucide-react";

const Loading = ({
  text = "Loading...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${fullScreen ? "min-h-screen" : "py-20"}
      `}
    >
      {/* Spinner */}
      <div
        className="
          w-16 h-16 rounded-full
          border-4 border-blue-200
          border-t-blue-600
          animate-spin
        "
      />

    </div>
  );
};

export default Loading;