// ==========================
// App Component
// ==========================
import "./App.css"; // Importing styles for the application
import { SideBar } from "./components/SideBar"; // Importing the Sidebar component
import { Chat } from "./components/Chat"; // Importing the Chat component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing routing components
import { AppProvider } from "./contexts/AppProvider"; // Importing the AppProvider context to wrap the app

function App() {
  return (
    // Wrap the entire app with AppProvider to provide context to the components
    <AppProvider>
      <Router>
        {/* Main container with flex layout */}
        <div className="flex bg-black">
          {/* SideBar is a persistent component, always visible on the left */}
          <SideBar />

          {/* Define routes for different paths */}
          <Routes>
            {/* Default route for '/' - renders the Chat component */}
            <Route path="/" element={<Chat />} />
            {/* Dynamic route for '/chat/:chatId' - renders the Chat component with the specific chatId */}
            <Route path="/chat/:chatId" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App; // Exporting the App component for use in other parts of the app
