import React from "react";
import { ListProvider } from "context/ListContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "common/ErrorFallback";
import ListLayout from "./ListLayout";

function MainListPage({ width, slug, listHash }) {
  return (
    <ListProvider width={width} slug={slug} listHash={listHash}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ListLayout />
      </ErrorBoundary>
    </ListProvider>
  );
}

export default MainListPage;
