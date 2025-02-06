import { useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import nftMintAbi from '../contracts/nftMintContractABI.json'

const JWT = import.meta.env.VITE_PINATA_JWT
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS

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
  uploadSection: {
    marginTop: '32px'
  },
  dropzone: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    borderRadius: '8px',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  dropzoneActive: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF'
  },
  uploadContent: {
    textAlign: 'center'
  },
  uploadIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto',
    color: '#9CA3AF'
  },
  uploadText: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#6B7280'
  },
  uploadButton: {
    color: '#6366F1',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '4px'
  },
  hiddenInput: {
    display: 'none'
  },
  uploadHint: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#9CA3AF'
  },
  youtubeSection: {
    maxWidth: '600px',
    margin: '48px auto 0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '8px'
  },
  sectionDescription: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '24px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6366F1',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease'
  },
  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  error: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    borderRadius: '6px',
    fontSize: '14px'
  },
  result: {
    marginTop: '24px'
  },
  resultTitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '12px'
  },
  resultContent: {
    backgroundColor: '#F9FAFB',
    padding: '16px',
    borderRadius: '6px',
    overflow: 'auto'
  },
  pre: {
    fontSize: '14px',
    color: '#374151',
    whiteSpace: 'pre-wrap'
  },
  videoResult: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px'
  },
  thumbnail: {
    width: '100%',
    maxWidth: '450px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  },
  videoInfo: {
    width: '100%',
    maxWidth: '450px'
  },
  videoTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  channelName: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '16px'
  },
  bucketsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  },
  bucketCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #E5E7EB',
    transition: 'all 0.2s ease'
  },
  bucketCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  bucketTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  bucketLocation: {
    fontSize: '14px',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  mintButton: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px'
  },
  mintButtonHover: {
    backgroundColor: '#4F46E5'
  }
}

function extractYoutubeVideoId(url) {
  if (!url) return null;

  // Regular expression patterns for different YouTube URL formats
  const patterns = {
    // Regular video URLs
    standard: /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i,
    // Shorts URLs
    shorts: /youtube\.com\/shorts\/([^"&?/\s]{11})/i,
  };

  // Try shorts pattern first
  const shortsMatch = url.match(patterns.shorts);
  if (shortsMatch) return shortsMatch[1];

  // Try standard pattern
  const standardMatch = url.match(patterns.standard);
  if (standardMatch) return standardMatch[1];

  return null;
}

const uploadToPinata = async (file) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
  
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading file to Pinata:', error)
    throw error
  }
}

const uploadMetadataToPinata = async (ipfsHash, nftData, videoId, recipientAddress) => {
  const metadata = {
    name: nftData?.videoDetails?.channelTitle + " NFT",
    description: nftData?.videoDetails?.title,
    image: "ipfs://" + ipfsHash,
    "properties": {
      "creator": recipientAddress,
      "creatorName": nftData?.videoDetails?.channelTitle,
      "videoId": videoId,
      "buckets": nftData?.result
    }
  }
  
  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const formData = new FormData()
  formData.append('file', metadataBlob, 'nft_metadata.json')

  const pinataOptions = JSON.stringify({
    cidVersion: 0
  })
  formData.append('pinataOptions', pinataOptions)

  const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
    maxBodyLength: 'Infinity',
    headers: {
      'Authorization': `Bearer ${JWT}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY
    }
  })

  const ipfsHashMD = response.data.IpfsHash
  return `ipfs://${ipfsHashMD}`
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [extractedData, setExtractedData] = useState(null)
  const [processingStatus, setProcessingStatus] = useState('')

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files)
    }
  }

  const handleFetch = async () => {
    if (url) {
      try {
        setLoading(true)
        setError('')
        setProcessingStatus('Fetching video details...')
        
        const videoId = extractYoutubeVideoId(url)
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            part: 'snippet',
            id: videoId,
            key: YOUTUBE_API_KEY
          }
        })

        const videoDetails = response.data.items[0].snippet
        setProcessingStatus('Processing video content...')
        let result = await axios.get("https://api.clonemytrips.com/reels/ytShorts?url=" + videoId)
        result = result.data
        setExtractedData({ result, videoDetails })
        setProcessingStatus('Video processed successfully!')
      } catch (err) {
        setError(err.message || 'Failed to process video')
        setProcessingStatus('')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpload = async () => {
    try {
      setLoading(true)
      setError('')
      setProcessingStatus('Preparing to mint NFT...')

      const response = await axios.post('https://api.clonemytrips.com/proxy', {
        url: extractedData?.videoDetails?.thumbnails?.high?.url
      })

      setProcessingStatus('Connecting to wallet...')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftMintAbi, signer)
      const recipientAddress = await signer.getAddress()

      setProcessingStatus('Uploading thumbnail...')
      const arrayBufferData = new Uint8Array(response.data.imageBuffer.data)
      const blob = new Blob([arrayBufferData], { type: response.data.contentType })
      const file = new File([blob], extractYoutubeVideoId(url) + '.' + response.data.contentType.slice(6), { type: response.data.contentType })
      const pinataResult = await uploadToPinata(file)

      setProcessingStatus('Uploading metadata...')
      const metadata = await uploadMetadataToPinata(pinataResult.IpfsHash, extractedData, extractYoutubeVideoId(url), recipientAddress)

      setProcessingStatus('Minting NFT...')
      const tx = await contract.mintNFT(recipientAddress, metadata)
      console.log('Transaction:', tx)
      setProcessingStatus('NFT minted successfully!')
      setResult(tx)
    } catch (err) {
      setError(err.message || 'Failed to mint NFT')
      setProcessingStatus('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Upload Content</h1>
        <p style={styles.subtitle}>Share your travel experiences or import content from social media</p>
      </div>
      
      <div style={styles.uploadSection}>
        <div 
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : {})
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div style={styles.uploadContent}>
            <svg
              style={styles.uploadIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
                  type="file"
                  style={styles.hiddenInput}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      console.log(e.target.files[0])
                    }
                  }}
                />
              </label>
              <p>or drag and drop</p>
            </div>
            <p style={styles.uploadHint}>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div style={styles.youtubeSection}>
        <h3 style={styles.sectionTitle}>Import from YouTube</h3>
        <p style={styles.sectionDescription}>Enter a YouTube video URL to process its content</p>
        
        <div style={styles.formGroup}>
          <label htmlFor="url" style={styles.label}>YouTube URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            style={styles.input}
            required
          />
        </div>
        
        <button
          onClick={handleFetch}
          disabled={loading || !url}
          style={{
            ...styles.button,
            ...(loading || !url ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Processing...' : 'Fetch Video'}
        </button>

        {extractedData && (
          <div style={styles.videoResult}>
            <img 
              src={extractedData?.videoDetails?.thumbnails?.high?.url} 
              alt={extractedData?.videoDetails?.title}
              style={styles.thumbnail}
            />
            
            <div style={styles.videoInfo}>
              <h3 style={styles.videoTitle}>{extractedData?.videoDetails?.title}</h3>
              <p style={styles.channelName}>
                <svg style={{ display: 'inline', width: '16px', height: '16px', marginRight: '4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {extractedData?.videoDetails?.channelTitle}
              </p>

              <div style={styles.bucketsList}>
                {extractedData?.result?.map((item, index) => (
                  <div 
                    key={index}
                    style={styles.bucketCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={styles.bucketTitle}>
                      <svg style={{ width: '20px', height: '20px', color: '#6366F1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item?.name}
                    </div>
                    {item?.mapData?.placePrediction?.text?.text && (
                      <div style={styles.bucketLocation}>
                        <svg style={{ width: '16px', height: '16px', color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {item?.mapData?.placePrediction?.text?.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                  ...styles.mintButton,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#4F46E5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#6366F1'
                  }
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {loading ? 'Processing...' : 'Upload & Mint NFT'}
              </button>
            </div>
          </div>
        )}

        {processingStatus && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            {processingStatus}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {result && (
          <div style={styles.result}>
            <h3 style={styles.resultTitle}>Transaction Result</h3>
            <div style={styles.resultContent}>
              <pre style={styles.pre}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 