'use client'

import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect if device supports touch
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
      )
    }

    const touchDevice = checkTouchDevice()
    setIsTouchDevice(touchDevice)

    // Only add mouse event listeners if not a touch device
    if (touchDevice) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-effect')
      ) {
        setCursorVariant('hover')
      } else {
        setCursorVariant('default')
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant('default')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null
  }

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border-2 border-white transition-all duration-200 ${
            cursorVariant === 'hover' ? 'scale-150 bg-white/10' : ''
          }`}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

export default CustomCursor
