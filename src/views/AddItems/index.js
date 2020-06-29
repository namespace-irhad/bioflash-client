import React from "react";
import { Container, Tab, Dimmer, Loader } from "semantic-ui-react";
import { HomePane, SymptomPane, VirusPane } from "./Components/TabPane";
import UpdateList from "./Components/UpdateItem";
import { useSelector } from "react-redux";

export default function AddItems() {
  const { loading } = useSelector((state) => state.user);
  const panes = [
    { menuItem: "Main", render: () => <HomePane /> },
    { menuItem: "Add Virus", render: () => <VirusPane /> },
    {
      menuItem: "Add Symptom",
      render: () => <SymptomPane />,
    },
    {
      menuItem: "Update",
      render: () => <UpdateList />,
    },
  ];
  return (
    <Container style={{ marginTop: "20px" }}>
      {loading && (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
      <Tab panes={panes} renderActiveOnly={true} />
    </Container>
  );
}
