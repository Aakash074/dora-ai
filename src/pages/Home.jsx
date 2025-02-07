import { useState, useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { ethers } from 'ethers'
import axios from 'axios'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import nftMintAbi from '../contracts/nftMintContractABI.json'
import bucketAbi from '../contracts/bucketListContractABI.json'

const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS
const BUCKET_CONTRACT_ADDRESS = import.meta.env.VITE_BUCKET_LIST_CONTRACT_ADDRESS

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px',
    paddingBottom: '80px'
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  headerContent: {
    flex: '1 1 auto'
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  },
  nftCard: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(17, 24, 39, 0.05)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '177.77%', // 16:9 aspect ratio
    backgroundColor: '#000'
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  videoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '16px',
    color: 'white',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  creatorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    cursor: 'pointer'
  },
  bucketButton: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    position: 'relative',
    zIndex: 2
  },
  bucketList: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
    zIndex: 1000,
    WebkitOverflowScrolling: 'touch',
    '@media (max-width: 768px)': {
      width: '95%',
      maxHeight: '70vh'
    }
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    touchAction: 'none'
  },
  bucketHeader: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px'
  },
  bucketItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB'
  },
  bucketItemLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#111827',
    fontSize: '16px'
  },
  bucketLocation: {
    marginLeft: '28px',
    color: '#6B7280',
    fontSize: '14px',
    marginTop: '4px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    accentColor: '#6366F1'
  },
  saveButton: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '500'
  },
  saveButtonHover: {
    backgroundColor: '#4F46E5'
  }
}

const fetchNFTMetadataFromIPFS = async (ipfsHash) => {
  try {
    const ipfsGatewayUrl = `https://peach-accused-eel-595.mypinata.cloud/ipfs/${ipfsHash.split('ipfs://')[1]}`
    const response = await axios.get(ipfsGatewayUrl)
    return response.data
  } catch (error) {
    console.error(`Error fetching metadata from IPFS hash: ${ipfsHash}`, error)
    return null
  }
}

const fetchMintedNFTs = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftMintAbi, signer)
    
    const [tokenIds, owners, metadataURIs] = await contract.allMintedTokens()
    const tokenData = tokenIds.map((id, index) => ({
      tokenId: id.toString(),
      owner: owners[index],
      metadataURI: metadataURIs[index],
    }))

    const MetaDataNFTs = await Promise.all(
      tokenData.map(async (token) => {
        const metadata = await fetchNFTMetadataFromIPFS(token.metadataURI)
        return {
          tokenId: token.tokenId,
          owner: token.owner,
          metadata,
        }
      })
    )

    return MetaDataNFTs
  } catch (error) {
    console.error(`Error fetching NFTs:`, error)
    throw error
  }
}

function VideoCard({ nft }) {
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showBucket, setShowBucket] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const videoId = nft.metadata.properties.videoId
  const creator = nft.metadata.properties.creatorName
  const description = nft.metadata.description
  const buckets = nft.metadata.properties.buckets

  // Add state for tracking touch events
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  const handleItemChange = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.find(selectedItem => selectedItem.name === item.name)
      if (isSelected) {
        return prev.filter(selectedItem => selectedItem.name !== item.name)
      } else {
        return [...prev, item]
      }
    })
  }

  const addToBucketList = async () => {
    try {
      const bucketDetails = {
        bucketTypes: [],
        names: [],
        places: []
      }

      selectedItems.forEach(item => {
        bucketDetails.bucketTypes.push(item.type)
        bucketDetails.names.push(item.name)
        bucketDetails.places.push(item.mapData?.placePrediction?.text?.text)
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(BUCKET_CONTRACT_ADDRESS, bucketAbi, signer)

      const tx = await contract.linkNFTToBuckets(
        NFT_CONTRACT_ADDRESS,
        nft.tokenId,
        bucketDetails.bucketTypes,
        bucketDetails.names,
        bucketDetails.places
      )

      await tx.wait()
      setShowBucket(false)
    } catch (error) {
      console.error('Error adding to bucket list:', error)
    }
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isVisible ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${videoId}&mute=0`

  // Handle touch events to prevent accidental clicks
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY)
    setTouchEnd(null)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = Math.abs(touchStart - touchEnd)
    const isSwipe = distance > 20 // Consider it a swipe if moved more than 20px
    
    if (!isSwipe) {
      setShowBucket(true)
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleBucketClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowBucket(true)
  }

  return (
    <div style={styles.nftCard}>
      <div ref={videoRef} style={styles.videoContainer}>
        <iframe
          src={embedUrl}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={styles.iframe}
        />
        <div style={styles.videoInfo}>
          <div style={styles.creatorInfo}>
            <UserCircleIcon style={{ width: 20, height: 20, color: '#6366F1' }} />
            <span>{creator}</span>
          </div>
          <p>{description}</p>
          <button 
            style={styles.bucketButton}
            onClick={handleBucketClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            BuckIt
          </button>
        </div>
      </div>

      {showBucket && (
        <>
          <div 
            style={styles.overlay} 
            onClick={() => setShowBucket(false)}
            onTouchStart={() => setShowBucket(false)}
          />
          <div style={styles.bucketList}>
            <div style={styles.bucketHeader}>
              <span>Add to Bucket List</span>
              <button 
                style={styles.closeButton}
                onClick={() => setShowBucket(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 6l8 8m0-8l-8 8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            
            {buckets?.map((item, index) => {
              const isSelected = selectedItems.find(selectedItem => selectedItem.name === item.name)
              return (
                <div key={index} style={styles.bucketItem}>
                  <label style={styles.bucketItemLabel}>
                    <input
                      type="checkbox"
                      checked={!!isSelected}
                      onChange={() => handleItemChange(item)}
                      style={styles.checkbox}
                    />
                    <div>{index + 1}. {item.name}</div>
                  </label>
                  {item.mapData?.placePrediction?.text?.text && (
                    <div style={styles.bucketLocation}>
                      {item.mapData.placePrediction.text.text}
                    </div>
                  )}
                </div>
              )
            })}
            
            <button 
              style={styles.saveButton}
              onClick={addToBucketList}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4F46E5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6366F1'
              }}
            >
              Save to Bucket List
            </button>
          </div>
        </>
      )}
    </div>
  )
}

VideoCard.propTypes = {
  nft: PropTypes.shape({
    tokenId: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      description: PropTypes.string.isRequired,
      properties: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
        creatorName: PropTypes.string.isRequired,
        buckets: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string,
          mapData: PropTypes.shape({
            placePrediction: PropTypes.shape({
              text: PropTypes.shape({
                text: PropTypes.string
              })
            })
          })
        }))
      }).isRequired
    }).isRequired
  }).isRequired
}

export default function Home() {
  const { user } = usePrivy()
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const mintedNFTs = await fetchMintedNFTs()
        setNfts(mintedNFTs)
      } catch (error) {
        console.error('Error loading NFTs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNFTs()
  }, [])
  
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
      
      <div style={styles.content}>
        {loading ? (
          <div>Loading your travel memories...</div>
        ) : nfts.length > 0 ? (
          nfts.map((nft) => (
            <VideoCard key={nft.tokenId} nft={nft} />
          ))
        ) : (
          <div>No travel memories found. Start by uploading some content!</div>
        )}
      </div>
    </div>
  )
} 