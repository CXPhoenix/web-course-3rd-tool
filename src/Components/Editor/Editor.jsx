import React from "react";
import { useState } from "react";
import EditorTags from "./EditorTags";
import { editors } from "../Data/EditorData";
import HtmlEditor from "./HtmlEditor";
import CssEditor from "./CssEditor";
import CssSwitcher from "./CssSwitcher";

function changeActiveState(targetList, states, target) {
  states = states.map((item) => false);
  states.splice(targetList.indexOf(target.id), 1, true);
  return states;
}

export default function Editor({
  editorList,
  htmlData,
  openAddHtmlCodeAreaEventHandler,
  downloadHtmlFileEventHandler,
  deleteHtmlCodeEventHandler,
  changeHtmlCodeEventHandler,
  cssData,
  openAddCssCodeAreaEventHandler,
  downloadCssFileEventHandler,
  deleteCssCodeEventHandler,
  changeCssCodeEventHandler,
  switchEventHandler
}) {
  const states = editorList.map((item) => editors[item]["isActive"]);
  let [activeState, setActiveState] = useState([...states]);

  function clickEvent(e) {
    setActiveState(changeActiveState(editorList, [...activeState], e.target));
  }

  return (
    <div
      id={`Editor`}
      className="w-full h-2/5 sm:h-full overflow-hidden bg-[#114]"
    >
      <div className="flex pl-4 border-t-[1px] border-b-[1px] border-gray-300 h-[50px]">
        {editorList.map((item, index) => (
          <EditorTags
            key={editors[item]["tagId"] + String(index)}
            tagContent={editors[item]["tagText"]}
            tagId={editors[item]["tagId"]}
            clickEventHandler={clickEvent}
            isActive={activeState[index]}
          />
        ))}
        <CssSwitcher switchEventHandler={switchEventHandler} />
      </div>
      {editorList.map((item, index) =>
        item === "html" ? (
          <HtmlEditor
            key={String(index) + editors[item]["tagId"]}
            isActive={activeState[index]}
            htmlData={htmlData}
            openAddCodeAreaEventHandler={openAddHtmlCodeAreaEventHandler}
            downloadHtmlFileEventHandler={downloadHtmlFileEventHandler}
            deleteHtmlCodeEventHandler={deleteHtmlCodeEventHandler}
            changeHtmlCodeEventHandler={changeHtmlCodeEventHandler}
          />
        ) : (
          <CssEditor
            key={String(index) + editors[item]["tagId"]}
            isActive={activeState[index]}
            cssData={cssData}
            openAddCodeAreaEventHandler={openAddCssCodeAreaEventHandler}
            downloadCssFileEventHandler={downloadCssFileEventHandler}
            deleteCssCodeEventHandler={deleteCssCodeEventHandler}
            changeCssCodeEventHandler={changeCssCodeEventHandler}
          />
        )
      )}
    </div>
  );
}
