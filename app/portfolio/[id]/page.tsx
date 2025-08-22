import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { id } = await params;
    const supabase = await createClient();

    const cachePor = unstable_cache(async () => {
        return await supabase.from('portfolio').select('*').eq('id', +id).single();
    }, [`portfolio-detail_id:${id}`]);

    const { data, error } = await cachePor();

    return {
        title: data.title,
        description: '',
    };
};

const HomePage = async ({ params }: Props) => {
    const { id } = await params;
    const supabase = await createClient();

    const cachePor = unstable_cache(async () => {
        return await supabase.from('portfolio').select('*').eq('id', +id).single();
    }, [`portfolio-detail_id:${id}`]);

    const { data, error } = await cachePor();

    if (!data) {
        notFound();
    }

    return <div></div>;
};

export default HomePage;
