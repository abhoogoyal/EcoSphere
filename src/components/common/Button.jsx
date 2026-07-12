import React from 'react'

const VARIANTS = {
  primary: 'bg-forest-500 text-white hover:bg-forest-600',
  secondary: 'bg-white text-ink border border-ink/10 hover:bg-ink/[0.03]',
  ghost: 'text-ink/70 hover:bg-ink/[0.05]',
  danger: 'bg-rose-500 text-white hover:bg-rose-600',
}

export default function Button({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  )
}
