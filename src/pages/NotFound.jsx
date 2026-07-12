import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <Compass size={32} className="text-forest-600 mb-4" />
      <h1 className="font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-ink/55 mt-2">The page you're looking for doesn't exist in EcoSphere.</p>
      <Link to="/" className="mt-5 px-4 py-2 rounded-lg bg-forest-500 text-white text-sm font-medium hover:bg-forest-600">
        Back to Dashboard
      </Link>
    </div>
  )
}
