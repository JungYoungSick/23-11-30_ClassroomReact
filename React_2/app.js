function component(elementNode, attributes, children) {
  let elementStr = `<${elementNode}`;
  for (let key in attributes) {
    elementStr += `${key}="${attributes[key]}"`;
  }
  elementStr += '>';
  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        elementStr += child;
      } else {
        elementStr += component(child.elementNode, child.attributes, child.children);
      }
    });
  }
  elementStr += `</${elementNode}`;
  return elementStr;
}

window.addEventListener('hashchange', () => {
  const contentDiv = document.getElementById('root');
  const hash = window.location.hash.substr(1);

  switch (hash) {
    case 'page1':
      contentDiv.innerHTML = component('h1', { style: 'color:blue;' }, ["This is Page 1"]);
      break;
    case 'page2':
      contentDiv.innerHTML = component('div', { style: 'background-color:cadetblue;' }, [component('h1', {}, ["This is Page 2"])]);
      break;
    case 'page3':
      contentDiv.innerHTML = component('div', { style: 'display:flex; justifly-content:center; color:#ff2222;' }, [component('h1', {}, ["This is Page 3"])]);
      break;
    case 'page4':
      contentDiv.innerHTML = component('div', { style: 'display:flex; justifly-content:center; color: #333;' }, [component('h1', {}, ["This is Page 4"])]);
      break;
    default:
      contentDiv.innerHTML = component('h1', {}, ['반갑습니다. 접속할 때 보이는 페이지(처럼보이는) element입니다.']);
  }
});

window.dispatchEvent(new Event('hashchange'));