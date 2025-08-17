"use client"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
            Simplify forms. Unify your workflow. Welcome to <span className='underline'>BlockForms.io</span>
        </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
            Streamline your data collection and management with<br /> our powerful form solutions.
        </h3>
        <Button>
            Enter BlockForms.io 
            <ArrowRight className='h-4 w-4 ml-2'/>
        </Button>
    </div>
  )
}

export default Heading  