import React, { useContext } from 'react';
import {
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon,
  Functions as CalculateIcon,
  ShareOutlined
} from '@material-ui/icons';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';
import TemplateButton from './TemplateButton';
import LinkButton from './LinkButton';
import QRButton from './QRButton';
import TTSTextExportButton from './TTSTextExportButton';
import ImageExportButton from './ImageExportButton';
import TextExportButton from './TextExportButton';
import SimpleButton from './SimpleButton';
import MenuButton from 'common/MenuButton';

function ListExtras() {
  const { userId } = useContext(DataContext);
  const {
    currentList,
    isKillPointMode,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork,
    handleToggleIsKillPointMode
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
      <MenuButton label="Export..." icon={<ShareOutlined/>}>
        <TTSTextExportButton currentList={currentList} />
        <ImageExportButton currentList={currentList} />
        <TextExportButton currentList={currentList} />
        <QRButton currentList={currentList} />
        <LinkButton currentList={currentList} />
      </MenuButton>
      {/* TODO - hung indefinitely on debug, just gives a QR code in production */}
      {/* <PrintExportButton currentList={currentList} /> */}
      <SimpleButton
        timeout={3000}
        timeoutMessage={listSaveMessage ? listSaveMessage : 'Saving...'}
        isDisabled={!Boolean(userId)}
        icon={<SaveIcon />}
        label="Save"
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
    </div>
  );
};

export default ListExtras;
