import { useCallback, useEffect, useRef, useState, } from "react"


function App() {

  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numbersAllowed, setNumbersALlowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  // ref hook
  let passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {

    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numbersAllowed)
      str += '1234567890'
    if (charAllowed)
      str += '!@#$%^&*'

    for (let index = 0; index < length; index++) {

      let randomIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomIndex)

    }
    setPassword(pass)
  }, [length, charAllowed, numbersAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="min-h-screen bg-blue-500">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg px-4 py-6 my-8 mx-auto rounded-lg shadow-md bg-amber-200">
          <h2 className="text-xl font-semibold text-center ">Password Generator</h2>

          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              readOnly
              value={password}
              ref={passwordRef}
              className="flex-grow px-3 py-2 rounded-l-lg text-sm focus:outline-none"
            />
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="length" className="block text-sm font-medium mb-1">
                Length: {length}
              </label>
              <input
                type="range"
                name="length"
                id="length"
                min={8}
                max={64}
                value={length}
                className="w-full cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="char"
                id="char"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="char">Include Characters</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="number"
                id="number"
                onChange={() => setNumbersALlowed((prev) => !prev)}
              />
              <label htmlFor="number">Include Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
