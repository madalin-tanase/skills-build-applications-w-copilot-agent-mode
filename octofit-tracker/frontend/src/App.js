import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigationItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function App() {
  return (
    <div className="App min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/users">
            <span className="brand-mark">OF</span>
            OctoFit Tracker
          </NavLink>
          <button
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-bs-target="#octofit-nav"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <div className="navbar-nav ms-auto gap-lg-2 align-items-lg-center">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) =>
                    `nav-link px-3${isActive ? ' active fw-semibold' : ''}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        <section className="app-hero card border-0 shadow-lg mb-4 overflow-hidden">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-8 text-start">
                <p className="text-uppercase small fw-semibold text-primary mb-2">
                  Fitness operations dashboard
                </p>
                <h1 className="display-5 fw-bold mb-3">Track people, plans, and performance in one polished workspace.</h1>
                <p className="lead text-secondary mb-0">
                  Every screen now follows the same Bootstrap-driven structure for navigation, cards, forms, tables, links, buttons, and modals.
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className="hero-summary card border-0 shadow-sm">
                  <div className="card-body text-start">
                    <h2 className="h5 mb-3">Included UI patterns</h2>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge rounded-pill text-bg-light border text-dark">Tables</span>
                      <span className="badge rounded-pill text-bg-light border text-dark">Cards</span>
                      <span className="badge rounded-pill text-bg-light border text-dark">Forms</span>
                      <span className="badge rounded-pill text-bg-light border text-dark">Modals</span>
                      <span className="badge rounded-pill text-bg-light border text-dark">Navigation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <Routes>
              <Route element={<Navigate replace to="/users" />} path="/" />
              <Route element={<Users />} path="/users" />
              <Route element={<Teams />} path="/teams" />
              <Route element={<Activities />} path="/activities" />
              <Route element={<Workouts />} path="/workouts" />
              <Route element={<Leaderboard />} path="/leaderboard" />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
