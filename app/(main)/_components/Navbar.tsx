"use client"

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { sanitizeId } from '@/lib/utils';
import React from 'react'
import { Title } from './title';
import { Spinner } from '@/components/spinner';
import { Publish } from './Publish';

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export const Navbar = ({isCollapsed, onResetWidth}: NavbarProps) => {
    const params = useParams();
    const safeId = sanitizeId(params.formId)
    const document = useQuery(api.forms.getById, safeId ? { documentId: safeId as Id<"forms"> } : "skip");

    if (document === undefined){
        return (
            <nav className='bg-background dark:bg-[#0C0C0C] px-3 py-2 w-full flex items-center gap-x-4'>
                <Spinner size="lg"/>
            </nav>
        )
    }

    if(document === null) return null;

  return (
    <>
    <nav className='bg-background dark:bg-[#0C0C0C] px-3 py-2 w-full flex items-center gap-x-4'>
        {isCollapsed && (
            <MenuIcon
                role='button'
                onClick={onResetWidth}
                className='h-6 w-6 text-muted-foreground' />
        )}
        <div className='flex items-center justify-between w-full'>
            <Title  initialData={document}/>
            <div>
                <Publish initialData={document}/>
            </div>
        </div>
    </nav>
    {/* {document.isArchived && (
        <Banner documentId = {document._id}/>
    )} */}
    </>
  )
}

