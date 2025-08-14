'use client';
import { ChangeEvent } from 'react';
import { uploadImage } from '@/utils/cloudinary/uploadImage';

const HomePage = () => {
    return (
        <div>
            <form>
                <input
                    type="file"
                    accept="*/image"
                    onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        const { files } = e.target;
                        if (!files || !files[0]) return;
                        await uploadImage(files[0]);
                    }}
                />
            </form>
        </div>
    );
};

export default HomePage;
