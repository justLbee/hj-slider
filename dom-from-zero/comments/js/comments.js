'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  // const comments = list.map(createComment).join('');
  // commentsContainer.innerHTML += comments;
  list.forEach(el => {
    const blockObj = commentTemplate(el);
    commentsContainer.appendChild(engine(blockObj))
  })
}

function commentTemplate(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attrs: {title: comment.author.name},
        content: {
          tag: 'div',
          cls: 'avatar',
          attrs: {style: `background-image: url('${comment.author.pic}')`}
        }
			},
      {
        tag: 'div',
        cls: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
						content : comment.text.split('\n').map(function (item) {
							if (!item) {
								return {tag: 'br'}
							}
							return {content: item, tag: 'p'}
						})
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: `${new Date(comment.date).toLocaleString('ru-Ru')}`
              },
              {
                tag: 'ul',
                cls: 'actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function engine(block) {
  if(!block) {
    return document.createTextNode('');
  }

  if((typeof block === 'string') || (typeof block === 'number') || (typeof block === true)) {
    return document.createTextNode(block);
  }

  if(Array.isArray(block)) {
    return block.reduce((f, item) => {
      f.appendChild(engine(item));
      return f;
    }, document.createDocumentFragment(block.tag))
  }

  const element = document.createElement(block.tag || 'div');
  element.classList.add(...[].concat(block.cls || []));

  if(block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key])
    })
  }

  if(block.content) {
    element.appendChild(engine(block.content))
  }

  return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
