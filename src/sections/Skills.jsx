import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const skillGroups = [
  {
    title: 'Core Web Development',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'HTML & CSS', level: 80 },
      { name: 'React', level: 82 },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    skills: [
      { name: 'Data Structures & Algorithms', level: 78 },
      { name: 'Object Oriented Programming', level: 76 },
    ],
  },
  {
    title: 'Frontend Styling & Motion',
    skills: [
      { name: 'Tailwind CSS', level: 84 },
      { name: 'Responsive Design', level: 81 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', level: 77 },
      { name: 'Express.js', level: 75 },
      { name: 'REST APIs', level: 79 },
    ],
  },
  {
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', level: 83 },
      { name: 'Deployment', level: 78 },
    ],
  },
  {
    title: 'Advanced & Emerging Technologies',
    skills: [
      { name: 'Artificial Intelligence (Foundations)', level: 65 },
      { name: 'Machine Learning (Foundations)', level: 62 },
    ],
  },
]

function ProgressBar({ value, delay }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
      />
    </div>
  )
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const groupVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="skills" className="section">
      <SectionHeading 
        eyebrow="Skills" 
        title="Technical Expertise" 
        subtitle="A solid foundation in modern web development, supported by practical experience and core computer science principles." 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group, groupIdx) => (
          <motion.div
            key={group.title}
            variants={groupVariants}
            className="card p-6"
          >
            <h3 className="mb-6 font-display text-lg text-white">{group.title}</h3>
            <div className="space-y-5">
              {group.skills.map((skill, skillIdx) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
                    <span className="text-xs text-zinc-500">{skill.level}%</span>
                  </div>
                  <ProgressBar value={skill.level} delay={groupIdx * 0.08 + skillIdx * 0.06} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
