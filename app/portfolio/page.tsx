import Pagination from '@/components/ui/Pagination';
import { createClient } from '@/utils/supabase/server';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';

type Props = {
    searchParams: Promise<{ page: string; search: string }>;
};

const pageSize = 2;

const HomePage = async ({ searchParams }: Props) => {
    const supabase = await createClient();
    const { page, search } = await searchParams;

    const getPortfolio = unstable_cache(
        async (page: number) => {
            const from = ((+page || 1) - 1) * pageSize;
            const to = from + pageSize - 1;
            const { data, count } = await supabase
                .from('portfolio')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to);

            return { data, count };
        },
        [`portfolio-page:${page}`]
    );

    const { data, count } = await getPortfolio(+page || 1);
    const totalPages = (count && Math.ceil(count / pageSize)) || 1;

    return (
        <div>
            <ul>
                {data?.map((portfolio) => (
                    <li key={portfolio.id}>
                        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.title}</Link>
                    </li>
                ))}
            </ul>
            <Pagination totalPages={totalPages} nowPage={page} />
        </div>
    );
};

export default HomePage;
