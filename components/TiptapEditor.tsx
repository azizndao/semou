"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "## Hello World!",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor, transaction }) => {
      console.log(editor.getHTML())
    },
  })

  return <EditorContent editor={editor} />
}
