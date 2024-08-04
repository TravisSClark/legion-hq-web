import React, { useContext } from 'react';
import {
  History as UsePrevIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon,
  Functions as CalculateIcon
} from '@material-ui/icons';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';
import TemplateButton from './TemplateButton';
import LinkButton from './LinkButton';
import QRButton from './QRButton';
import TTSTextExportButton from './TTSTextExportButton';
import ImageExportButton from './ImageExportButton';
import TextExportButton from './TextExportButton';
import PrintExportButton from './PrintExportButton';
import SimpleButton from './SimpleButton';

function ListExtras() {
  const { userId } = useContext(DataContext);
  const {
    currentList,
    isKillPointMode,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork,
    handleToggleUsingOldPoints,
    handleToggleIsKillPointMode,
    userSettings
  } = useContext(ListContext);

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
      }}
    >
      <TemplateButton />
      {/* TODO TODO TODO  - lots of these are calculating their list exports on their render, should be done on the click */}
      <LinkButton currentList={currentList}  userSettings={userSettings}/>
      <QRButton currentList={currentList} userSettings={userSettings} />
      <ImageExportButton currentList={currentList} />
      <TextExportButton currentList={currentList} />
      <TTSTextExportButton currentList={currentList} userSettings={userSettings} />
      <PrintExportButton currentList={currentList} userSettings={userSettings} />
      <SimpleButton
        timeout={3000}
        timeoutMessage={listSaveMessage ? listSaveMessage : 'Saving...'}
        isDisabled={!Boolean(userId)}
        icon={<SaveIcon />}
        label="Save List"
        handleClick={() => handleListSave(currentList)}
      />
      <SimpleButton
        isDisabled={!Boolean(currentList.listId)}
        icon={<ForkIcon />}
        label="Fork List"
        handleClick={() => handleListFork(currentList)}
      />
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
      <SimpleButton
        icon={<CalculateIcon />}
        label={isKillPointMode ? "Calculating Kill Points!" : "Calculate Kill Points"}
        handleClick={handleToggleIsKillPointMode}
      />
      <SimpleButton
        timeout={1000}
        timeoutMessage="Changing Points..."
        icon={<UsePrevIcon />}
        label={currentList.isUsingOldPoints ? "Using 2.5 Cards/Points" : "Using New Points"}
        handleClick={handleToggleUsingOldPoints}
      />
    </div>
  );
};

export default ListExtras;
