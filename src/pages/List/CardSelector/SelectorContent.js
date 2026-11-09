import React from "react";
import { Typography, Divider } from "@mui/material";
import LegionCard from "common/LegionCard";

// function CollapsedContent({ children, isExpanded }) {
//   return (
//     <Collapse unmountOnExit timeout="auto" in={isExpanded}>
//       {children}
//     </Collapse>
//   );
// }

function SelectorContent({
  action,
  validIds = [],
  invalidIds = [],
  handleClick,
  handleCardZoom,
}) {
  // const [isExpanded, setIsExpanded] = React.useState(false);
  // const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography>No eligible cards found</Typography>
      </div>
    );
  } else if (!action.includes("UPGRADE")) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography style={{ marginRight: 8 }}>Equippable upgrades</Typography>
        <Divider style={{ flexGrow: 1 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {/* {invalidIds.length > 0 && (
        <div className={classes.rowContainerNoWrap}>
          <Typography style={{ marginRight: 8 }}>
            Unequippable upgrades
          </Typography>
          <Divider className={classes.divider} />
          <IconButton
            size="small"
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            style={{ marginLeft: 8 }}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div className={classes.rowContainerWrap}>
          {invalidIds.map(id => (
            <ChipCard
              card={cards[id]}
              key={id}
              handleClick={()=>handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent> */}
    </div>
  );
}

export default SelectorContent;

// TODO would be nice, but disabling this re-render prevents applytoall from working since clickhandler doesn't get updated with the new a2a value
// React.memo(SelectorContent, (prevProps, nextProps)=>{

//   if(prevProps.action != nextProps.action){
//     return false;
//   }

//   let arraysEqual = prevProps.validIds.length == nextProps.validIds.length;

//   for(let i=0; i<prevProps.validIds.length && arraysEqual; i++){
//     if(prevProps.validIds[i] !== nextProps.validIds[i]){
//       arraysEqual = false;
//     }
//   }
//   return arraysEqual;

// });
