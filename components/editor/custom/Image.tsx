'use client';
import { uploadImage } from '@/utils/cloudinary/uploadImage';
import { Node } from '@tiptap/core';
import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React, { useEffect, useState } from 'react';

function MyCustomComponent({ editor }: NodeViewProps) {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!image) return;
        editor.commands.insertContent({
            type: 'image',
            attrs: { src: image, alt: 'image', width: 300 },
        });
    }, [image]);

    if (image) return null;

    return (
        <NodeViewWrapper>
            {!image && !loading && (
                <div style={{ border: '1px solid red', padding: '8px' }}>
                    <label>
                        업로드
                        <input
                            type="file"
                            accept="*/image"
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                const { files } = e.target;
                                if (!files && !files?.[0]) return;
                                else {
                                    setLoading(true);
                                    const url = await uploadImage(files[0]);
                                    setImage(url);
                                }
                            }}
                        />
                    </label>
                </div>
            )}
            {loading && <div>Loading...</div>}
        </NodeViewWrapper>
    );
}

const ImageNode = Node.create({
    name: 'customImageNode',
    group: 'block',
    atom: false,

    parseHTML() {
        return [{ tag: 'div[data-type="customImageNode"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { ...HTMLAttributes, 'data-type': 'customImageNode' }];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MyCustomComponent);
    },
});

export default ImageNode;
