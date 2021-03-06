const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  postTags: Handlebars.compile(
    document.querySelector('#template-post-tags').innerHTML
  ),
  postAuthor: Handlebars.compile(
    document.querySelector('#template-post-author').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorList: Handlebars.compile(
    document.querySelector('#template-authors-list').innerHTML
  ),
};

const opts = {
  tagSizes: {
    count: 4,
    classPrefix: 'tag-size-',
  },
};
const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    title: '.post-title',
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};
const active = {
  articles: '.posts article.active',
  links: {
    tags: 'a.active[href^="#tag-"]',
    authors: 'a.active[href^="#author-"]',
  },
};

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

  const activeArticles = document.querySelectorAll(active.articles);

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

function generateTitleLinks(customSelector = '') {
  console.log('List is generated!');
  console.log(customSelector);

  /* remove contents of titleLinks */

  const titleList = document.querySelector(select.listOf.titles);

  function clearMessages() {
    titleList.innerHTML = '';
    console.log('List is clear!');
  }

  clearMessages();

  /* get 'id' attribute for every article and save to variable */

  const articles = document.querySelectorAll(
    select.all.articles + customSelector
  );
  console.log('articles:' + articles);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find title element and save to variable */

    const articleTitle = article.querySelector(select.article.title).innerHTML;

    /* create link html code and save to variable */

    //const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
      console.log('params.max:' + params.max);
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
      console.log('params.min:' + params.min);
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  console.log('normalizedCount:' + normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log('normalizedMax:' + normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log('percentage' + percentage);
  const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
  console.log('classNumber' + classNumber);
  const tagClass = opts.tagSizes.classPrefix + classNumber;
  console.log('tagClass:' + tagClass);
  return tagClass;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags:', allTags);
  /* find all articles */

  const articles = document.querySelectorAll(select.all.articles);
  console.log('articles' + articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */

    const tagsWrapper = article.querySelector(select.article.tags);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:' + articleTags);

    /* split tags into array */

    const tags = articleTags.split(' ');
    console.log('final tags:' + tags);

    /* START LOOP: for each tag */

    for (let tag of tags) {
      console.log(tag);

      /* generate HTML of the link */
      // const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      const postTagsData = { id: tag, title: tag };
      const linkHTML = templates.postTags(postTagsData);
      console.log('linkHtml:' + linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('html:' + html);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);
  console.log('tagList:' + tagList);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  console.log('allTags:', allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */

    const linkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(
      allTags[tag],
      tagsParams
    )}">${tag}</a></li>`;
    console.log('linkHtml:' + linkHTML);

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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

  const tagLinksActive = document.querySelectorAll(active.links.tags);
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
  const tagLinksList = document.querySelectorAll('.list.tags a');
  /* START LOOP: for each link */
  for (let tagLinkList of tagLinksList) {
    /* add tagClickhandler as event listener for that link */
    tagLinkList.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(select.all.articles);
  console.log('articles' + articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    console.log('article:' + article);
    /* find author wrapper */
    const authorWrapper = article.querySelector(select.article.author);
    console.log('authorWrapper:' + authorWrapper);

    /* make html variable with empty string */

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log('articleAuthor:' + author);

    /* generate HTML of the link */
    //const linkHTML = `<a href="#author-${author}">${author}</a>`;
    const postAuthorData = { id: author, title: author };
    const linkHTML = templates.postAuthor(postAuthorData);
    console.log('linkHtml:' + linkHTML);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[author]) {
      /* [NEW] add tag to allTags object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    /* insert HTML links into the author wrapper */
    authorWrapper.innerHTML = linkHTML;
    console.log('autor dodany!');
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(select.listOf.authors);
  console.log('authorList:' + authorsList);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  console.log('allAuthors:', allAuthors);

  /*const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams); */

  /* [NEW] create variable for all links HTML code */

  const allAuthorsData = { author: [] };

  /* [NEW] START LOOP: for each tag in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */

    const linkHTML = `<li><a href="#author-${author}">${author}</a></li>`;
    console.log('linkHtml:' + linkHTML);

    // allAuthorsHTML += linkHTML + ' (' + allAuthors[author] + ') ';
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author],
    });
  }
  /* [NEW] END LOOP: for each tag in allAuthors: */

  /*[NEW] add HTML from allAuthorsHTML to authorsList */
  authorsList.innerHTML = templates.authorList(allAuthorsData);
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

  const authorLinksActive = document.querySelectorAll(active.links.authors);
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

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

/* Click listener to tag */

function addClickListenersToAuthor() {
  /* find all links to author */

  const authorLinks = document.querySelectorAll('.post-author a');
  console.log('authorLinks:' + authorLinks);
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    console.log('authorLink:' + authorLink);
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }

  /* find all links to author */

  const authorListLinks = document.querySelectorAll('.authors.list a');
  console.log('authorListLinks:' + authorListLinks);
  /* START LOOP: for each link */
  for (let authorListLink of authorListLinks) {
    console.log('authorListLink:' + authorListLink);
    /* add authorClickHandler as event listener for that link */
    authorListLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();
