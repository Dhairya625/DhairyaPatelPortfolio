'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CometCard } from '@/components/ui/comet-card'
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [activeYear, setActiveYear] = useState(2025)
  const animatedHeadingRef = useHeadingAnimation({
    animationType: 'varied',
    duration: 2.0,
    ease: 'elastic.out(1, 0.3)',
    hoverColor: '#4472ca',
    addGlow: true,
    adjacentStagger: 0.12,
  }) as React.RefObject<HTMLHeadingElement>

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image reveal with mask
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
          },
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      // Content paragraphs stagger
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.content-block'), {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
        })
      }

      // Stats counter animation
      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll('.stat-number')
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0')
          gsap.from(stat, {
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
            },
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            onUpdate: function () {
              stat.textContent = Math.ceil(this.targets()[0].textContent).toString()
            },
          })
        })
      }

      // Parallax effect on image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const timeline = [
    { year: 2022, title: 'Started Journey', description: 'Began learning web development fundamentals' },
    { year: 2023, title: 'First Projects', description: 'Built real-world applications with MERN stack' },
    { year: 2024, title: 'Professional Growth', description: 'Internship at Minimal Dot Technologies' },
    { year: 2025, title: 'Current Focus', description: 'Specializing in AI/ML integration & scalable systems' },
  ]

  const expertise = [
    { category: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
    { category: 'Backend', skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs'] },
    { category: 'AI/ML', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision'] },
    { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'] },
  ]

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
          className="w-full h-full"
        />
      </div>

      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/5 via-transparent to-transparent blur-3xl" />

      <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16 md:mb-24">
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 opacity-60">
            <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-white" />
            <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-500 font-light">About</span>
          </div>

          <h2 
            ref={animatedHeadingRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white leading-[0.9] px-2 sm:px-0"
          >
            Building Digital Excellence
          </h2>

          <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
            <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-blue-500 to-teal-500" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 mb-16 sm:mb-24 md:mb-32">
          {/* Left Column - Image */}
          <div className="lg:col-span-5">
            <div ref={imageRef} className="lg:sticky lg:top-32">
              <CometCard 
                rotateDepth={12}
                translateDepth={15}
                className="w-full"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group bg-gradient-to-br from-gray-900 to-gray-800">
                  {/* Image */}
                  <img
                    src="/images/profile.jpg"
                    alt="Dhairya Patel"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Border Frame */}
                  <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/40" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/40" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/40" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/40" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </CometCard>

              {/* Info Card */}
              <div className="mt-8 border border-white/10 p-8 bg-white/[0.02] backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-green-500 mt-2 animate-pulse" />
                    <div>
                      <p className="text-xs tracking-widest uppercase text-gray-600 mb-1">Status</p>
                      <p className="text-sm text-white font-light">Available for Projects</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="text-xs tracking-widest uppercase text-gray-600 mb-1">Location</p>
                      <p className="text-sm text-white font-light">India (Remote)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal-500 mt-2" />
                    <div>
                      <p className="text-xs tracking-widest uppercase text-gray-600 mb-1">Education</p>
                      <p className="text-sm text-white font-light">Parul University</p>
                    </div>
                  </div>
                </div>

                {/* Resume Download Button */}
                <div className="pt-6 border-t border-white/5">
                  <a
                    href="/DhairyaHimanshuPatelResume.pdf"
                    download="Dhairya_Patel_Resume.pdf"
                    className="group flex items-center gap-3 text-sm text-white hover:text-blue-400 transition-colors duration-300"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="tracking-wide">Download Resume</span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="lg:col-span-7 space-y-8 sm:space-y-12 md:space-y-16">
            {/* Introduction */}
            <div className="content-block space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed">
                A Computer Science Engineering student at{' '}
                <span className="text-white">Parul University</span> with deep expertise in{' '}
                <span className="text-white">full-stack development</span> and emerging{' '}
                <span className="text-white">AI/ML technologies</span>.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-500 font-light leading-relaxed">
                My journey began with curiosity about how digital products shape user experiences. 
                Through rigorous self-learning and a professional internship at{' '}
                <span className="text-gray-400">Minimal Dot Technologies</span>, I've honed my 
                craft in building scalable, user-centered applications that solve real-world problems.
              </p>
            </div>

            {/* Philosophy */}
            <div className="content-block border-l-2 border-white/10 pl-8 py-4">
              <p className="text-sm tracking-wide uppercase text-gray-600 mb-4 font-light">Philosophy</p>
              <p className="text-lg text-gray-400 font-light leading-relaxed italic">
                "Great design is invisible. The best code is maintainable. Excellence lies in the 
                intersection of aesthetics, functionality, and performance."
              </p>
            </div>


            {/* Expertise Grid */}
            <div className="content-block space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="text-xs sm:text-sm tracking-widest uppercase text-gray-600 font-light">Technical Expertise</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {expertise.map((item, idx) => (
                  <div
                    key={item.category}
                    className="group border border-white/5 p-6 hover:border-white/10 transition-all duration-500 bg-white/[0.01] hover:bg-white/[0.02]"
                  >
                    <p className="text-xs tracking-widest uppercase text-gray-600 mb-4">
                      {item.category}
                    </p>
                    <div className="space-y-2">
                      {item.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-sm text-gray-400 font-light">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div className="content-block space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="text-sm tracking-widest uppercase text-gray-600 font-light">My Approach</h3>
              </div>

              <div className="space-y-4">
                {[
                  { num: '01', title: 'Research & Strategy', desc: 'Deep dive into user needs and business objectives' },
                  { num: '02', title: 'Design & Architecture', desc: 'Craft scalable solutions with modern best practices' },
                  { num: '03', title: 'Development & Testing', desc: 'Build with precision, test rigorously for quality' },
                  { num: '04', title: 'Deploy & Optimize', desc: 'Launch efficiently, monitor, and iterate continuously' },
                ].map((step) => (
                  <div key={step.num} className="group flex gap-6 py-4 border-b border-white/5 hover:border-white/10 transition-colors duration-300">
                    <span className="text-xs text-gray-700 font-light mt-1">{step.num}</span>
                    <div className="flex-1">
                      <h4 className="text-base text-white font-bold mb-1 group-hover:text-white transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-white/10 pt-12 sm:pt-16 md:pt-24">
          <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <h3 className="text-xs sm:text-sm tracking-widest uppercase text-gray-600 font-light">Journey Timeline</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

            <div className="space-y-8 sm:space-y-10 md:space-y-12 md:pl-16">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className="group relative"
                  onMouseEnter={() => setActiveYear(item.year)}
                >
                  {/* Year Marker */}
                  <div className="absolute -left-[49px] top-2 hidden md:flex items-center justify-center w-3 h-3 rounded-full border-2 border-white/40 bg-[#0a0a0a] group-hover:border-white group-hover:bg-white transition-all duration-300">
                    {activeYear === item.year && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
                    <div className="md:w-24 flex-shrink-0">
                      <span className="text-2xl sm:text-3xl font-light text-white/40 group-hover:text-white transition-colors duration-300">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex-1 pb-6 sm:pb-8 border-b border-white/5">
                      <h4 className="text-lg sm:text-xl text-white font-bold mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 font-light">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 sm:mt-24 md:mt-32 text-center max-w-3xl mx-auto px-4 sm:px-0">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light leading-relaxed mb-6 sm:mb-8">
            Currently seeking opportunities to collaborate on innovative projects that push the boundaries 
            of web technology and create meaningful user experiences.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-widest uppercase text-white group"
          >
            <span>Let's Work Together</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="w-0 group-hover:w-full h-[1px] bg-white transition-all duration-500 absolute bottom-0 left-0" />
          </a>
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

export default About
