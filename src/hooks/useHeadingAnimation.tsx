// hooks/useHeadingAnimation.tsx
'use client'

import { useEffect, useRef, MutableRefObject } from 'react'
import { gsap } from 'gsap'

interface UseHeadingAnimationOptions {
  /**
   * Animation type for each letter
   * @default 'bounce'
   */
  animationType?: 'flip' | 'rotate' | 'elastic' | 'squeeze' | 'wave' | 'random' | 'varied'
  
  /**
   * Duration of the animation in seconds
   * @default 0.5
   */
  duration?: number
  
  /**
   * Easing function
   * @default 'elastic.out(1, 0.3)'
   */
  ease?: string
  
  /**
   * Scale factor during animation
   * @default 1.2
   */
  scale?: number
  
  /**
   * Whether to add squish effect (scaleX variation)
   * @default true
   */
  enableSquish?: boolean
  
  /**
   * Color change on hover
   * @default undefined (no color change)
   */
  hoverColor?: string
  
  /**
   * Whether to add glow effect on hover
   * @default false
   */
  addGlow?: boolean
  
  /**
   * Stagger delay between adjacent letters (in seconds)
   * @default 0.05
   */
  adjacentStagger?: number
}

/**
 * Custom hook for playful GSAP heading animations with per-letter interactivity
 * Inspired by GSAP homepage - no layout shift during animations
 * @param options - Configuration options for the animation
 * @returns Ref to attach to the heading element
 */
export const useHeadingAnimation = (
  options: UseHeadingAnimationOptions = {}
): MutableRefObject<HTMLElement | null> => {
  const {
    animationType = 'bounce',
    duration = 0.5,
    ease = 'elastic.out(1, 0.3)',
    scale = 1.2,
    enableSquish = true,
    hoverColor,
    addGlow = false,
    adjacentStagger = 0.05,
  } = options

  const headingRef = useRef<HTMLElement | null>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const timelinesRef = useRef<gsap.core.Timeline[]>([])

  useEffect(() => {
    if (!headingRef.current) return

    // Store original styles
    const originalStyles = {
      letterSpacing: window.getComputedStyle(headingRef.current).letterSpacing,
      lineHeight: window.getComputedStyle(headingRef.current).lineHeight,
    }

    // Split text into individual characters
    const text = headingRef.current.textContent || ''
    const chars = text.split('').map((char) => char === ' ' ? '\u00A0' : char)

    // Clear existing content
    headingRef.current.innerHTML = ''

    // Maintain original spacing
    headingRef.current.style.letterSpacing = originalStyles.letterSpacing
    headingRef.current.style.lineHeight = originalStyles.lineHeight

    // Create span for each character
    charsRef.current = chars.map((char, index) => {
      const span = document.createElement('span')
      span.textContent = char
      
      // Critical: Keep layout stable during animations
      span.style.display = 'inline-block'
      span.style.position = 'relative'
      span.style.cursor = 'pointer'
      span.style.transition = 'text-shadow 0.3s ease, color 0.2s ease'
      
      // Prevent layout shift - keep original space
      span.style.transformOrigin = 'center center'
      span.style.willChange = 'transform'
      
      // Prevent text selection for better UX
      span.style.userSelect = 'none'
      span.style.WebkitUserSelect = 'none'
      
      span.dataset.index = String(index)
      
      headingRef.current?.appendChild(span)
      return span
    })

    // Create animation timeline for each character
    timelinesRef.current = charsRef.current.map((char, index) => {
      const tl = gsap.timeline({ paused: true })

      // Define animation based on type - using transforms only (no scale changes that affect layout)
      switch (animationType) {
        case 'bounce':
          tl.to(char, {
            y: -20,
            duration: duration * 0.4,
            ease: 'power2.out',
          }).to(char, {
            y: 0,
            duration: duration * 0.6,
            ease: ease,
          })
          break

        case 'flip':
          tl.to(char, {
            rotationX: 360,
            duration: duration,
            ease: ease,
          })
          break

        case 'rotate':
          tl.to(char, {
            rotation: 360,
            duration: duration,
            ease: ease,
          })
          break

        case 'elastic':
          tl.to(char, {
            y: -20,
            duration: duration * 0.3,
            ease: 'power2.out',
          }).to(char, {
            y: 5,
            duration: duration * 0.3,
            ease: 'power2.in',
          }).to(char, {
            y: 0,
            duration: duration * 0.4,
            ease: 'elastic.out(1, 0.5)',
          })
          break

        case 'squeeze':
          // Use skew instead of scale for squish effect
          tl.to(char, {
            skewX: 10,
            duration: duration * 0.3,
            ease: 'power2.inOut',
          }).to(char, {
            skewX: -10,
            duration: duration * 0.4,
            ease: 'power2.inOut',
          }).to(char, {
            skewX: 0,
            duration: duration * 0.3,
            ease: 'elastic.out(1, 0.3)',
          })
          break

        case 'wave':
          tl.to(char, {
            y: -15,
            duration: duration * 0.4,
            ease: 'power2.out',
          }).to(char, {
            y: 5,
            duration: duration * 0.3,
            ease: 'power2.inOut',
          }).to(char, {
            y: 0,
            duration: duration * 0.3,
            ease: 'elastic.out(1, 0.4)',
          })
          break

        case 'random':
          const randomTypes: Array<'bounce' | 'flip' | 'rotate' | 'elastic' | 'squeeze' | 'wave'> = 
            ['bounce', 'flip', 'rotate', 'elastic', 'squeeze', 'wave']
          const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)]
          
          // Apply random animation inline
          if (randomType === 'bounce') {
            tl.to(char, { y: -20, duration: duration * 0.4, ease: 'power2.out' })
              .to(char, { y: 0, duration: duration * 0.6, ease: ease })
          } else if (randomType === 'rotate') {
            tl.to(char, { rotation: 360, duration: duration, ease: ease })
          } else if (randomType === 'wave') {
            tl.to(char, { y: -15, duration: duration * 0.4, ease: 'power2.out' })
              .to(char, { y: 5, duration: duration * 0.3, ease: 'power2.inOut' })
              .to(char, { y: 0, duration: duration * 0.3, ease: 'elastic.out(1, 0.4)' })
          }
          break
          
        case 'varied':
          // Each letter gets a different animation type based on its position
          const variedTypes: Array<'bounce' | 'flip' | 'rotate' | 'elastic' | 'squeeze' | 'wave'> = 
            ['bounce', 'flip', 'rotate', 'elastic', 'squeeze', 'wave']
          const letterAnimationType = variedTypes[index % variedTypes.length]
          
          switch (letterAnimationType) {
            case 'bounce':
              tl.to(char, {
                y: -20,
                scaleY: enableSquish ? 1.3 : scale,
                scaleX: enableSquish ? 0.9 : scale,
                duration: duration * 0.4,
                ease: 'power2.out',
              }).to(char, {
                y: 0,
                scaleY: enableSquish ? 0.9 : 1,
                scaleX: enableSquish ? 1.1 : 1,
                duration: duration * 0.3,
                ease: 'power2.in',
              }).to(char, {
                scaleY: 1,
                scaleX: 1,
                duration: duration * 0.3,
                ease: ease,
              })
              break

            case 'flip':
              tl.to(char, {
                rotationX: 360,
                scale: scale,
                duration: duration,
                ease: ease,
              })
              break

            case 'rotate':
              tl.to(char, {
                rotation: 360,
                scale: scale,
                duration: duration,
                ease: ease,
              })
              break

            case 'elastic':
              tl.to(char, {
                y: -15,
                scaleY: 1.4,
                scaleX: 0.8,
                duration: duration * 0.3,
                ease: 'power2.out',
              }).to(char, {
                y: 0,
                scaleY: 0.8,
                scaleX: 1.2,
                duration: duration * 0.3,
                ease: 'power2.in',
              }).to(char, {
                scaleY: 1.1,
                scaleX: 0.95,
                duration: duration * 0.2,
                ease: 'power1.inOut',
              }).to(char, {
                scaleY: 1,
                scaleX: 1,
                duration: duration * 0.2,
                ease: 'elastic.out(1, 0.5)',
              })
              break

            case 'squeeze':
              tl.to(char, {
                scaleX: 1.5,
                scaleY: 0.7,
                duration: duration * 0.3,
                ease: 'power2.inOut',
              }).to(char, {
                scaleX: 0.8,
                scaleY: 1.3,
                duration: duration * 0.4,
                ease: 'elastic.out(1, 0.4)',
              }).to(char, {
                scaleX: 1,
                scaleY: 1,
                duration: duration * 0.3,
                ease: 'elastic.out(1, 0.3)',
              })
              break

            case 'wave':
              tl.to(char, {
                y: -15,
                duration: duration * 0.4,
                ease: 'power2.out',
              }).to(char, {
                y: 5,
                duration: duration * 0.3,
                ease: 'power2.inOut',
              }).to(char, {
                y: 0,
                duration: duration * 0.3,
                ease: 'elastic.out(1, 0.4)',
              })
              break
          }
          break
          
        default:
          tl.to(char, {
            y: -20,
            duration: duration * 0.5,
            ease: 'power2.out',
          }).to(char, {
            y: 0,
            duration: duration * 0.5,
            ease: ease,
          })
      }

      // Add color change if specified (as separate animation, not affecting timeline)
      if (hoverColor) {
        // Color changes via CSS transition, not GSAP timeline
      }

      return tl
    })

    // Add event listeners for each character
    charsRef.current.forEach((char, index) => {
      const handleMouseEnter = () => {
        // Play animation for hovered character
        timelinesRef.current[index]?.restart()

        // Color change via inline style (uses CSS transition)
        if (hoverColor) {
          char.style.color = hoverColor
        }

        // Add glow effect if enabled
        if (addGlow) {
          char.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)'
        }

        // Animate adjacent characters with stagger
        if (adjacentStagger > 0) {
          if (index > 0) {
            gsap.delayedCall(adjacentStagger, () => {
              timelinesRef.current[index - 1]?.restart()
              if (hoverColor) charsRef.current[index - 1].style.color = hoverColor
              if (addGlow) charsRef.current[index - 1].style.textShadow = 
                '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)'
            })
          }

          if (index < charsRef.current.length - 1) {
            gsap.delayedCall(adjacentStagger, () => {
              timelinesRef.current[index + 1]?.restart()
              if (hoverColor) charsRef.current[index + 1].style.color = hoverColor
              if (addGlow) charsRef.current[index + 1].style.textShadow = 
                '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)'
            })
          }
        }
      }

      const handleMouseLeave = () => {
        // Reset color for current character back to white
        if (hoverColor) {
          char.style.color = 'white'
        }

        // Remove glow effect for current character
        if (addGlow) {
          char.style.textShadow = ''
        }

        // Reset color and glow for adjacent characters
        if (adjacentStagger > 0) {
          if (index > 0 && hoverColor) {
            charsRef.current[index - 1].style.color = 'white'
          }
          if (index < charsRef.current.length - 1 && hoverColor) {
            charsRef.current[index + 1].style.color = 'white'
          }
          if (addGlow) {
            if (index > 0) {
              charsRef.current[index - 1].style.textShadow = ''
            }
            if (index < charsRef.current.length - 1) {
              charsRef.current[index + 1].style.textShadow = ''
            }
          }
        }
      }

      char.addEventListener('mouseenter', handleMouseEnter)
      char.addEventListener('mouseleave', handleMouseLeave)
    })

    // Cleanup function
    return () => {
      timelinesRef.current.forEach((tl) => tl.kill())
      charsRef.current.forEach((char) => {
        const clone = char.cloneNode(true)
        char.parentNode?.replaceChild(clone, char)
      })
    }
  }, [animationType, duration, ease, scale, enableSquish, hoverColor, addGlow, adjacentStagger])

  return headingRef
}

// Export preset configurations - optimized for no layout shift
export const HEADING_ANIMATION_PRESETS = {
  playful: {
    animationType: 'bounce' as const,
    duration: 0.6,
    ease: 'elastic.out(1, 0.3)',
    scale: 1.2,
    enableSquish: false, // Disabled to prevent layout shift
  },
  elegant: {
    animationType: 'wave' as const,
    duration: 0.8,
    ease: 'power2.out',
    scale: 1.1,
    enableSquish: false,
  },
  energetic: {
    animationType: 'elastic' as const,
    duration: 0.7,
    ease: 'elastic.out(1.2, 0.4)',
    scale: 1.3,
    enableSquish: false,
    addGlow: true,
  },
  minimal: {
    animationType: 'squeeze' as const,
    duration: 0.4,
    ease: 'power2.inOut',
    scale: 1.1,
    enableSquish: false,
  },
  dynamic: {
    animationType: 'flip' as const,
    duration: 0.5,
    ease: 'back.out(1.7)',
    scale: 1.15,
    enableSquish: false,
  },
  chaotic: {
    animationType: 'random' as const,
    duration: 0.6,
    ease: 'elastic.out(1, 0.3)',
    scale: 1.2,
    enableSquish: false,
    adjacentStagger: 0.08,
  },
  gsapStyle: {
    animationType: 'bounce' as const,
    duration: 0.5,
    ease: 'power2.out',
    scale: 1,
    enableSquish: false,
    hoverColor: '#88CE02', // GSAP green
    addGlow: false,
    adjacentStagger: 0,
  },
  varied: {
    animationType: 'varied' as const,
    duration: 2.0,
    ease: 'elastic.out(1, 0.3)',
    scale: 1.2,
    enableSquish: true,
    hoverColor: '#4472ca',
    addGlow: true,
    adjacentStagger: 0.12,
  },
}
