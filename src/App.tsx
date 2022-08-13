import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Document } from "components/Document";
import { Header } from "components/Header";
import { Merge } from "components/Merge";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={`${Classes.DARK} .flex-split-body`}>
      <Header />
      <div className={`content`}>
        <div className={`center margin-vertical-spacing`}>
          <Document traversal />
          <Document />
          <Document linked />
          <Document />
          <Document />
          <Merge />
        </div>
      </div>
    </div>
  );
}

export default App;
