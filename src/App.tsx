import Split from "react-split";
import Header from "./components/home-commponents/header";
import Home from "./components/home-commponents/leet-coach-page";
import SolutionPage from "./components/home-commponents/solution-page";
// import "react-split/style.css"; // optional, basic styling

const constColors =
  "overflow-auto bg-white dark:bg-gray-800 rounded p-2 w-full min-h-[300px]";

function App() {
  return (
    <main className="min-h-dvh w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="flex content-center justify-between p-2 sticky top-0 z-50 bg-background border-b">
        <Header />
      </header>

      {/* Responsive container */}
      <div className="flex-1 flex flex-col items-stretch justify-center p-3">
        <div className="w-full flex flex-col gap-2">
          {/* On md+ use Split, on mobile use stacked layout */}
          <div className="hidden md:flex w-full gap-2">
            <Split
              className="flex w-full gap-2"
              direction="horizontal"
              sizes={[50, 50]}
              minSize={200}
              gutterSize={6}
              cursor="col-resize"
            >
              <div className={`${constColors}`}>
                <Home />
              </div>
              <div className={`${constColors}`}>
                <SolutionPage />
              </div>
            </Split>
          </div>
          {/* Mobile stacked layout */}
          <div className="flex flex-col gap-2 md:hidden w-full">
            <div className={`${constColors}`}>
              <Home />
            </div>
            <div className={`${constColors}`}>
              <SolutionPage />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
