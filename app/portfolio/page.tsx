import Pagination from '@/components/ui/Pagination';
import { createClient } from '@/utils/supabase/server';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';

type Props = {
    searchParams: Promise<{ page: string; search: string }>;
};

const HomePage = async ({ searchParams }: Props) => {
    const { page, search } = await searchParams;

    const pageSize = 2;
    const from = ((+page || 1) - 1) * pageSize;
    const to = from + pageSize - 1;

    console.log(from, to);

    const supabase = await createClient();
    const { data, count } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

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
