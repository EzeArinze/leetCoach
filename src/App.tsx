// import Header from "./components/home-commponents/header";
// import Home from "./components/home-commponents/leet-coach-page";
// import SolutionPage from "./components/home-commponents/solution-page";

// function App() {
//   return (
//     <main className="min-h-dvh w-full bg-gray-50 dark:bg-gray-900 flex flex-col ">
//       <header className="flex content-center justify-between p-2 sticky top-0 z-50 bg-background border-b ">
//         <Header />
//       </header>
//       <div className="flex flex-1 flex-col md:flex-row items-stretch justify-center gap-0 md:gap-2 p-2">
//         <Home />

//         <SolutionPage />
//       </div>
//     </main>
//   );
// }

// export default App;

import Split from "react-split";
import Header from "./components/home-commponents/header";
import Home from "./components/home-commponents/leet-coach-page";
import SolutionPage from "./components/home-commponents/solution-page";
// import "react-split/style.css"; // optional, basic styling

function App() {
  return (
    <main className="min-h-dvh w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="flex content-center justify-between p-2 sticky top-0 z-50 bg-background border-b">
        <Header />
      </header>

      <Split
        className="flex-1 flex flex-col md:flex-row p-2 gap-2 "
        direction="horizontal"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={6}
        cursor="col-resize"
      >
        <div className="overflow-auto bg-white dark:bg-gray-800 rounded p-2 w-full md:w-1/2 min-h-[300px]">
          <Home />
        </div>
        <div className="overflow-auto bg-white dark:bg-gray-800 rounded p-2 w-full md:w-1/2 min-h-[300px] mt-2 md:mt-0">
          <SolutionPage />
        </div>
      </Split>
    </main>
  );
}

export default App;
