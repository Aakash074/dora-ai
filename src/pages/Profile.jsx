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
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  divider: {
    borderTop: '1px solid rgba(17, 24, 39, 0.1)'
  },
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 2fr'
    }
  },
  sectionHeader: {
    padding: '0 16px',
    '@media (min-width: 640px)': {
      padding: 0
    }
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    color: '#111827'
  },
  sectionDescription: {
    marginTop: '4px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#4B5563'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(17, 24, 39, 0.05)',
    borderRadius: '8px',
    padding: '16px',
    '@media (min-width: 640px)': {
      padding: '32px'
    }
  },
  form: {
    display: 'grid',
    maxWidth: '42rem',
    gridTemplateColumns: '1fr',
    gap: '24px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(6, 1fr)'
    }
  },
  avatarSection: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  },
  avatar: {
    width: '96px',
    height: '96px',
    flexShrink: 0,
    borderRadius: '8px',
    backgroundColor: '#F3F4F6',
    objectFit: 'cover'
  },
  avatarActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  button: {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    backgroundColor: 'white',
    border: '1px solid rgba(17, 24, 39, 0.1)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#F9FAFB'
    }
  },
  hint: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#6B7280'
  },
  formGroup: {
    '@media (min-width: 640px)': {
      gridColumn: 'span 4 / span 4'
    }
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#111827',
    marginBottom: '8px'
  },
  input: {
    display: 'block',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid rgba(17, 24, 39, 0.1)',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#111827',
    backgroundColor: 'transparent',
    ':focus': {
      outline: 'none',
      ring: '2px',
      ringColor: '#4F46E5',
      borderColor: '#4F46E5'
    }
  },
  textarea: {
    display: 'block',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid rgba(17, 24, 39, 0.1)',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#111827',
    backgroundColor: 'transparent',
    ':focus': {
      outline: 'none',
      ring: '2px',
      ringColor: '#4F46E5',
      borderColor: '#4F46E5'
    }
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(17, 24, 39, 0.1)',
    color: '#4F46E5',
    ':focus': {
      outline: 'none',
      ring: '2px',
      ringColor: '#4F46E5'
    }
  },
  checkboxLabel: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#111827',
    fontWeight: '500'
  },
  checkboxDescription: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#6B7280'
  }
}

export default function Profile() {
  const { user } = usePrivy()

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Profile Settings
          </h1>
          <p style={styles.subtitle}>
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Profile section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Profile</h2>
            <p style={styles.sectionDescription}>
              This information will be displayed publicly.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.form}>
              <div style={styles.avatarSection}>
                <img
                  src={user?.avatarUrl || "https://avatars.githubusercontent.com/u/12345?v=4"}
                  alt=""
                  style={styles.avatar}
                />
                <div style={styles.avatarActions}>
                  <button type="button" style={styles.button}>
                    Change avatar
                  </button>
                  <p style={styles.hint}>JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>
                  Username
                </label>
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    style={styles.input}
                    placeholder="your_username"
                    value={user?.email?.split('@')[0] || ''}
                    readOnly
                  />
                </div>
              </div>

              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label htmlFor="about" style={styles.label}>
                  About
                </label>
                <div>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    style={styles.textarea}
                    placeholder="Write a few sentences about yourself..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification section */}
        <div style={{ ...styles.section, paddingTop: '40px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Notifications</h2>
            <p style={styles.sectionDescription}>
              Choose how you want to receive updates.
            </p>
          </div>

          <div style={styles.card}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Example notification setting */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', height: '24px', alignItems: 'center' }}>
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    style={styles.checkbox}
                  />
                </div>
                <div style={{ fontSize: '14px', lineHeight: '20px' }}>
                  <label htmlFor="email-notifications" style={styles.checkboxLabel}>
                    Email notifications
                  </label>
                  <p style={styles.checkboxDescription}>Get notified about new travel recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 