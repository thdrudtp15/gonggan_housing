'use client';

import { MouseEventHandler, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
    children: ReactNode;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button = ({ children, handleClick, type = 'button' }: Props) => {
    const { pending } = useFormStatus();

    if (pending) return <p>Loading...</p>;

    return (
        <button type={type} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
