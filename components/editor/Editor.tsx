'use client';

import { useActionState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { Placeholder } from '@tiptap/extensions';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import ImageNode from './custom/Image';

import Tools from './Tools';

import { createPortfolio } from '@/action/portfolio';

import './tiptap.scss';
import styles from './Editor.module.scss';

const Tiptap = () => {
    const [state, action] = useActionState(createPortfolio, { content: '', title: '', server: '' });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Underline,
            Strike,
            ImageNode,
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
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
                <input className={styles.title} name="title" placeholder="제목" />
                <Tools editor={editor} />
                <EditorContent editor={editor} />
                <button>전송</button>
            </div>
            <input type="hidden" name="content" value={editor?.getHTML() || ''} />
        </form>
    );
};

export default Tiptap;
