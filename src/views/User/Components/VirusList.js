import React from "react";
import { Segment, Item, Header, Icon, Label, List } from "semantic-ui-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function VirusList({ viruses }) {
  dayjs.extend(relativeTime);

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <Header as="h4" dividing color="olive">
        <Icon name="thumbs up outline" />
        <Header.Content>User's Contributions</Header.Content>
      </Header>
      <Header as="h4" attached="top" color="olive">
        <Header.Content>Viruses:</Header.Content>
      </Header>
      <Segment attached style={{ overflow: "auto", maxHeight: "400px" }}>
        <Item.Group divided>
          {viruses.map((virus) => (
            <Item key={virus.virusId}>
              <Item.Image
                size="tiny"
                src={
                  virus.imageUrl
                    ? virus.imageUrl
                    : "https://react.semantic-ui.com/images/wireframe/image.png"
                }
              />

              <Item.Content>
                <Item.Header>{virus.virusId}</Item.Header>
                <Item.Meta>
                  <div style={{ display: "block", height: "20px" }}>
                    {virus.lastUpdated && (
                      <span style={{ float: "right" }}>
                        Last Updated: {dayjs().to(dayjs(virus.lastUpdated))}
                      </span>
                    )}
                    <span style={{ float: "left" }}>
                      Added: {dayjs(virus.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </Item.Meta>
                <Item.Description>
                  <List divided selection>
                    <List.Item>
                      <Label color="green" horizontal>
                        Specialty:
                      </Label>
                      {virus.specialty ? virus.specialty : "Not Set"}
                    </List.Item>
                    <List.Item>
                      <Label color="yellow" horizontal>
                        Other Names:
                      </Label>
                      {virus.other ? virus.other : "Not Set"}
                    </List.Item>
                    <List.Item>
                      <Label color="orange" horizontal>
                        Virus Type:
                      </Label>
                      {virus.type ? virus.type : "Not Set"}
                    </List.Item>
                    <List.Item>
                      <Label color="teal" horizontal>
                        Average Duration:
                      </Label>
                      {virus.duration ? virus.duration : "Not Set"}
                    </List.Item>
                  </List>
                </Item.Description>
                <Item.Extra>
                  <span>Symptoms:</span>
                  {virus.symptoms.map((symptom, key) => (
                    <Label key={key} as="a" content={symptom} icon="yelp" />
                  ))}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
}

export function NoVirusList({ username }) {
  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <Segment>
        <Header as="h3" block color="olive" textAlign="center">
          {username} hasn't added any viruses
        </Header>
      </Segment>
    </div>
  );
}
