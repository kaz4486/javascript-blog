{
  /* document.getElementById("test-button").addEventListener("click", function () {
  const links = document.querySelectorAll(".titles a");
  console.log("links:", links);
}); */

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE]  add class 'active' to the clicked link */

    console.log("clickedElement:", clickedElement);
    console.log("clickedElement (with plus): " + clickedElement);
    clickedElement.classList.add("active");

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(".posts article.active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute("href");
    console.log(hrefAttribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(hrefAttribute);
    console.log("Correct Article: ", correctArticle);

    /* [DONE] add class 'active' to the correct article */

    correctArticle.classList.add("active");
  };

  const optArticleSelector = ".post";
  const optTitleSelector = ".post-title";
  const optTitleListSelector = ".titles";

  const generateTitleLinks = function () {
    console.log("List is generated!");

    /* remove contents of titleLinks */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
      titleList.innerHTML = "";
      console.log("List is clear!");
    }

    clearMessages();

    /* get 'id' attribute for every article and save to variable */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = "";

    for (let article of articles) {
      const articleId = article.getAttribute("id");
      console.log(articleId);

      /* find title element and save to variable */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create link html code and save to variable */

      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      console.log(linkHTML);

      /* insert link html code to link list */

      html += linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;
  };

  generateTitleLinks();

  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
