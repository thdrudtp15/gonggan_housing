'use client';
import { useActionState } from 'react';
import Link from 'next/link';

import { sendMail } from '@/action/mail';
import { sendMailTypes } from '@/action/mail';

import styles from './Inquiry.module.scss';

const stateObj: sendMailTypes = {
    customerName: '',
    phone: '',
    email: '',
    serviceDate: '',
    address: '',
    notes: '',
};

const Inquiry = () => {
    const [state, action] = useActionState(sendMail, stateObj);

    return (
        <div>
            <form className={styles.mailer} action={action}>
                <input name="customerName" placeholder="이름을 입력해주세요(필수)" />
                {state.customerName && <p>이름은 필수입니다.</p>}
                <input name="phone" placeholder="-없이 숫자만 입력해주세요(필수)" />
                {state.phone && <p>전화번호는 필수입니다.</p>}
                <input name="email" placeholder="이메일을 입력해주세요(필수)" />
                {state.email && <p>이메일은 필수입니다다</p>}
                <input name="serviceDate" placeholder="시공희망일을 입력해주세요(필수)" />
                {state.serviceDate && <p>주소는 필수입니다.</p>}
                <input name="address" placeholder="시공주소를 입력해주세요" />
                {state.address && <p></p>}
                <input name="notes" placeholder="요청사항을 입력해주세요" />
                {state.notes && <p></p>}
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
