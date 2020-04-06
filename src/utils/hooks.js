import { useLocation, useParams } from 'react-router-dom';

// TODO: Mv to enums?
const EMBED_WIDTH = 350;
const EMBED_HEIGHT = 700;
export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const { id, countyId } = useParams();
  const isEmbed = pathname.includes('/embed');
  const protocol = window.location.protocol;
  let hostname = window.location.hostname;

  if (hostname === 'localhost') {
    hostname = 'localhost:3000';
  }

  let path = `us/`;
  if (id) {
    path += id;
    if (countyId) {
      path += `/county/${countyId}`;
    }
  }

  const iFramePath = `${protocol}//${hostname}/embed/${path}`;

  const iFrameCodeSnippet =
    '<iframe ' +
    `src="${iFramePath}" ` +
    'title="CoVid Act Now" ' +
    'width="350" ' +
    'height="700" ' +
    'frameBorder="0" ' +
    'scrolling="no"' +
    '></iframe>';

  const jsCodeSnippet =
    '<div ' +
    'class="covid-act-now-embed" ' +
    (id ? `data-state-id="${id}" ` : '') +
    (countyId ? `data-fips-id="${countyId}" ` : '') +
    '/>' +
    `<script src="${protocol}//${hostname}/scripts/embed.js"></script>`;

  return {
    isEmbed,
    EMBED_WIDTH,
    EMBED_HEIGHT,
    iFrameCodeSnippet,
    iFramePath,
    jsCodeSnippet,
  };
}
