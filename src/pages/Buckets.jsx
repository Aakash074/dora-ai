export default function Buckets() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold leading-6 text-gray-900">
            Travel Buckets
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Organize and manage your travel inspirations in personalized buckets.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Bucket
          </button>
        </div>
      </div>
      
      {/* Placeholder for buckets grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Example bucket card */}
        <div className="relative group bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Beach destinations"
              className="object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Beach Destinations</h3>
          <p className="mt-1 text-sm text-gray-500">Collection of beautiful beaches around the world</p>
          <p className="mt-4 text-sm text-gray-500">12 places saved</p>
        </div>
      </div>
    </div>
  )
} 