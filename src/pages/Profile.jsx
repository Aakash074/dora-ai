import { usePrivy } from '@privy-io/react-auth'

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#111827'
  },
  subtitle: {
    marginTop: '8px',
    fontSize: '18px',
    color: '#6B7280'
  },
  section: {
    marginBottom: '48px'
  },
  sectionHeader: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827'
  },
  sectionDescription: {
    marginTop: '4px',
    fontSize: '14px',
    color: '#6B7280'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  },
  form: {
    display: 'grid',
    gap: '24px'
  },
  avatarSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  avatarActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  button: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  hint: {
    fontSize: '12px',
    color: '#6B7280'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    width: '100%'
  },
  textarea: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    width: '100%',
    minHeight: '100px',
    resize: 'vertical'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid #D1D5DB',
    cursor: 'pointer'
  },
  checkboxLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  checkboxDescription: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '4px'
  }
}

export default function Profile() {
  const { user } = usePrivy()

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Profile Settings</h1>
        <p style={styles.subtitle}>Manage your account settings and preferences.</p>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <p style={styles.sectionDescription}>This information will be displayed publicly.</p>
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

            <div style={styles.formGroup}>
              <label htmlFor="about" style={styles.label}>
                About
              </label>
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

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Notifications</h2>
          <p style={styles.sectionDescription}>Choose how you want to receive updates.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.form}>
            <div style={styles.formGroup}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <input
                  id="email-notifications"
                  name="email-notifications"
                  type="checkbox"
                  style={styles.checkbox}
                />
                <div>
                  <label htmlFor="email-notifications" style={styles.checkboxLabel}>
                    Email notifications
                  </label>
                  <p style={styles.checkboxDescription}>
                    Get notified about new travel recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 