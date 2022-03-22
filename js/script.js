/* document.getElementById("test-button").addEventListener("click", function () {
  const links = document.querySelectorAll(".titles a");
  console.log("links:", links);
}); */

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]  add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const hrefAttribute = clickedElement.getAttribute('href');
  console.log(hrefAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(hrefAttribute);
  console.log('Correct Article: ', correctArticle);

  /* [DONE] add class 'active' to the correct article */

  correctArticle.classList.add('active');
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  console.log('List is generated!');
  console.log(customSelector);

  /* remove contents of titleLinks */

  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = '';
    console.log('List is clear!');
  }

  clearMessages();

  /* get 'id' attribute for every article and save to variable */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log('articles:' + articles);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find title element and save to variable */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create link html code and save to variable */

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    console.log(linkHTML);

    /* insert link html code to link list */

    html += linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles' + articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:' + articleTags);

    /* split tags into array */

    const finalTags = articleTags.split(' ');
    console.log('final tags:' + finalTags);

    /* START LOOP: for each tag */

    for (let finalTag of finalTags) {
      console.log(finalTag);

      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${finalTag}">${finalTag}</a></li>`;
      console.log('linkHtml:' + linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (allTags.indexOf(linkHTML) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('html:' + html);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList:' + tagList);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
generateTags();

/* Tag Click Handler */

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href:' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('tag:' + tag);

  /* find all tag links with class active */

  const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('tagLinksActive:' + tagLinksActive);

  /* START LOOP: for each active tag link */
  for (let tagLinkActive of tagLinksActive) {
    console.log('tagLinkActive:' + tagLinkActive);

    /* remove class active */

    tagLinkActive.classList.remove('active');
    console.log('class active removed');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:' + tagLinks);
  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* Click listener to tag */

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags a');
  console.log('tagLinks' + tagLinks);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    console.log('tagLink' + tagLink);
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles' + articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    console.log('article:' + article);
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('authorWrapper:' + authorWrapper);

    /* make html variable with empty string */

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor:' + articleAuthor);

    /* generate HTML of the link */
    const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    console.log('linkHtml:' + linkHTML);

    /* insert HTML links into the author wrapper */
    authorWrapper.innerHTML = linkHTML;
    console.log('autor dodany!');
  }
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href:' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');
  console.log('author:' + author);

  /*const tag = href.replace("#tag-", "");
    console.log("tag:" + tag);*/

  /* find all author links with class active */

  const authorLinksActive = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  console.log('authorLinksActive:' + authorLinksActive);
  /*document.querySelectorAll('a.active[href^="#tag-"]');*/

  /* START LOOP: for each active tag link */
  for (let authorLinkActive of authorLinksActive) {
    console.log('authorLinkActive:' + authorLinkActive);

    /* remove class active */

    authorLinkActive.classList.remove('active');
    console.log('class active removed');

    /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks:' + authorLinks);
  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

/* Click listener to tag */

function addClickListenersToAuthor() {
  /* find all links to tags */

  let html = '';

  const authorLinks = document.querySelectorAll('.post-author a');
  console.log('authorLinks:' + authorLinks);
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    console.log('authorLink:' + authorLink);
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();
