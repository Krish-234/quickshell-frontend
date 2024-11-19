import { useState } from "react";
import { Navbar, Adminpage, Task } from "./components/components";

function App() {
  const [selectedGroup, setSelectedGroup] = useState("status");
  const [selectedOrder, setSelectedOrder] = useState("priority");

  return (
    <>
      <Navbar
        selectedGroup={selectedGroup}
        selectedOrder={selectedOrder}
        setSelectedGroup={setSelectedGroup}
        setSelectedOrder={setSelectedOrder}
      />
      <Adminpage
        selectedGroup={selectedGroup}
        selectedOrder={selectedOrder}
      />
    </>
  );
}

export default App;
