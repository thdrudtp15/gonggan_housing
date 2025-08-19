'use client';

import { useActionState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';

import Tools from './Tools';

import { createPortfolio } from '@/action/portfolio';

import './tiptap.scss';
import styles from './Editor.module.scss';

const Tiptap = () => {
    const [state, action] = useActionState(createPortfolio, { content: '', title: '', server: '' });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: '내용',
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    });

    if (!editor) return null;

    return (
        <form action={action}>
            <div className={styles.editor}>
                <input name="title" placeholder="제목" />
                <Tools editor={editor} />
                <EditorContent editor={editor} />
                <button>전송</button>
            </div>
            <input type="hidden" name="content" value={editor?.getHTML() || ''} />
        </form>
    );
};

export default Tiptap;
