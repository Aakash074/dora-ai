import { useState } from 'react'

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
  uploadSection: {
    marginTop: '32px'
  },
  dropzone: {
    maxWidth: '36rem',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '8px',
    borderWidth: '2px',
    borderStyle: 'dashed',
    padding: '24px 40px'
  },
  dropzoneActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF'
  },
  dropzoneInactive: {
    borderColor: '#D1D5DB',
    ':hover': {
      borderColor: '#6366F1'
    }
  },
  uploadIcon: {
    width: '48px',
    height: '48px',
    color: '#9CA3AF',
    margin: '0 auto'
  },
  uploadText: {
    marginTop: '16px',
    display: 'flex',
    fontSize: '14px',
    lineHeight: '24px',
    color: '#4B5563'
  },
  uploadButton: {
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: 'white',
    fontWeight: '600',
    color: '#4F46E5',
    ':hover': {
      color: '#4338CA'
    },
    ':focus': {
      outline: 'none',
      ring: '2px',
      ringColor: '#4F46E5',
      ringOffset: '2px'
    }
  },
  uploadInput: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0'
  },
  uploadHint: {
    marginTop: '4px',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#6B7280'
  },
  socialSection: {
    marginTop: '48px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827'
  },
  socialGrid: {
    marginTop: '16px',
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  socialCard: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 24px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#6366F1',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }
  },
  socialIcon: {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    color: '#9CA3AF'
  },
  socialContent: {
    flex: '1 1 0%',
    minWidth: 0
  },
  socialTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827'
  },
  socialSubtitle: {
    fontSize: '14px',
    color: '#6B7280'
  }
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle the files
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // At least one file has been dropped
      console.log(e.dataTransfer.files)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            Upload Content
          </h1>
          <p style={styles.subtitle}>
            Share your travel experiences or import content from social media.
          </p>
        </div>
      </div>
      
      {/* Upload area */}
      <div style={styles.uploadSection}>
        <div 
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : styles.dropzoneInactive)
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div style={{ textAlign: 'center' }}>
            <svg
              style={styles.uploadIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div style={styles.uploadText}>
              <label style={styles.uploadButton}>
                <span>Upload a file</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  style={styles.uploadInput}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      console.log(e.target.files[0])
                    }
                  }}
                />
              </label>
              <p style={{ paddingLeft: '4px' }}>or drag and drop</p>
            </div>
            <p style={styles.uploadHint}>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Social media import section */}
      <div style={styles.socialSection}>
        <h2 style={styles.sectionTitle}>Import from Social Media</h2>
        <div style={styles.socialGrid}>
          {/* Example social media import card */}
          <button style={styles.socialCard}>
            <div style={styles.socialIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </div>
            <div style={styles.socialContent}>
              <p style={styles.socialTitle}>Import from Instagram</p>
              <p style={styles.socialSubtitle}>Connect your account to import posts</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 