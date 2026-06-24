import ViewBids from "./pages/ViewBids";
import MyBids from "./pages/MyBids";
import PlaceBid from "./pages/PlaceBid";
import AIProposal from "./pages/AIProposal";
import MyPayments from "./pages/MyPayments";
import AdminPayments from "./pages/AdminPayments";
import AdminReviews from "./pages/AdminReviews";
import Review from "./pages/Review";
import Deliverables from "./pages/Deliverables";
import AdminDeliverables from "./pages/AdminDeliverables";
import MyMeetings from "./pages/MyMeetings";
import AdminMeetings from "./pages/AdminMeetings";
import MeetingScheduler from "./pages/MeetingScheduler";
import AdminChat from "./pages/AdminChat";
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import AdminUsers from "./pages/AdminUsers";
import MyProjects from "./pages/MyProjects";
import AdminProjects from "./pages/AdminProjects";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Estimator from "./pages/Estimator";
import ProjectRequest from "./pages/ProjectRequest";
import ProjectTracking from "./pages/ProjectTracking";
import PortfolioManager from "./pages/PortfolioManager";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import TestAPI from "./pages/TestAPI";
import { useState, useCallback } from 'react';
import { ReactLenis } from 'lenis/react';

// Components
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleCanvas from './animations/ParticleCanvas';

// Sections
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      }}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loader */}
      <Loader onComplete={handleLoadComplete} />

      {/* Particle Background */}
      <ParticleCanvas />

      {/* Main Content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        <Routes>

  <Route
    path="/"
    element={
      <>
        <Navbar />

        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Process />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </>
    }
  />

  <Route path="/login" element={<Login />} />
  <Route path="/my-projects" element={<MyProjects />} />

  <Route path="/register" element={<Register />} />
  <Route path="/view-bids" element={<ViewBids />} />
  <Route
  path="/admin-meetings"
  element={<AdminMeetings />}
/>
  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
  <Route
  path="/estimator"
  element={
    <ProtectedRoute>
      <Estimator />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-payments"
  element={<MyPayments />}
/>
  <Route
  path="/request"
  element={
    <ProtectedRoute>
      <ProjectRequest />
    </ProtectedRoute>
  }
/>

  <Route path="/tracking" element={<ProjectTracking />} />
  <Route
  path="/my-meetings"
  element={<MyMeetings />}
/>
  <Route path="/test-api" element={<TestAPI />} />
  <Route
  path="/meeting"
  element={<MeetingScheduler />}
/>

<Route
  path="/admin-payments"
  element={<AdminPayments />}
/>

<Route
  path="/place-bid"
  element={<PlaceBid />}
/>

<Route
  path="/ai-proposal"
  element={<AIProposal />}
/>

  <Route
  path="*"
  element={<h1 style={{ color: "white" }}>Route Not Found</h1>}
/>

<Route
  path="/admin-reviews"
  element={<AdminReviews />}
/>

<Route
  path="/review"
  element={<Review />}
/>

  <Route
  path="/portfolio-manager"
  element={
    <ProtectedRoute>
      <PortfolioManager />
    </ProtectedRoute>
  }
/>

  <Route path="/client-dashboard" element={<ClientDashboard />} />
  <Route
  path="/my-projects"
  element={<MyProjects />}
/>
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route
  path="/admin-deliverables"
  element={<AdminDeliverables />}
/>
  <Route path="/admin-users" element={<AdminUsers />} />
  <Route path="/admin-projects" element={<AdminProjects />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/my-bids" element={<MyBids />} />
  <Route
  path="/deliverables"
  element={<Deliverables />}
/>
  <Route path="/analytics" element={<Analytics />} />
  <Route
path="/admin-chat"
element={<AdminChat />}
/>
<Route
  path="/meeting"
  element={<MeetingScheduler />}
/>
  <Route
path="/chat"
element={<Chat />}
/>
  <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
</Routes>
      </div>
    </ReactLenis>
  );
}
