'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GooeyText } from '@/components/ui/goey-text-morphing'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)


  // Advanced canvas network animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > (canvas?.width || 0)) this.vx *= -1
        if (this.y < 0 || this.y > (canvas?.height || 0)) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            if (!ctx) return
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // GSAP Premium Animations
  useEffect(() => {
    const ctx = gsap.context(() => {


      // Subtitle with split text
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current.querySelectorAll('.subtitle-line'), {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1,
        })
      }

      // CTA buttons
      gsap.from('.cta-btn', {
        opacity: 0,
        scale: 0.9,
        y: 20,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.7)',
        delay: 1.3,
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src="/port.jpg"
            alt="Background"
            className="w-3/4 h-3/4 object-contain rounded-2xl"
            style={{
              filter: 'brightness(1) contrast(1.1)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
          {/* Main Content Layout */}
          <div className="flex items-center justify-center min-h-screen py-20">
            {/* Content */}
            <div className="w-full max-w-4xl space-y-12 text-center">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 opacity-60">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white" />
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-light">
                  Computer Science Engineer
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-r from-white to-transparent" />
              </div>




              {/* Name at the bottom */}
              <div className="pt-64">
                <GooeyText
                  texts={['DHAIRYA PATEL', 'DEVELOPER', 'DESIGNER', 'CREATOR']}
                  morphTime={2}
                  cooldownTime={0.5}
                  className="w-full"
                  textClassName="font-bold text-6xl md:text-7xl xl:text-8xl bg-clip-text text-white tracking-tighter"
                  style={{ fontFamily: 'Newake, cursive' }}
                />
              </div>

              {/* Social Links - Minimalist */}
              <div className="flex items-center justify-center gap-10 pt-8">
                {[
                  { name: 'GitHub', href: 'https://github.com/Dhairya625' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dhairya-patel-1482122b2/' },
                  { name: 'Twitter', href: 'https://x.com/candybotz' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group text-xs tracking-widest uppercase text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    {social.name}
                    <div className="w-0 group-hover:w-full h-[1px] bg-white transition-all duration-500" />
                  </a>
                ))}
              </div>
            </div>

            </div>
          </div>
          

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-6 flex justify-between items-center text-xs tracking-wider uppercase text-gray-600">
            <p>Based in India</p>
            <p>Open to remote opportunities</p>
            <p>© 2025</p>
        </div>
      </div>
    </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .char {
          display: inline-block;
        }

        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
      `}</style>
    </>
  )
}

export default Hero
