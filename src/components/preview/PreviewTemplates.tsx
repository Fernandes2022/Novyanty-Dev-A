'use client';

import { motion } from 'framer-motion';
import { Coffee, Zap, Dumbbell, Utensils, Sparkles } from 'lucide-react';

interface PreviewTemplateProps {
  type: string;
}

export default function PreviewTemplate({ type }: PreviewTemplateProps) {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('coffee')) return <CoffeeShopPreview />;
  if (lowerType.includes('tech') || lowerType.includes('startup')) return <TechStartupPreview />;
  if (lowerType.includes('fitness') || lowerType.includes('gym')) return <FitnessAppPreview />;
  if (lowerType.includes('restaurant') || lowerType.includes('food')) return <RestaurantPreview />;
  
  return <DefaultPreview />;
}

function CoffeeShopPreview() {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Coffee style={{ width: 80, height: 80, margin: '0 auto', filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
        
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          style={{ 
            fontSize: '3rem', 
            fontWeight: 900, 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
          }}
        >
          Brew Haven
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          Artisan Coffee & Pastries
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'white',
            color: '#78350f',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          Order Now
        </motion.button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
          {['Espresso', 'Latte', 'Cappuccino'].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                padding: '1rem',
                borderRadius: '1rem',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechStartupPreview() {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '5rem',
          right: '5rem',
          width: '16rem',
          height: '16rem',
          background: '#22d3ee',
          borderRadius: '50%',
          opacity: 0.2,
          filter: 'blur(60px)',
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white' }}>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Zap style={{ width: 80, height: 80, margin: '0 auto', color: '#67e8f9', filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
        
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
          }}
        >
          InnovateAI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#a5f3fc' }}
        >
          Building the Future with Adaptive
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          style={{
            background: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)',
            color: 'white',
            padding: '1.25rem 2.5rem',
            borderRadius: '1rem',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          Get Started Free
        </motion.button>
      </div>
    </div>
  );
}

function FitnessAppPreview() {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0d9488 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Dumbbell style={{ width: 80, height: 80, margin: '0 auto', filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
        
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
          }}
        >
          FitPro
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          Your Personal Trainer
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)',
            padding: '2rem',
            borderRadius: '1.5rem',
            marginBottom: '2rem',
            display: 'inline-block',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem' }}
          >
            1,234
          </motion.div>
          <div style={{ fontSize: '1.25rem' }}>Workouts Completed</div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'white',
            color: '#047857',
            padding: '1.25rem 2.5rem',
            borderRadius: '1rem',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          Start Training
        </motion.button>
      </div>
    </div>
  );
}

function RestaurantPreview() {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #eab308 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Utensils style={{ width: 80, height: 80, margin: '0 auto', filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
        
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
          }}
        >
          Bella Italia
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: '1.5rem', marginBottom: '2rem' }}
        >
          Authentic Italian Cuisine
        </motion.p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {['Pizza', 'Pasta', 'Wine', 'Dessert'].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem',
                borderRadius: '1rem',
              }}
            >
              <p style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'white',
            color: '#dc2626',
            padding: '1.25rem 2.5rem',
            borderRadius: '1rem',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          View Menu
        </motion.button>
      </div>
    </div>
  );
}

function DefaultPreview() {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{ textAlign: 'center', color: 'white' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Sparkles style={{ width: 80, height: 80, margin: '0 auto', filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
        <h2 style={{ fontSize: '3rem', fontWeight: 900, filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
          Generating...
        </h2>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Creating your design</p>
      </motion.div>
    </div>
  );
}