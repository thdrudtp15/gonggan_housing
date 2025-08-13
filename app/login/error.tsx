'use client';

const LoginError = ({ error, reset }: { error: Error; reset: () => void }) => {
    return <p>Sorry, something went wrong</p>;
};

export default LoginError;
