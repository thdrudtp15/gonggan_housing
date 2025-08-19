import { notFound } from 'next/navigation';

import Link from 'next/link';
import styles from './Pagination.module.scss';

type Props = {
    totalPages: number;
    nowPage: string | number;
};

const Pagination = ({ totalPages, nowPage = 1 }: Props) => {
    nowPage = +nowPage;

    if (nowPage > totalPages) {
        notFound();
    }

    const sequentialPagination = (type: 'prev' | 'next') => {
        if (type === 'next' && nowPage < totalPages) {
            return `?page=${nowPage + 1}`;
        } else if (type === 'prev' && nowPage !== 1) {
            return `?page=${nowPage - 1}`;
        }
        return '';
    };

    const pageLimit = 5; // 페이지 네이션 표시 개수
    const pageArray: number[] = [];

    const index = Math.floor((nowPage - 1) / pageLimit);

    for (let i = index * pageLimit; i < (index + 1) * pageLimit; i++) {
        if (i < totalPages) pageArray.push(i + 1);
    }

    return (
        <div className={styles.pagination}>
            {nowPage !== 1 && (
                <Link href={sequentialPagination('prev')} className={styles.sequential}>
                    Previous
                </Link>
            )}
            <ul className={styles.pageList}>
                {pageArray.map((page) => (
                    <li key={page}>
                        <Link
                            className={`${styles.pageItem} ${nowPage === page ? styles.select : ''}`}
                            href={`?page=${page}`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
            {nowPage < totalPages && (
                <Link href={sequentialPagination('next')} className={styles.sequential}>
                    Next
                </Link>
            )}
        </div>
    );
};

export default Pagination;
