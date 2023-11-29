/**
 * 에디터에 드디어 내장된 JSDoc 주석 작성 방식으로 아래의 함수를 설명한다.
 * 
 * @param {string} elementNode
 * @param {object} attributes
 * @param {array} children
 * @returns string
 * 
 * @example
 * component(
 * 'div',
 * {style: 'color:blue;'},
 * [component('h1', {}, ['This is page 1']
 * )
 * ])
 */
function component(elementNode, attributes, children) {
  //HTML Element 문자열로 '조립(assemble)' 하는 패턴.
  let elementStr = `<${elementNode}`;
  for (let key in attributes) {
    //? for... in문은 for...in 구문으로 불리며, 객체의 열거 가능한 속성들에 대해 반복하는데 사용된다.

    // 객체의 키(key)를 배열처럼 순회한다.
    // 매개변수 attributes 는 객체여야 for in문을 사용 할 수 있다.
    // 대표적으로 python 에서는 해당 문법 접근이 기본 반복문이다.
    elementStr += `${key}="${attributes[key]}"`
    //? 키-값 쌍으로 이루어진 컬렉션이다.
  }
  elementStr += '>';
  // 만약 children 이라는 값이 '있다면', true 판정이 이루어진다.
  // 조건식에서 "존재유무"로도 사용하기도 한다.
  if (children) {
    children.forEach((child) => {
      //! children 매개변수에 forEach배열 매서드를 사용하여 child의 요소를 출력한다.
      // children 매개변수는 배열이어야 한다.
      // 배열의 각 요소를 순회하는 forEach()를 사용하였다.
      // 절차형으로 for 문을 사용해도 되지만, 자바스크립트 다운 방식으로 작성했다.
      //? 자바스크립트 다운 방식이란?
      //? 자바스크립트 언어의 고유한 특징이나 스타일을 나타내기 위해 사용된다.
      //? 자바스크립트의 독특한 문법, 기능, 패턴 및 프로그래밍 스타일을 지칭하는데 사용된다.
      /**
       * 콜백 함수와 이벤트 기반 비동기 프로그래밍
       * 프로토타입 기반 상속
       * 동적 타입 언어
       * 클로저 및 익명 함수
       * 독적 객체 모델
       */
      if (typeof child === 'string') {
        elementStr += child;
      } else {
        elementStr += component(child.elementNode, child.attributes, child.children);
      }
    });
  }

  elementStr += `</${elementNode}>`// 맨 위 변수에 덧붙여서 반환한다.
  //! 우리가 html에서 사용되고 있는 태그 담는 것처럼 지금 내용들을 담고 템플릿 리터럴로 값을 닫았다.
  return elementStr; // 함수가 호출되는 순간 문자열이 반환된다.
}
// 문자열로 잘 작동하는지 테스트 한 아래 코드
let test = component('div', { style: 'color:blue;' }, [
  component('h1', {}, ['This is Page 1'])
]);
console.log(test)


