'use client';
import { motion } from 'framer-motion';


export default function FancyCard({ title, desc, cta }){
return (
<motion.div whileHover={{ y: -6 }} className="card">
<h3 className="text-xl font-bold mb-2">{title}</h3>
<p className="text-gray-600 dark:text-gray-300 mb-4">{desc}</p>
{cta}
</motion.div>
);
}