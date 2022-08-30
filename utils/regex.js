/* eslint-disable no-useless-escape */
/* 정규식 모음 */

//한글
export const korRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;

//영어
export const engRegex = /[a-zA-Z]/g;

//숫자
export const numRegex = /[0-9]/g;

//d
//특수문자
export const specRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

//이모지
export const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

//공백
export const spaceRegex = /\s/;

//이메일
export const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

//핸드폰번호
export const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

//주민등록번호
export const idenRegex = /\d{6} \- [1-4]\d{6}/;
