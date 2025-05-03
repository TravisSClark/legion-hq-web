import React from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import { Alert, AlertTitle } from '@mui/lab';

function ErrorFallback({ error, componentStack, message }) {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item>
          <Alert severity="error">
            <AlertTitle>
              Something went wrong
            </AlertTitle>
            {error && (
              <div style={{ display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                  <Typography variant="button">
                    Error
                  </Typography>
                  <Divider style={{ marginLeft: 8, flexGrow: 1 }} />
                </div>
                <Typography variant="caption">
                  {error.toString()}
                </Typography>
              </div>
            )}
            {message && (
              <div style={{ display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                  <Typography variant="button">
                    Message
                  </Typography>
                  <Divider style={{ marginLeft: 8, flexGrow: 1 }} />
                </div>
                <Typography variant="caption">
                  {message}
                </Typography>
              </div>
            )}
            {componentStack && (
              <div style={{ display: 'flex', flexFlow: 'column nowrap', marginTop: 8 }}>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                  <Typography variant="button">
                    Stack Trace
                  </Typography>
                  <Divider style={{ marginLeft: 8, flexGrow: 1 }} />
                </div>
                <Typography variant="caption">
                  {componentStack}
                </Typography>
              </div>
            )}
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorFallback;
