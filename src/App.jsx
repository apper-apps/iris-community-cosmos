import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

// Pages
import Feed from "@/components/pages/Feed";
import Members from "@/components/pages/Members";
import Classroom from "@/components/pages/Classroom";
import Leaderboard from "@/components/pages/Leaderboard";
import Guidelines from "@/components/pages/Guidelines";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-body">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header onMenuToggle={handleMenuToggle} />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto scrollbar-thin">
              <div className="container mx-auto px-4 lg:px-8 py-6 max-w-7xl">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <motion.div
                        key="feed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Feed />
                      </motion.div>
                    } />
                    
                    <Route path="/members" element={
                      <motion.div
                        key="members"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Members />
                      </motion.div>
                    } />
                    
                    <Route path="/classroom" element={
                      <motion.div
                        key="classroom"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Classroom />
                      </motion.div>
                    } />
                    
                    <Route path="/leaderboard" element={
                      <motion.div
                        key="leaderboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Leaderboard />
                      </motion.div>
                    } />
                    
                    <Route path="/guidelines" element={
                      <motion.div
                        key="guidelines"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Guidelines />
                      </motion.div>
                    } />
                  </Routes>
                </AnimatePresence>
              </div>
            </main>
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
          theme="dark"
          toastClassName="glass"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;