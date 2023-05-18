export default function renderPageList(pages, title) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body class="ons-u-p-m">
    <h1>${title}</h1>
    <ul class="ons-list ons-list--dashed ons-u-pb-l">
      ${pages
        .map(
          ({ uri, title }) => `
            <li class="ons-list__item">
              <a class="ons-list__link" href="${uri}">${title}</a>
            </li>
          `,
        )
        .join('\n')}
    </ul>
  </body>
</html>
`;
}
