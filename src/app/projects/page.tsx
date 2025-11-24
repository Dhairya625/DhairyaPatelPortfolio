'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation'

gsap.registerPlugin(ScrollTrigger)

const ProjectsPreview = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
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

      // Project cards
      if (projectsRef.current) {
        gsap.from(projectsRef.current.querySelectorAll('.project-card'), {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 70%',
          },
          opacity: 0,
          y: 80,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'WedTech',
      subtitle: 'Event Management Platform',
      description: 'End-to-end event management solution with AI-powered recommendations, vendor coordination, and real-time collaboration tools.',
      year: '2024',
      role: 'Full-stack Developer',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI/ML'],
      link: '/projects/wedtech',
      metrics: { users: '1.2K+', satisfaction: '95%' },
    },
    {
      id: 2,
      title: 'SmartSchedule',
      subtitle: 'AI Timetable Creator',
      description: 'Intelligent scheduling system using machine learning algorithms for conflict-free timetable generation and resource optimization.',
      year: '2024',
      role: 'AI/ML Engineer',
      technologies: ['Python', 'TensorFlow', 'React.js', 'FastAPI'],
      link: '/projects/smartschedule',
      metrics: { accuracy: '98%', timeSaved: '75%' },
    },
    {
      id: 3,
      title: 'CodeCrate',
      subtitle: 'Virtual Study Workspace',
      description: 'Collaborative learning environment with integrated code editor, real-time messaging, and productivity analytics dashboard.',
      year: '2023',
      role: 'Lead Developer',
      technologies: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis'],
      link: '/projects/codecrate',
      metrics: { users: '800+', engagement: '4.5h avg' },
    },
    {
      id: 4,
      title: 'MentalHealthBot',
      subtitle: 'AI-Powered Mental Health Support',
      description: 'Comprehensive mental health chatbot application built with React and TypeScript, featuring AI-powered conversations and mental wellness resources.',
      year: '2024',
      role: 'Full-Stack Developer',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'],
      link: 'https://github.com/Dhairya625/mentalhealthbot',
      metrics: { stars: '1', commits: '3' },
    },
    {
      id: 5,
      title: 'Mentor Link Guild',
      subtitle: 'Mentorship Platform',
      description: 'Modern mentorship platform built with React and TypeScript, connecting mentors with mentees through an intuitive and responsive interface.',
      year: '2024',
      role: 'Frontend Developer',
      technologies: ['React', 'TypeScript', 'Vite', 'shadcn-ui', 'Tailwind CSS'],
      link: 'https://github.com/Dhairya625/mentor-link-guild',
      metrics: { commits: '5', languages: 'TypeScript 98%' },
    },
  ]

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
          className="w-full h-full"
        />
      </div>

      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/5 via-transparent to-transparent blur-3xl" />

      <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16 md:mb-24">
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 opacity-60">
            <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-white" />
            <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-500 font-light">Selected Works</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-end">
            <div>
                <h2 
                  ref={animatedHeadingRef as React.RefObject<HTMLHeadingElement>}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[0.9] px-2 sm:px-0"
                >
                  Featured Projects
                </h2>

              <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
                <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-blue-500 to-teal-500" />
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
              </div>
            </div>

          </div>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-12 sm:space-y-16 md:space-y-24 mb-16 sm:mb-24 md:mb-32">
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              href={project.link}
              className="project-card group block"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
                {/* Image Column */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    {/* Black Background */}
                    <div className="w-full h-full bg-black" />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Border frame */}
                    <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-500" />

                    {/* Project number overlay */}
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-[60px] sm:text-[80px] md:text-[120px] font-light text-white/5 group-hover:text-white/10 transition-colors duration-500 leading-none">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* View project indicator */}
                    <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white">View Case Study</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Meta info */}
                  <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs tracking-widest uppercase text-gray-600 mb-4 sm:mb-6">
                    <span>{project.year}</span>
                    <span>·</span>
                    <span>{project.role}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>

                  <p className="text-base sm:text-lg text-gray-500 font-light mb-4 sm:mb-6">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed mb-6 sm:mb-8">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10 flex-wrap">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xl sm:text-2xl font-light text-white mb-1">{value}</div>
                        <div className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gray-600">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10 text-[10px] sm:text-xs text-gray-500 font-light tracking-wider hover:border-white/30 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase">Explore Project</span>
                    <div className="w-8 sm:w-12 h-[1px] bg-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="border-t border-white/10 pt-8 sm:pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light leading-relaxed">
                Interested in seeing more of my work and detailed case studies?
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border border-white/20 hover:border-white/40 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative text-xs sm:text-sm tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">
                  View All Projects
                </span>
                <svg
                  className="relative w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black group-hover:translate-x-2 transition-all duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
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

export default ProjectsPreview
