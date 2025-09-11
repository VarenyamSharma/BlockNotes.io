'use client'	

import {BlockNoteEditor,PartialBlock} from '@blocknote/core'
import {BlockNoteViewRaw as BlockNoteView,useBlockNote} from '@blocknote/react'
import '@blocknote/core/style.css'
import { useTheme } from "next-themes"

import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps{
  onChange:(value:string) => void
  initialContent?:string
  editable?:boolean
}

function Editor ({onChange,initialContent,editable}:EditorProps) {

  const {resolvedTheme} = useTheme()
  const {edgestore} = useEdgeStore()

  const handleUpload = async (file:File) => {
    const response = await edgestore.publicFiles.upload({file})

    return response.url
  }

  const editor:BlockNoteEditor = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload,
  })

return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        editable={editable}
        onChange={(editor: BlockNoteEditor) => {
          onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        }}
      />
    </div>
  )
}

export default Editor