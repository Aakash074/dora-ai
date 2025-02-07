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
    width: '280px',
    display: 'none',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRight: '1px solid rgba(229, 231, 235, 0.5)',
    boxShadow: '4px 0 12px rgba(0, 0, 0, 0.03)'
  },
  desktopSidebarVisible: {
    display: 'flex'
  },
  sidebarContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    gap: '32px',
    overflowY: 'auto',
    padding: '24px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#E5E7EB transparent',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E5E7EB',
      borderRadius: '4px'
    }
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    marginBottom: '8px'
  },
  logo: {
    height: '40px',
    width: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #7C3AED, #4F46E5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: '12px',
    // fontSize: '24px',
    // fontWeight: 'bold',
    // background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
    // WebkitBackgroundClip: 'text',
    // WebkitTextFillColor: 'transparent',
    // letterSpacing: '-0.5px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#4B5563',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#F3F4F6'
    }
  },
  navItemActive: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    fontWeight: '600'
  },
  navIcon: {
    width: '20px',
    height: '20px',
    color: '#6B7280',
    transition: 'color 0.2s ease'
  },
  navIconActive: {
    color: '#4F46E5'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: 'auto',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#DC2626',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#FEE2E2'
    }
  },
  logoutIcon: {
    width: '20px',
    height: '20px',
    color: '#DC2626'
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(to right, rgba(229, 231, 235, 0) 0%, rgba(229, 231, 235, 0.5) 50%, rgba(229, 231, 235, 0) 100%)',
    margin: '16px 0'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: '#F9FAFB',
    marginTop: 'auto'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#E5E7EB'
  },
  userInfo: {
    flex: 1,
    overflow: 'hidden'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  userEmail: {
    fontSize: '12px',
    color: '#6B7280',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    padding: '0 16px',
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden'
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
    paddingLeft: 0,
    minHeight: '100vh',
    paddingBottom: '64px'
  },
  mainInner: {
    padding: '24px 16px',
    minHeight: '100vh',
    '@media (max-width: 1023px)': {
      paddingBottom: '80px'
    }
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

          <div style={styles.divider} />

          <nav style={styles.nav}>
            <ul style={styles.navList}>
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
          </nav>

          {/* <div style={styles.userSection}>
            <div style={styles.userAvatar}>
              <UserCircleIcon style={{ width: '100%', height: '100%', color: '#9CA3AF' }} />
            </div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>John Doe</div>
              <div style={styles.userEmail}>john@example.com</div>
            </div>
          </div> */}

          <button onClick={logout} style={styles.logoutButton}>
            <ArrowLeftOnRectangleIcon style={styles.logoutIcon} aria-hidden="true" />
            Logout
          </button>
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