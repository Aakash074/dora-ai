import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import Buckets from './pages/Buckets'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import doraImage from './assets/dora.jpeg'
import PropTypes from 'prop-types'

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 50%, #EEF2FF 100%)'
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    zIndex: 50,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  navInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    width: '100%'
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logoImage: {
    height: '48px',
    width: '48px',
    borderRadius: '50%'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  button: {
    padding: '10px 24px',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    color: 'white',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  hero: {
    flexGrow: 1,
    paddingTop: '128px',
    paddingBottom: '64px'
  },
  heroInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: 'bold',
    marginBottom: '32px',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.2'
  },
  heroText: {
    fontSize: '24px',
    marginBottom: '48px',
    maxWidth: '768px',
    margin: '0 auto 48px'
  },
  features: {
    width: '100%',
    padding: '80px 0',
    background: 'rgba(255, 255, 255, 0.5)'
  },
  featuresInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  },
  featureIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
    borderRadius: '12px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1F2937'
  },
  featureText: {
    fontSize: '18px',
    color: '#4B5563'
  },
  cta: {
    width: '100%',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    color: 'white',
    padding: '80px 0'
  },
  ctaInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    padding: '32px 0',
    marginTop: 'auto'
  },
  footerInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px'
  }
}

// Landing page component
function Landing() {
  const { login, authenticated } = usePrivy()

  if (authenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navContent}>
            <div style={styles.logo}>
              <img src={doraImage} alt="Dora AI Logo" style={styles.logoImage} />
              <h1 style={styles.logoText}>Dora AI</h1>
            </div>
            <div>
              <button onClick={login} style={styles.button}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroTitle}>Your AI Travel Companion</div>
            <div style={styles.heroText}>
              Travel smarter, earn rewards, and turn your social media inspiration into reality with our AI-powered travel planning.
            </div>
            <button 
              onClick={login}
              style={styles.button}
            >
              Start Your Journey
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div style={styles.features}>
          <div style={styles.featuresInner}>
            <div style={styles.featureGrid}>
              {/* Feature 1 */}
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={styles.featureTitle}>Travel to Earn</h3>
                <p style={styles.featureText}>Earn rewards and cryptocurrencies while exploring your dream destinations.</p>
              </div>

              {/* Feature 2 */}
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={styles.featureTitle}>Social Media Curation</h3>
                <p style={styles.featureText}>Transform your favorite travel reels into personalized bucket lists.</p>
              </div>

              {/* Feature 3 */}
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 style={styles.featureTitle}>Smart Itineraries</h3>
                <p style={styles.featureText}>AI-powered trip planning that adapts to your preferences and schedule.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.cta}>
          <div style={styles.ctaInner}>
            <h2 style={styles.heroTitle}>Ready to Start Your Adventure?</h2>
            <p style={styles.heroText}>Join thousands of travelers who are exploring the world with Dora AI.</p>
            <button 
              onClick={login}
              style={styles.button}
            >
              Join Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.logo}>
                <img src={doraImage} alt="Dora AI Logo" style={styles.logoImage} />
                <span style={styles.logoText}>Dora AI</span>
              </div>
              <p style={styles.featureText}>Your AI-powered travel companion for smarter, rewarding adventures.</p>
            </div>
            <div>
              <h4 style={styles.featureTitle}>Features</h4>
              <ul style={styles.featureText}>
                <li>Travel to Earn</li>
                <li>Social Media Curation</li>
                <li>Smart Itineraries</li>
              </ul>
            </div>
            <div>
              <h4 style={styles.featureTitle}>Company</h4>
              <ul style={styles.featureText}>
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 style={styles.featureTitle}>Connect</h4>
              <ul style={styles.featureText}>
                <li>Twitter</li>
                <li>Discord</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div style={styles.featureText}>
            <p>© 2024 Dora AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { authenticated, ready } = usePrivy()

  if (!ready) {
    return null // or a loading spinner
  }

  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

// Main content with routing
function MainContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="buckets" element={<Buckets />} />
                <Route path="upload" element={<Upload />} />
                <Route path="profile" element={<Profile />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <PrivyProvider
      appId="cm6riqwzp029bao5thygiawxs"
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple', 'twitter', 'tiktok'],
        appearance: {
          theme: 'light',
          accentColor: '#6366F1', // Indigo-500
          showWalletLoginFirst: false,
        },
      }}
    >
      <MainContent />
    </PrivyProvider>
  )
}
