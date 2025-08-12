import styled from 'styled-components'

export const Rating = styled.div<{ $score: number }>`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${({ $score }) => {
        if ($score >= 4.0) {
            return 'red' // 4.0 이상이면 빨간색
        } else if ($score >= 2.0) {
            return 'black' // 2.0 이상이면 검은색
        } else {
            return 'gray' // 그 외 (2.0 미만)는 회색
        }
    }};
`
