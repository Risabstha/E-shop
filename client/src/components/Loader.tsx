
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-solid rounded-full animate-spin mb-6"></div>
      
      {/* Loading Text */}
      <p className="text-xl font-semibold  animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}