"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

const FormPage = () => {

  const {user} = useUser();

  const create = useMutation(api.forms.create);

  const onCreate =() => {
    const promise = create({title: "Untitled"});

    toast.promise(promise, {
      loading: "Creating...",
      success: "Note created!",
      error: "Error creating note."
    });
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
      src="/empty.png"
      height="300"
      width="300"
      alt="Empty State"
      className='dark:hidden'
      />
       <Image
      src="/empty-dark.png"
      height="300"
      width="300"
      alt="Empty State"
      className='dark:block hidden'
      />
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Note</h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-1'/>
        Create New Note
      </Button>
    </div>
  )
}

export default FormPage;