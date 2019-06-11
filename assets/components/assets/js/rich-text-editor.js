var editorElement = document.querySelector('#editor'),
    quill = new Quill(editorElement, {
      theme: 'snow'
    });

editorElement.addEventListener('keyup', (e) => {
  let code = e.keyCode || e.which;

  if (code == '9') {
    quill.blur();
  }else{
    let response = {
          type: 'event',
          content: {
            eventType: 'changeText',
            context: quill.root.innerHTML
          }
        },
        serializedResponse = JSON.stringify(response);

    window.postMessage(serializedResponse, "*");
  }
});

document.addEventListener("message", (event) => {
  let request = JSON.parse(event.data);

  switch (request.type.toLowerCase()) {
    case 'stylesheet':
    case 'styles':
    case 'style':
      for (var stylesheetAttr in request.content) {
        switch (stylesheetAttr) {
          case 'color':
          case 'direction':
          case 'textAlign':
            document.querySelector('.ql-editor').style[stylesheetAttr] = request.content[stylesheetAttr];
            break;

          case 'backgroundColor':
            document.querySelector('.ql-toolbar').style[stylesheetAttr] = request.content[stylesheetAttr];
            document.querySelector('.ql-container').style[stylesheetAttr] = request.content[stylesheetAttr];
            break;

          case 'minHeight':
            document.querySelector('.ql-editor').style[stylesheetAttr] = `calc(${request.content[stylesheetAttr]}px - 44px)`;
            break;
        }
      }
      break;

    case 'attributes':
    case 'attribute':
    case 'attrs':
    case 'attr':
      for (var attrRow in request.content) {
        switch (attrRow) {
          case 'placeholder':
            quill.root.dataset.placeholder = request.content[attrRow];
            break;
        }
      }
      break;
  }
}, false);
