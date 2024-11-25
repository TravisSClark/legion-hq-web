import React from 'react';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import { generateTournamentText } from 'components/printList';
import generateLink from './generateLink';
import cards from 'constants/cards';
import urls from 'constants/urls'

const PrintList = React.forwardRef(( props, ref) =>{

  const { currentList, showBattles = false, showCommands = false } = props;

  const listLink = generateLink(currentList);
  const units = []; let printingUnits = true;
  const commands = []; let printingCommands = false;
  const battles = []; let printingBattles = false;
  const lines = generateTournamentText(currentList, false).split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (printingUnits) units.push(line);
    else if (printingCommands) commands.push(line);
    else if (printingBattles) battles.push(line);
    if (line === '') {
      if (printingUnits) {
        printingUnits = false;
        printingCommands = true;
      } else if (printingCommands) {
        printingCommands = false;
        printingBattles = true;
      }
    }
  }

  const unitLines = [];
  units.forEach((line, i) => {
    if (i === 0) unitLines.push(<div key={`${line}_${i}`} style={{ fontSize: 24 }}>{line}</div>);
    else if (line.includes('- ')) unitLines.push(<div key={`${line}_${i}`}>{line}</div>);
    else unitLines.push(<div key={`${line}_${i}`} style={{ marginTop: 6 }}>{line}</div>)
  })

  return (
    <div
      ref={ref}
      style={{
        height: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        color:'black'
      }}
    >
      <div>{unitLines}</div>
      <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
        
        {showCommands &&  <div>
            {commands.map((line, i) => {
              if (line.includes('Commands:')) {
                return <b key="commands header">Command Hand</b>;
              }
              return <div key={`${line}_${i}`}>{line}</div>;
            })}
            </div>}

            <div style={{ marginTop: 4 }} />
       {showBattles && <div>
            {battles.map((line, i) => {
              if (line.includes('Battle Deck')) {
                return <b key="battle deck header">Battle Deck</b>;
              }
              return <div key={`${line}_${i}`}>{line}</div>;
            })}
          </div> }
        <QRCode size={147} value={listLink} />
      </div>
    </div>
  )
})

// TODO: Get upgrade images, commands, and battle cards print working
const PrintListImages = React.forwardRef(( props, ref) => {
    const { currentList } = props;
    const units = [];
    const commands = []; 
    const battles = [];

    currentList.units.forEach((unit, i) => {
      const card = cards[unit.unitId];
      const unitImage = `${urls.cdn}/${card.cardType}Cards/${card.imageName}`
      const upgradeImages = [];
      unit.upgradesEquipped.forEach((upgradeId, i) => {
        if (!upgradeId) return;
        const upgradeCard = cards[upgradeId];
        // Need to actually use this somewhere
        upgradeImages.push(`${urls.cdn}/${upgradeCard.cardType}Cards/${upgradeCard.imageName}`);
      });
      units.push(
        <div id={`${unit}-${i}`}>
          <img
            alt={card.cardName}
            src={unitImage}
            style={{ height: '200px', width: 'auto' }}
          />
        </div>
      );
    });
    // Need to do something similar as above for commands and battle cards

    return (
      <div
        ref={ref}
        style={{
          height: '100%',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div>{units}</div>
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
          {(
            <div>
              {commands.map((line, i) => {
                if (line.includes('Commands:')) {
                  return <b key="commands header">Command Hand</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
              <div style={{ marginTop: 4 }} />
              {battles.map((line, i) => {
                if (line.includes('Battle Deck')) {
                  return <b key="battle deck header">Battle Deck</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
            </div>
          )}
          <div>
            {battles.map((line, i) => {
              if (line.includes('Battle Deck')) {
                return <b key="battle deck header">Battle Deck</b>;
              }
              return <div key={`${line}_${i}`}>{line}</div>;
            })}
          </div>
        </div>
      </div>
    )
})

function PrintExportButton({ currentList }) {
  const componentRef = React.useRef();
  const componentRefNoBattlesCommands = React.useRef();
  const componentRefBattlesButNoCommands = React.useRef();
  const componentRefImages = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePrintMenuOpen = event => setAnchorEl(event.currentTarget);
  const handlePrintMenuClose = () => setAnchorEl(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef
  });
  const handlePrintNoBattlesCommands = useReactToPrint({
    contentRef: componentRefNoBattlesCommands
  });
  const handlePrintBattlesButNoCommands = useReactToPrint({
    contentRef: componentRefBattlesButNoCommands
  });
  const handlePrintListImages = useReactToPrint({
    contentRef: componentRefImages
  });
  

  return (
    <React.Fragment>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePrintMenuClose}
      >
        <MenuItem
          onClick={() => {
            handlePrint();
            handlePrintMenuClose();
          }}
        >
          With Battle/Command Cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintNoBattlesCommands();
            handlePrintMenuClose();
          }}
        >
          Without Battle/Command Cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintBattlesButNoCommands();
            handlePrintMenuClose();
          }}
        >
          With Battle Cards & Without Command Cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintListImages();
            handlePrintMenuClose();
          }}
        >
          Print Card Images
        </MenuItem>
      </Menu>
      <Chip
        clickable
        variant="outlined"
        label="Print List"
        icon={<PrintIcon />}
        style={{ marginRight: 4, marginBottom: 4 }}
        onClick={handlePrintMenuOpen}
      />
      <div style={{ display: 'none' }}>
        {/* TODO - there should be a way to simplify this into 1 element w state-driven props
            can't figure out the right event/promise sequence to get PrintList(/this component) to re-render before the print hook though... */}
        <PrintList
          showBattles={true}
          showCommands={true}
          ref={componentRef}
          currentList={currentList}
        />
        <PrintList
          showBattles={false}
          showCommands={false}
          ref={componentRefNoBattlesCommands}
          currentList={currentList}
        />
        <PrintList
          showBattles={true}
          showCommands={false}
          ref={componentRefBattlesButNoCommands}
          currentList={currentList}
        />
        <PrintListImages
          ref={componentRefImages}
          currentList={currentList}
        />
      </div>
    </React.Fragment>
  );
};

export default PrintExportButton;
