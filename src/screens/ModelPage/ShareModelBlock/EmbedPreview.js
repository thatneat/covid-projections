import React, { useState, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  EmbedPreviewScrollContainer,
  CenteredModal,
  CodeSnippetPreview,
  EmbedPreviewStyled,
  EmbedDetailsStyled,
  EmbedPreviewExitButton,
} from './EmbedPreview.style';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { EmbedButton } from './../ModelPage.style';

import { useEmbed } from 'utils/hooks';

export default function EmbedPreview({ open, onClose }) {
  const {
    EMBED_HEIGHT,
    EMBED_WIDTH,
    iFramePath,
    jsCodeSnippet,
    iFrameCodeSnippet,
  } = useEmbed();

  // https://material-ui.com/components/snackbars/#consecutive-snackbars
  const queueRef = useRef([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setSnackbarOpen(true);
    }
  };

  const handleCopySuccessMessage = message => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
    });

    if (snackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      setSnackbarOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  return (
    <>
      <CenteredModal open={open} onClose={onClose}>
        <EmbedPreviewStyled elevation="2">
          <EmbedPreviewExitButton onClick={onClose}>
            <CloseIcon />
          </EmbedPreviewExitButton>
          <EmbedPreviewScrollContainer>
            <Grid container align="center" justify="center">
              <Grid md="12" lg="6">
                <iframe
                  src={iFramePath}
                  title="Embed Preview"
                  width={EMBED_WIDTH}
                  height={EMBED_HEIGHT - 80} // Extra padding we don't need here
                  frameBorder="0"
                ></iframe>
              </Grid>
              <Grid md="12" lg="6">
                <EmbedDetailsStyled condensed={isMobile}>
                  <Typography variant="h4" style={{ margin: '0.5rem 0 1rem' }}>
                    Embed Preview
                  </Typography>
                  {!isMobile && (
                    <CodeSnippetPreview>{iFrameCodeSnippet}</CodeSnippetPreview>
                  )}
                  <CopyToClipboard
                    text={iFrameCodeSnippet}
                    onCopy={handleCopySuccessMessage(
                      'Embed iFrame snippet copied to clipboard!',
                    )}
                  >
                    <EmbedButton
                      bolder
                      color="secondary"
                      variant="contained"
                      style={{ marginBottom: '0.8rem' }}
                    >
                      Copy IFrame Snippet
                    </EmbedButton>
                  </CopyToClipboard>
                  {!isMobile && (
                    <CodeSnippetPreview>{jsCodeSnippet}</CodeSnippetPreview>
                  )}
                  <CopyToClipboard
                    text={jsCodeSnippet}
                    onCopy={handleCopySuccessMessage(
                      'Embed JS snippet copied to clipboard!',
                    )}
                  >
                    <EmbedButton
                      bolder
                      color="secondary"
                      variant="contained"
                      style={{ marginBottom: '0.8rem' }}
                    >
                      Copy JS Snippet
                    </EmbedButton>
                  </CopyToClipboard>
                  <Typography variant="caption" align="center">
                    Not sure? Use the Iframe snippet.
                  </Typography>
                </EmbedDetailsStyled>
              </Grid>
            </Grid>
          </EmbedPreviewScrollContainer>
        </EmbedPreviewStyled>
      </CenteredModal>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
