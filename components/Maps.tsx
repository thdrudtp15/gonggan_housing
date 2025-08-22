'use client';

import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';

const Maps = () => {
    useKakaoLoader();

    return (
        <Map // 지도를 표시할 Container
            id="map"
            center={{
                // 지도의 중심좌표https://apis.map.kakao.com/web/wizard
                lat: 36.209002905591674,
                lng: 127.22366076877016,
            }}
            style={{
                // 지도의 크기
                width: '100%',
                height: '350px',
            }}
            level={2} // 지도의 확대 레벨
        />
    );
};

export default Maps;
