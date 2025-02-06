import { usePrivy } from '@privy-io/react-auth'

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 640px)': {
      display: 'flex'
    }
  },
  headerContent: {
    flex: '1 1 auto',
    '@media (min-width: 640px)': {
      flex: '1 1 auto'
    }
  },
  title: {
    fontSize: '30px',
    fontWeight: '600',
    lineHeight: '24px',
    color: '#111827'
  },
  subtitle: {
    marginTop: '8px',
    fontSize: '18px',
    color: '#4B5563'
  },
  content: {
    marginTop: '32px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(17, 24, 39, 0.05)',
    borderRadius: '8px',
    padding: '24px'
  },
  cardText: {
    color: '#6B7280'
  }
}

export default function Home() {
  const { user } = usePrivy()
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Welcome back, {user?.email?.split('@')[0] || 'Traveler'}!
          </h1>
          <p style={styles.subtitle}>
            Your personalized travel dashboard awaits. Start exploring your next adventure.
          </p>
        </div>
      </div>
      
      {/* Placeholder for dashboard content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <p style={styles.cardText}>
            Dashboard content will be added here...
          </p>
        </div>
      </div>
    </div>
  )
} 