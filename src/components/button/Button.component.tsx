import React from 'react'

export default function ButtonComponent({ children }: { children: React.ReactNode }) {
  return (
    <button>{children}</button>
  )
}
