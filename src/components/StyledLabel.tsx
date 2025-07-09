import styled from 'styled-components'

export const StyledLabel = styled.label`
    display: block;
    color: #333; /* 라벨 텍스트 색상 */
    font-size: 14px;
    font-weight: 600; /* 글자 두께 */
    margin-bottom: 8px; /* 라벨과 입력창 사이의 간격 */

    /* 첫 번째 라벨을 제외한 나머지 라벨에 위쪽 여백 추가 */
    &:not(:first-child) {
        margin-top: 8px;
    }
`
