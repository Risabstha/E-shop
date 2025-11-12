
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-red-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4v2m0 4v2M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>


        {/* Error Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Something went wrong!
        </h2>

        {/* Error Description */}
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Error Details Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mt-2">
            Please check the URL and try again or return to the home page.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Go to Home
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 space-y-2 text-gray-400 text-sm">
          <p>Need help? Contact our support team</p>
          <p className="text-gray-500 font-medium">xyz@gmail.com</p>
        </div>
      </div>


    </div>
  );
};

export default Error;
