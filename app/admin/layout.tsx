import { ReactNode } from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

const Layout = async ({ children }: { children: ReactNode }) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (!data.user || error) {
        notFound();
    }

    return <div>{children}</div>;
};

export default Layout;
