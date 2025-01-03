import { useRef, useState, useEffect } from "react";
import { uploadFile } from "./services/api";
import background from "./assets/background.svg";

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false); // State to track copy status
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for theme toggle
  const fileInput = useRef();

  const onUploadClick = () => {
    fileInput.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <nav className="h-14 fixed top-0 left-0 right-0 bg-red-600 dark:bg-gray-800 flex justify-between items-center px-4">
          <h1 className="text-3xl text-white">
            <span className="text-customBlue text-4xl">F</span>ile
            <span className="text-customBlue text-4xl">S</span>haring
          </h1>
          <button
            onClick={toggleTheme}
            className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {isDarkTheme ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>

        <div className="flex h-screen pt-14">
          {/* Left Side - Content */}
          <div className="w-1/2 flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-700">
            <div className="text-3xl p-5">Hello, This is a <span className="text-customOrange dark:text-customBlue">File Sharing</span> App.</div>
            <button
              className="p-3 border border-black bg-slate-200 dark:bg-gray-900 dark:border-gray-600 
              rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-800 transition 
              duration-300 ease-in-out"
              onClick={onUploadClick}
            >
              Upload your file here.
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInput}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {result && (
              <div className="mt-4 flex items-center">
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-500 bg-white p-2 underline"
                >
                  {result}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center p-2 bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 transition duration-200"
                >
                  {isCopied ? (
                    <>
                      ✅
                      <span className="ml-1 text-green-500 dark:text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      📋
                      <span className="ml-1">Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Background Image */}
          <div
            className="w-1/2 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
