'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation'

gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const animatedHeadingRef = useHeadingAnimation({
    animationType: 'varied',
    duration: 2.0,
    ease: 'elastic.out(1, 0.3)',
    hoverColor: '#4472ca',
    addGlow: true,
    adjacentStagger: 0.12,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Form fields animation
      if (formRef.current) {
        gsap.from(formRef.current.querySelectorAll('.form-field'), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        })
      }

      // Contact cards
      gsap.from('.contact-card', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'pateldhairya64@gmail.com',
      link: 'mailto:pateldhairya64@gmail.com',
      description: 'For project inquiries & collaboration',
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+91 9023185235',
      link: 'tel:+919023185235',
      description: 'Available Mon-Fri, 9AM-6PM IST',
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Vadodara, Gujarat',
      link: 'https://maps.google.com/?q=Vadodara,Gujarat,India',
      description: 'India · Remote friendly',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/dhairya-patel-1482122b2',
      description: 'Professional networking',
    },
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Dhairya625', handle: '@Dhairya625' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dhairya-patel-1482122b2', handle: 'Dhairya Patel' },
    { name: 'Twitter', url: 'https://x.com/candybotz', handle: '@candybotz' },
  ]

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.015] z-0">
        <div
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
          className="w-full h-full"
        />
      </div>

      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/5 via-transparent to-transparent blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/5 via-transparent to-transparent blur-3xl z-0" />

      <div className="relative max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-24">
          <div className="flex items-center gap-4 mb-6 opacity-60">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500 font-light">Get In Touch</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
                <h1 
                  ref={animatedHeadingRef}
                  className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter text-white leading-[0.9] mb-8"
                >
                  Let's Create Something
                </h1>

              <div className="flex items-center gap-4">
                <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-teal-500" />
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
              </div>
            </div>

          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="border border-green-500/30 bg-green-500/5 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-400 font-light mb-1">Message sent successfully!</p>
                      <p className="text-xs text-gray-500">I'll get back to you within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="form-field">
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase text-gray-600 mb-3 font-light"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-4 text-white placeholder-gray-600 text-base font-light transition-colors duration-300 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-field">
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase text-gray-600 mb-3 font-light"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-4 text-white placeholder-gray-600 text-base font-light transition-colors duration-300 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-field">
                <label
                  htmlFor="subject"
                  className="block text-xs tracking-widest uppercase text-gray-600 mb-3 font-light"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-4 text-white placeholder-gray-600 text-base font-light transition-colors duration-300 outline-none"
                  placeholder="Project Inquiry / Collaboration / Other"
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label
                  htmlFor="message"
                  className="block text-xs tracking-widest uppercase text-gray-600 mb-3 font-light"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-4 text-white placeholder-gray-600 text-base font-light transition-colors duration-300 outline-none resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-12 py-5 border border-white/20 hover:border-white/40 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 group-disabled:translate-y-full transition-transform duration-500" />
                  
                  {isSubmitting ? (
                    <span className="relative flex items-center gap-3 text-sm tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">
                      <div className="w-4 h-4 border border-white group-hover:border-black border-t-transparent rounded-full animate-spin" />
                      Sending
                    </span>
                  ) : (
                    <span className="relative flex items-center gap-3 text-sm tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">
                      Send Message
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-xs text-gray-600 mt-4 font-light">
                  Typical response time: 24-48 hours
                </p>
              </div>
            </form>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-10">

            {/* Social Links */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="text-sm tracking-widest uppercase text-gray-600 font-light">
                  Social Profiles
                </h3>
              </div>

              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                     className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/20 transition-colors duration-300"
                  >
                    <div>
                      <p className="text-sm text-white font-light group-hover:translate-x-1 transition-transform duration-300">
                        {social.name}
                      </p>
                       <p className="text-xs text-gray-500 mt-1">{social.handle}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="border border-white/10 p-8 bg-white/[0.01] relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-light mb-1">Currently Available</p>
                  <p className="text-xs text-gray-500 font-light">
                    Open to freelance projects and full-time opportunities
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="text-white font-light">100%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="text-white font-light">24 hours</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Timezone</span>
                  <span className="text-white font-light">IST (UTC+5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .char-reveal {
          display: inline-block;
        }
      `}</style>
    </section>
  )
}

export default ContactPage
