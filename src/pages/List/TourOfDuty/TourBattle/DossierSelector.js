import React, { useContext } from "react";
import SelectorHeader from "../../CardSelector/SelectorHeader";
import ListContext from "context/ListContext";
import { Button, Card, CardHeader, Fade, Grow, IconButton, Typography } from "@material-ui/core";
import cards from "constants/cards";
import IconBadge from "common/IconBadge";
import CardIcon from "common/CardIcon";
import {
  Add as AddIcon,
} from '@material-ui/icons';

// TODO a lot of this would be better if it shrunk based on screen width. For now, shave some space off to make mobile easier to use
// (ie Compact is made with mobile first in mind)
function DossierCardHeader({ dossier, card, handleClick }) {
  const { cardType, cardSubtype } = card;
  const{handleCardZoom} = useContext(ListContext);

  let showPoints = !['battle', 'command'].includes(card.cardType);

  // switch IconBadge props based on cardType
  let avatar = (
    <IconBadge
      upgradeType={cardType === 'upgrade' ? cardSubtype: null}
      rank={cardType === 'unit' ? card.rank: null}
      hidden={cardType === 'command' || cardType === 'counterpart' || cardType === 'battle'}
      avatar={
        <CardIcon
          size="medium" // default large
          card={card}
          handleClick={()=>{
            handleCardZoom(card.id)
          }}
        />
      }
    />
  );

  // Add button, same for every type, simply passing thru the 'add this card' handler
  const action = (
    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
      {/* { showPoints && !isCardExpanded && <PointsChip compact={true} value={card.cost}></PointsChip>} */}
      <IconButton size="medium" onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </div>
  );

  let subheader = card.cardName; //capitalizeFirstLetters(cardSubtype) + (isRecon ? ' (Recon)' : '');

  const title = <Typography onClick={()=>{
    handleCardZoom(card.id)
  }}>{dossier.name}</Typography>

  // TODO see if there's a way to left-align the (+) and have no space on header; did not see one in ~5s of reviewing MUI page
  return (
    <CardHeader
      avatar={avatar}
      // title={`${pips}${displayName ? displayName : cardName}`}
      title={title}
      subheader={subheader}
      action={action}
      style={{ padding: 8 }}
    />
  );
}


function DossierSelector({items, onClick}){

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
              const card = cards[i.unitId];
              console.log(JSON.stringify(i));

              return <Grow unmountOnExit in={true}>
                <Card>
                  {/* TODO re-crib some stuff from textcardheader to show dossier details et al */}
                  <DossierCardHeader isCardExpanded={false} dossier={i.dossier}
                    card={card} handleClick={()=>onClick(i)} hideExpand={()=>true}
                  />
                </Card>
              </Grow>
            })}
          </React.Fragment>
        // </Fade>
   );
}

export default DossierSelector;