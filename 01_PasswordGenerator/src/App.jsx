import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  // State management for password length, password, and checkbox settings
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState('');
  const [includeChar, setIncludeChar] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);

  // useRef for password input
  const passwordRef = useRef(null);

  // Password Generation Logic
  const GeneratePassword = useCallback(() => {
    let numbers = '0123456789';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let symbols = '!@#$%^&*()_+{}|:<>?-=[];\',./';

    if (includeChar) characters += symbols;
    if (includeNumber) characters += numbers;

    let newpassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newpassword += characters.charAt(randomIndex);
    }
    setPassword(newpassword);
  }, [length, includeChar, includeNumber, setPassword]);

  // Generate password whenever settings change
  useEffect(() => {
    GeneratePassword();
    toast.success('Password Generated!');
  }, [includeChar, includeNumber, length, GeneratePassword]);

  // Copy password to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    navigator.clipboard.writeText(password);
    toast.info('Copied to clipboard!');
  }, [password]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-md shadow-md text-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3">
          <h1 className="text-white text-lg md:text-xl mb-4">Password Generator</h1>

          {/* Password Display and Copy Button */}
          <div className="bg-gray-700 rounded-md p-4 flex flex-col md:flex-row justify-between items-center mb-4">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              readOnly
              className="bg-transparent text-white w-full focus:outline-none mb-2 md:mb-0"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0 md:ml-4"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>

          {/* Length Slider */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-white">Length: {length}</label>
            <input
              type="range"
              min="4"
              max="100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-1/2 md:w-2/3"
            />
          </div>

          {/* Include Numbers Checkbox */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-white">Numbers</label>
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={() => setIncludeNumber((prev) => !prev)}
              className="form-checkbox text-blue-600"
            />
          </div>

          {/* Include Characters Checkbox */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-white">Characters</label>
            <input
              type="checkbox"
              checked={includeChar}
              onChange={() => setIncludeChar((prev) => !prev)}
              className="form-checkbox text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
