import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import PropTypes from 'prop-types'
import {
  HomeIcon,
  FolderIcon,
  CloudArrowUpIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import doraImage from '../assets/dora.jpeg'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Buckets', href: '/dashboard/buckets', icon: FolderIcon },
  { name: 'Upload', href: '/dashboard/upload', icon: CloudArrowUpIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
]

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 50%, #EEF2FF 100%)'
  },
  desktopSidebar: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: '256px',
    display: 'none',
    flexDirection: 'column'
  },
  desktopSidebarVisible: {
    display: 'flex'
  },
  sidebarContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    borderRight: '1px solid rgba(229, 231, 235, 1)',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    padding: '0 24px 16px 24px'
  },
  logoContainer: {
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    flexShrink: 0
  },
  logo: {
    height: '32px',
    width: '32px',
    borderRadius: '50%'
  },
  logoText: {
    marginLeft: '8px',
    fontSize: '20px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '28px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    textDecoration: 'none',
    transition: 'all 0.2s'
  },
  navItemActive: {
    backgroundColor: '#F9FAFB',
    color: '#4F46E5'
  },
  navIcon: {
    width: '24px',
    height: '24px',
    color: '#9CA3AF'
  },
  navIconActive: {
    color: '#4F46E5'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s'
  },
  mobileContainer: {
    display: 'block'
  },
  mobileContainerHidden: {
    display: 'none'
  },
  mobileNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: '1px solid rgba(229, 231, 235, 1)',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    padding: '0 16px',
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mobileNavItem: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    color: '#6B7280',
    textDecoration: 'none'
  },
  mobileNavText: {
    fontSize: '12px',
    marginTop: '4px'
  },
  mobileHeader: {
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(229, 231, 235, 1)',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    padding: '0 16px'
  },
  mobileLogoutButton: {
    padding: '8px',
    borderRadius: '50%',
    color: '#6B7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  mainContent: {
    paddingLeft: 0
  },
  mainInner: {
    padding: '24px 16px 80px',
    minHeight: '100vh'
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default function DashboardLayout({ children }) {
  const { logout } = usePrivy()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={styles.container}>
      {/* Desktop sidebar */}
      <div style={{
        ...styles.desktopSidebar,
        ...(isMobile ? {} : styles.desktopSidebarVisible)
      }}>
        <div style={styles.sidebarContent}>
          <div style={styles.logoContainer}>
            <img src={doraImage} alt="Dora AI Logo" style={styles.logo} />
            <span style={styles.logoText}>Dora AI</span>
          </div>
          <nav style={styles.nav}>
            <ul style={styles.navList}>
              <li>
                <ul style={{ margin: '-8px' }}>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        style={{
                          ...styles.navItem,
                          ...(location.pathname === item.href ? styles.navItemActive : {})
                        }}
                      >
                        <item.icon
                          style={{
                            ...styles.navIcon,
                            ...(location.pathname === item.href ? styles.navIconActive : {})
                          }}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li style={{ marginTop: 'auto' }}>
                <button onClick={logout} style={styles.logoutButton}>
                  <ArrowLeftOnRectangleIcon style={styles.navIcon} aria-hidden="true" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header and navigation */}
      <div style={{
        ...styles.mobileContainer,
        ...(isMobile ? {} : styles.mobileContainerHidden)
      }}>
        <div style={styles.mobileHeader}>
          <div style={styles.logoContainer}>
            <img src={doraImage} alt="Dora AI Logo" style={styles.logo} />
            <span style={styles.logoText}>Dora AI</span>
          </div>
          <button onClick={logout} style={styles.mobileLogoutButton}>
            <ArrowLeftOnRectangleIcon style={{ width: '24px', height: '24px' }} aria-hidden="true" />
          </button>
        </div>

        <div style={styles.mobileNav}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              style={{
                ...styles.mobileNavItem,
                color: location.pathname === item.href ? '#4F46E5' : '#6B7280'
              }}
            >
              <item.icon
                style={{
                  width: '24px',
                  height: '24px',
                  color: location.pathname === item.href ? '#4F46E5' : '#9CA3AF'
                }}
                aria-hidden="true"
              />
              <span style={styles.mobileNavText}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ 
        ...styles.mainInner,
        ...(isMobile ? {} : { paddingLeft: '280px' })
      }}>
        {children}
      </div>
    </div>
  )
} 