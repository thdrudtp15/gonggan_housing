import { createClient } from '@/utils/supabase/server';
import { unstable_cache } from 'next/cache';

type Props = {
    params: Promise<{ id: string }>;
};

const HomePage = async ({ params }: Props) => {
    const supabase = await createClient();
    const { id } = await params;

    const getPortfolioDetail = unstable_cache(async () => {
        return await supabase.from('portfolio').select('*').eq('id', +id);
    }, [`portfolio-detail-id:${id}`]);

    const { data, error } = await getPortfolioDetail();

    return <div></div>;
};

export default HomePage;
