import React from 'react';
import { ListProvider } from 'context/ListContext';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'common/ErrorFallback';
import ListLayout from './ListLayout';
import {useParams} from "react-router"

function MainListPage({width, storedLists, updateStoredList}) {


  let params = useParams();

  return (
    <ListProvider
      width={width}
      slug={params.slug} 
      listHash={params.listHash}
      storedLists={storedLists}
      updateStoredList={updateStoredList}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ListLayout />
      </ErrorBoundary>
    </ListProvider>
  );
}

export default (MainListPage);
