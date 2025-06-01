import React, { useContext } from "react";
import {
  Clear as ClearIcon,
  // Delete as DeleteIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon,
  Functions as CalculateIcon,
  ShareOutlined,
} from "@material-ui/icons";
import DataContext from "context/DataContext";
import ListContext from "context/ListContext";
import TemplateButton from "./TemplateButton";
import LinkButton from "./LinkButton";
import QRButton from "./QRButton";
import TTSTextExportButton from "./TTSTextExportButton";
import ImageExportButton from "./ImageExportButton";
import TextExportButton from "./TextExportButton";
import PrintExportButton from "./PrintExportButton";
import SimpleButton from "./SimpleButton";
import MenuButton from "common/MenuButton";
import TTSTextImportButton from "./TTSTextImportButton";

function ListExtras() {
  const { userId } = useContext(DataContext);
  const {
    currentList,
    isKillPointMode,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork,
    handleToggleIsKillPointMode,
  } = useContext(ListContext);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <TemplateButton />
      <MenuButton label="Share/Print..." icon={<ShareOutlined />}>
        <TTSTextExportButton currentList={currentList} />
        <ImageExportButton currentList={currentList} />
        <TextExportButton currentList={currentList} />
        <PrintExportButton currentList={currentList} />
        <QRButton currentList={currentList} />
        <LinkButton currentList={currentList} />
      </MenuButton>
      <TTSTextImportButton/>
      <SimpleButton
        timeout={3000}
        timeoutMessage={listSaveMessage ? listSaveMessage : "Saving..."}
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
      {/* <SimpleButton
        isDisabled={!Boolean(userId) || !Boolean(currentList.listId)}
        icon={<DeleteIcon />}
        label="Delete List"
        handleClick={deleteUserList}
      /> */}
      <SimpleButton
        icon={<CalculateIcon />}
        label={
          isKillPointMode ? "Calculating Kill Points!" : "Calculate Kill Points"
        }
        handleClick={handleToggleIsKillPointMode}
      />
    </div>
  );
}

export default ListExtras;
