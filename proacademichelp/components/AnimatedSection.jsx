'use client';
import { motion } from 'framer-motion';


export default function AnimatedSection({ children, delay = 0 }){
return (
<motion.section
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.6, delay }}
className="my-10"
>
{children}
</motion.section>
);
}