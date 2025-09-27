import React, { useContext } from "react";
import SelectorHeader from "./SelectorHeader";
import ListContext from "context/ListContext";
import { Button, Fade } from "@material-ui/core";

function RegisterSelector({items, onClick}){

  const {setCardPaneFilter} = useContext(ListContext);
   return (
        // <Fade unmountOnExit exit={false} in={cardPaneFilter.action !== "DISPLAY"}>
          <React.Fragment>
            <SelectorHeader
              // headerContent={header}
              setCardPaneFilter={setCardPaneFilter}
              // moreHeaderContent={moreHeaderContent}
            />
            {items.map(i=>{
              return <Button onClick={()=>onClick(i)}>
                <div>{i.name}</div>
                <div>{i.text}</div>
              </Button>
            })}
          </React.Fragment>
        // </Fade>
   );
}

export default RegisterSelector;