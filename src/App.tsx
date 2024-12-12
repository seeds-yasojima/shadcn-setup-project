import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="bg-slate-100 py-2">
        <div className="container mx-auto">
          <h1 className="font-semibold">Vite + React</h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto mt-6">
          <div>
            <button onClick={() => setCount((count) => count + 1)}>
              count up
            </button>
          </div>
          <div className="font-bold">{count}</div>
        </div>
      </main>
    </>
  );
}

export default App;
