import React, { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+";
    if (numberAllowed) {
      characters += numbers;
    }
    if (specialAllowed) {
      characters += special;
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    setPassword(password);
  }, [length, numberAllowed, specialAllowed, setPassword]);

  const copyPassword = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialAllowed]);

  return (
    <>
      <div className="bg-slate-900 h-screen">
        <h1 className="text-slate-300 text-4xl text-center p-6 font-md ">
          Password Generator
        </h1>
        <div className="bg-slate-400 w-1/2 mx-auto rounded-lg border-2 border-gray-300 flex-col lg:flex-row">
          <div>
            <input
              type="text"
              value={password}
              className="bg-slate-100 w-[75%] p-2 m-3 mx-8 rounded-xl"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-500 w-20 p-2 rounded-xl text-slate-50 hover:bg-blue-700 mx-8 lg:mx-0"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex p-6 flex-col lg:flex-row">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer  mx-4 "
              onChange={(e) => setLenght(e.target.value)}
            />

            <label
              htmlFor="lenght"
              className="text-center text-orange-600 cursor-pointer text-xl "
            >
              Length({length})
            </label>
            <input
              type="checkbox"
              onChange={(e) => {
                setNumberAllowed(!numberAllowed);
              }}
              className="ml-4 mx-1 cursor-pointer"
            />
            <label
              htmlFor="numbers"
              className="text-center text-orange-600 cursor-pointer text-xl"
            >
              Numbers
            </label>
            <input
              type="checkbox"
              onChange={(e) => {
                setSpecialAllowed(!specialAllowed);
              }}
              className="ml-4 mx-1 cursor-pointer"
            />
            <label
              htmlFor="characters"
              className="text-center text-orange-600 cursor-pointer text-xl"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
