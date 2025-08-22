'use client';
import { useActionState } from 'react';
import Link from 'next/link';

import { sendMail } from '@/action/inquiry';
import { sendMailTypes } from '@/action/inquiry';

import styles from './Inquiry.module.scss';

const stateObj: sendMailTypes = {
    customer_name: '',
    phone: '',
    email: '',
    service_date: '',
    address: '',
    notes: '',
    server: '',
};

const Inquiry = () => {
    const [state, action] = useActionState(sendMail, stateObj);

    return (
        <div>
            <form className={styles.mailer} action={action}>
                <input name="customer_name" placeholder="이름을 입력해주세요(필수)" />
                {state.customer_name && <p>이름은 필수입니다.</p>}
                <input name="phone" placeholder="-없이 숫자만 입력해주세요(필수)" />
                {state.phone && <p>전화번호는 필수입니다.</p>}
                <input name="email" placeholder="이메일을 입력해주세요(필수)" />
                {state.email && <p>이메일은 필수입니다다</p>}
                <input name="service_date" type="date" placeholder="시공희망일을 입력해주세요(필수)" />
                {state.service_date && <p>주소는 필수입니다.</p>}
                <input name="address" placeholder="시공주소를 입력해주세요" />
                {state.address && <p></p>}
                <input name="notes" placeholder="요청사항을 입력해주세요" />
                {state.notes && <p></p>}
                {state.server && <p>서버에러가 발생하였습니다.</p>}
                <div>
                    <button>문의하기</button>
                    <Link href="https://open.kakao.com/o/szYEZzNh" target="_blank" rel="noopener noreferrer">
                        카카오톡 문의하기
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Inquiry;
