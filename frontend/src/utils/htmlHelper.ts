import parse from 'html-react-parser';

export const convertTextToHtml = (text: string) => {
  const htmlText = convertTextToLineBreaks(convertTextToLinks(text));
  const html = parse(htmlText);
  return html;
};

export const convertTextToLinks = (text: string, target = '_blank') => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="${target}" rel="noopener noreferrer" class="text-blue-700">${url}</a>`
  );
};

export const convertTextToLineBreaks = (text: string) => {
  return text.replace(/\n/g, '<br />');
};
