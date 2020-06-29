import React from "react";
import { Segment, Item, Header, List, Label } from "semantic-ui-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function SymptomList({ symptoms, ...rest }) {
  dayjs.extend(relativeTime);

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <Header as="h4" attached="top" color="olive">
        <Header.Content>Symptoms:</Header.Content>
      </Header>
      <Segment attached style={{ overflow: "auto", maxHeight: "400px" }}>
        <Item.Group divided>
          {symptoms.map((symptom) => (
            <Item key={symptom.symptomId}>
              <Item.Image
                size="tiny"
                src={
                  symptom.imageUrl
                    ? symptom.imageUrl
                    : "https://react.semantic-ui.com/images/wireframe/image.png"
                }
              />

              <Item.Content>
                <Item.Header>{symptom.symptomId}</Item.Header>
                <Item.Meta>
                  <div style={{ display: "block", height: "20px" }}>
                    {symptom.lastUpdated && (
                      <span style={{ float: "right" }}>
                        Last Updated: {dayjs().to(dayjs(symptom.lastUpdated))}
                      </span>
                    )}
                    <span style={{ float: "left" }}>
                      Added: {dayjs(symptom.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </Item.Meta>
                <Item.Description>
                  <List divided selection>
                    <List.Item>
                      <Label color="blue" horizontal>
                        Specialty:
                      </Label>
                      {symptom.specialty ? symptom.specialty : "Not Set"}
                    </List.Item>
                    <List.Item>
                      <Label color="blue" horizontal>
                        Other Names:
                      </Label>
                      {symptom.other ? symptom.other : "Not Set"}
                    </List.Item>
                  </List>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
}

export const NoSymptomList = ({ username }) => (
  <div style={{ width: "100%", marginBottom: "20px" }}>
    <Segment>
      <Header as="h3" block color="olive" textAlign="center">
        {username} hasn't added any symptoms
      </Header>
    </Segment>
  </div>
);
