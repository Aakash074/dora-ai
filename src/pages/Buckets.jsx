const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '32px'
  },
  headerContent: {
    flex: '1'
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
  createButton: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    marginTop: '32px'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  },
  cardImage: {
    width: '100%',
    height: '200px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#111827',
    marginTop: '16px'
  },
  cardDescription: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '4px'
  },
  cardStats: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '16px'
  }
}

export default function Buckets() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Travel Buckets</h1>
          <p style={styles.subtitle}>
            Organize and manage your travel inspirations in personalized buckets.
          </p>
        </div>
        <button style={styles.createButton}>
          Create Bucket
        </button>
      </div>
      
      <div style={styles.grid}>
        {/* Example bucket card */}
        <div style={styles.card}>
          <div style={styles.cardImage}>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Beach destinations"
              style={styles.image}
            />
          </div>
          <h3 style={styles.cardTitle}>Beach Destinations</h3>
          <p style={styles.cardDescription}>Collection of beautiful beaches around the world</p>
          <p style={styles.cardStats}>12 places saved</p>
        </div>
      </div>
    </div>
  )
} 