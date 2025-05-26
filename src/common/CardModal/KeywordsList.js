import React from 'react';
import {
  Divider,
  Typography,
} from '@material-ui/core';
import keywords from 'constants/keywords';

function KeywordsList({ keywords:cardKeywords }) {
  if (!(cardKeywords instanceof Array)) return null;
  else if (cardKeywords.length === 0) return null;
  
  return (
    <React.Fragment>
          {cardKeywords.map(kw => {
            let keyword = kw
            if(typeof keyword === "string"){
              keyword = {name:kw}
            }

            return(
            <div key={keyword.name}>
              <Typography variant="caption" color="textSecondary">
                {keyword.name + (!keyword.value ? "" : (Number.isInteger(keyword.value) ? " " : ": " ) + keyword.value)}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography variant="body2">
                {keyword.name in keywords ? keywords[keyword.name] : 'No definition found.'}
              </Typography>
              <Divider />
            </div>)
          })}
    </React.Fragment>
  );
};

export default KeywordsList;
