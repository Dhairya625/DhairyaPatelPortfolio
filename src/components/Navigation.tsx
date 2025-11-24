'use client'

import { useState, useEffect } from 'react'
import BubbleMenu from '@/components/ui/BubbleMenu'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    {
      label: 'Home',
      href: '/',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#bee9e8', textColor: '#ffffff' }
    },
    {
      label: 'About',
      href: '/about',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '#62b6cb', textColor: '#ffffff' }
    },
    {
      label: 'Skills',
      href: '/skills',
      ariaLabel: 'Skills',
      rotation: -8,
      hoverStyles: { bgColor: '#1b4965', textColor: '#ffffff' }
    },
    {
      label: 'Projects',
      href: '/projects',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#cae9ff', textColor: '#ffffff' }
    },
    {
      label: 'Contact',
      href: '/contact',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#5fa8d3', textColor: '#ffffff' }
    }
  ]

  const handleMenuClick = (open: boolean) => {
    console.log('Menu is', open ? 'open' : 'closed')
  }

  return (
    <>
      {/* Background overlay when scrolled */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-[999] h-20 md:h-24 bg-black/60 backdrop-blur-xl border-b border-white/5" />
      )}

      {/* BubbleMenu */}
      <BubbleMenu
        logo={
          <div className="flex flex-col items-center">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500 font-light mb-1">
              Portfolio
            </span>
            <span className="text-lg font-light tracking-tight">
              DP
            </span>
          </div>
        }
        onMenuClick={handleMenuClick}
        className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[1000]"
        menuBg="#000000"
        menuContentColor="#ffffff"
        useFixedPosition={true}
        items={menuItems}
        animationEase="back.out(1.7)"
        animationDuration={0.6}
        staggerDelay={0.1}
      />

      {/* Time/Location Display */}
      {isScrolled && (
        <div className="fixed top-20 md:top-24 left-0 right-0 z-[998] border-b border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16 py-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-[10px] tracking-wider uppercase text-gray-600">
              <span>IST — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              <span>Based in India</span>
              <span>Available for projects</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
