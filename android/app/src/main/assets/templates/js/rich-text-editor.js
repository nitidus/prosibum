var editorElement = document.querySelector('#editor'),
    quill = new Quill(editorElement, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'align': [] }]
        ]
      },
      theme: 'snow'
    }),
    doTheAppropriateFunctionBasedOnRequestType = (request) => {
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

              case 'value':
                editorElement.querySelector('.ql-editor').innerHTML = request.content[attrRow];
                break;
            }
          }
          break;
      }
    };

quill.on('text-change', function(delta, oldDelta, source) {
  let response = {
        type: 'event',
        content: {
          eventType: 'changeText',
          context: quill.root.innerHTML
        }
      },
      serializedResponse = JSON.stringify(response);

  window.postMessage(serializedResponse, "*");
});

editorElement.addEventListener('keyup', (e) => {
  let code = e.keyCode || e.which;

  if (code == '9') {
    quill.blur();
  }
});

document.addEventListener("message", (event) => {
  let targetRequest = JSON.parse(event.data);

  if (Array.isArray(targetRequest)){
    targetRequest.forEach((singleRequest, i) => {
      doTheAppropriateFunctionBasedOnRequestType(singleRequest);
    });
  }else{
    doTheAppropriateFunctionBasedOnRequestType(targetRequest);
  }

}, false);
