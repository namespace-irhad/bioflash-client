import React, { Fragment } from "react";
import {
  Icon,
  Image,
  Header,
  Segment,
  Grid,
  Placeholder,
  Table,
  Card,
  Step,
  Button,
} from "semantic-ui-react";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { virusIcon, symptomIcon, quizIcon } from "../../assets/images";
import TableItem from "./TableItem";
import { logoutUser } from "../../redux/actions/userActions";

const Profile = () => {
  const userInformation = useSelector((state) => state.user.credentials);
  const { authenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileSidebar = !loading ? (
    authenticated ? (
      <Fragment>
        <div style={{ display: "inline-block" }}>
          <Button
            floated="right"
            icon
            color="olive"
            labelPosition="right"
            onClick={handleLogout}
          >
            <Icon name="arrow alternate circle right" />
            Logout
          </Button>
        </div>
        <Image
          src={userInformation.imageUrl}
          bordered
          circular
          size="small"
          centered
        />
        <Header textAlign="center" as="h2">
          {userInformation.username}
        </Header>
        <Segment>
          <Table basic="very" celled collapsing className={styles.table}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Contributions</Table.HeaderCell>
                <Table.HeaderCell>Additions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <TableItem
                header="Viruses"
                subheader="Verified"
                value={userInformation.virusesMade}
                imageIcon={virusIcon}
              />
              <TableItem
                header="Symptoms"
                subheader="Verified"
                value={userInformation.symptomsMade}
                imageIcon={symptomIcon}
              />
              <TableItem
                header="Answered"
                subheader="Quiz"
                value={userInformation.quizAnswered}
                imageIcon={quizIcon}
              />
            </Table.Body>
          </Table>
        </Segment>
      </Fragment>
    ) : (
      <Fragment>
        <Header as="h3">Please login to continue.</Header>
        <Step.Group fluid vertical>
          <Step>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Step>
        </Step.Group>
      </Fragment>
    )
  ) : (
    <Fragment>
      <Card centered>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        </Card.Content>
      </Card>

      <Grid>
        <Grid.Column>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );

  return profileSidebar;
};

export default Profile;
