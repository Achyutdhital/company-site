export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
}
