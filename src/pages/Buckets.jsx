import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import bucketAbi from '../contracts/bucketListContractABI.json'

const BUCKET_CONTRACT_ADDRESS = import.meta.env.VITE_BUCKET_LIST_CONTRACT_ADDRESS

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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    padding: '24px',
    margin: '16px 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease'
  },
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)'
  },
  countryTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '16px'
  },
  locationItem: {
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB'
  },
  locationName: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  locationType: {
    color: '#6366F1',
    fontSize: '14px',
    padding: '2px 8px',
    backgroundColor: '#EEF2FF',
    borderRadius: '4px'
  },
  locationAddress: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '4px'
  },
  price: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#059669',
    marginTop: '16px'
  },
  bookButton: {
    textAlign: 'right',
    color: '#6366F1',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'color 0.2s ease'
  }
}

function transformToCountryGroupedArray(nftLinks) {
  const countryMap = {}

  nftLinks.forEach((nftLink) => {
    const tokenId = nftLink.tokenId.toString()

    nftLink.selectedBuckets.forEach((bucket) => {
      const addressParts = bucket.place.split(", ")
      const country = addressParts[addressParts.length - 1]

      if (!countryMap[country]) {
        countryMap[country] = []
      }

      countryMap[country].push({
        nftId: tokenId,
        type: bucket.bucketType,
        name: bucket.name,
        address: bucket.place,
        isCompleted: bucket.isCompleted
      })
    })
  })

  return Object.entries(countryMap).map(([country, locations]) => ({
    country,
    locations: locations.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

export default function Buckets() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)

  const getBucketList = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const userAddress = await signer.getAddress()
      const contract = new ethers.Contract(BUCKET_CONTRACT_ADDRESS, bucketAbi, signer)

      const bucketListData = await contract.getUserBucketList(userAddress)
      const finalResult = transformToCountryGroupedArray(bucketListData)
      setCountries(finalResult)
    } catch (error) {
      console.error('Error fetching bucket list:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBucketList()
  }, [])

  const handleBookNow = (country, locations) => {
    console.log('Booking for:', { country, locations })
    // Add your booking logic here
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Your Travel Buckets</h1>
          <p style={styles.subtitle}>
            Explore your saved destinations grouped by country
          </p>
        </div>
      </div>

      {loading ? (
        <div>Loading your bucket list...</div>
      ) : countries.length > 0 ? (
        countries.map((item, countryIndex) => (
          <div
            key={countryIndex}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
          >
            <h2 style={styles.countryTitle}>{item.country}</h2>
            {item.locations.map((location, locationIndex) => (
              <div key={locationIndex} style={styles.locationItem}>
                <div style={styles.locationName}>
                  {locationIndex + 1}. {location.name}
                  <span style={styles.locationType}>
                    {location.type}
                  </span>
                </div>
                <div style={styles.locationAddress}>
                  {location.address}
                </div>
              </div>
            ))}
            <div style={styles.price}>
              {parseInt(Math.random() * 1000)} USD
            </div>
            <div
              style={styles.bookButton}
              onClick={() => handleBookNow(item.country, item.locations)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4F46E5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6366F1'
              }}
            >
              Book Now
            </div>
          </div>
        ))
      ) : (
        <div>No bucket list items found. Start by adding some destinations!</div>
      )}
    </div>
  )
} 