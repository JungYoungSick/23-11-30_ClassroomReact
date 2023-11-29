function component(elementNode, attributes, children) {
  let elementStr = `<${elementNode}`;
  for (let key in attributes) {
    elementStr += `${key} = "${attributes[key]}"`;
  }
  elementStr += '>';
  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        elementStr += child;
      } else {
        elementStr += component(child.elementNode, child.attributes, child.children);
      }
    })
  }
  elementStr += `</${elementNode}>`
  return elementStr
}

window.addEventListener('hashchange', () => {
  const contentDiv = document.getElementById("root");
  /**
   * window,lacation 객체는 현재 URL에 대한 정보를 제공한다.
   * hash 속성은 URL의 해시 부분을 반환한다.
   * 예를 들어, http://example.com#page1이라는 URL이 있다면, hash 속성은 #page1을 반환한다.
   * substr() 매서드는 문자열에서 특정 위치에서 시작하여, 특정 문자 수 만큼의 문자들을 반환한다.
   * #을 제외한 문자열을 반환하기 위해 substr(1)을 사용한다.
   * <a> 태그의 href 속성에는 #page1, #page2, #page3, #page4가 있다.
   */
  const hash = window.location.hash.substr(1); //! hash의 값 중 #을 제외한 문자열 반환.

  /**
   * if(hash === 'page1') {}
   * else if(hash === 'page2') {}
   * if() 조건문의 패턴을 뒤로하고, switch문을 사용했다.
   * switch() 문자체가 '일관된 조건식'을 뉘앙스로 설명하기 때문에
   * '모두 읽지 않아도' 어떤 작용을 해난다는 것을 알게 된다.
   */

  switch (hash) {
    case 'page1':
      contentDiv.innerHTML = component('h1', { style: 'color:blue;' }, ["This is page 1"])
      break;

    case 'page2':
      contentDiv.innerHTML = component('div', { style: 'background-color:cadetblue;' }, [component('h1', {}, ["This is page 2"])])
      break;

    case 'page3':
      contentDiv.innerHTML = component('div', { style: 'displey:flex; justifly-content:center; color: #ff2222;' }, [component('h1', {}, ["This is page 3"])]);
      break;

    case 'page4':
      contentDiv.innerHTML = component('div', { style: 'displey:flex;justifly-content:center; color:#333' }, [component('h1', {}, ["This is page 4"])])
      break;
    default: //조건이 모두 다 부합하지 않을 때, 즉 false 일때 default가 실행된다. 최초 접속에는 hash가 없기 때문에 default가 실행된다.
      contentDiv.innerHTML = component('h1', {}, ['반갑습니다. 접속 할 때 보이는 페이지(처럼보이는) element입니다.'])
    // 아래의 dispatchEvent()를 사용하지 않으면, 해당 코드가 실행되지 않는다.
  }
});

// 초기 로딩을 위한 코드
window.dispatchEvent(new Event('hashchange'));
/** 
 * 위의 addEventListener()는 window 객체에 이벤트 핸들러이고, 변화가 있을 때 마다 이벤트가 발생한다.
 * 그러나, 초기 로딩 시에는 이벤트가 발생하지 않는다.
 * 따라서, 초기 로딩 시에도 이벤트가 발생하도록 하기 위해 dispatchEvent()를 사용한다.
 * dispatchEvent()는 지정된 이벤트를 생성하여, 이벤트를 발생시킨다. 
*/