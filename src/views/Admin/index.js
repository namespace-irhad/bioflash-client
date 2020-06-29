import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { AdminList, AdminUserList, ApproveDeletion } from "./Components/List";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_UI, CLEAR_ERRORS } from "../../redux/types";

function Admin() {
  const [adminData, setAdminData] = useState({});
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOADING_UI });
    Axios.get("/admin").then((res) => {
      setAdminData(res.data);
      console.log(res.data);
      dispatch({ type: CLEAR_ERRORS });
    });
  }, []);

  const deleteKeyElement = (name, element) => {
    if (element === "approveUsers") {
      setAdminData({
        ...adminData,
        [element]: adminData[`${element}`].filter(
          (item) => item.username !== name
        ),
      });
    } else {
      setAdminData({
        ...adminData,
        [element]: adminData[`${element}`].filter((item) => item.name !== name),
      });
    }
  };

  return (
    <div>
      <Container fluid style={{ marginTop: "20px", padding: "20px" }}>
        {!loading ? (
          <Fragment>
            <Header as="h2" textAlign="center" color="green">
              Admin Panel
            </Header>
            <Grid columns={3} relaxed celled stretched stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="arrow alternate circle up" />
                    <Header.Content>Upgrade Users</Header.Content>
                  </Header>
                  {adminData.approveUsers && (
                    <AdminList
                      delete={deleteKeyElement}
                      item="users"
                      listData={adminData.approveUsers}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="delete" />
                    <Header.Content>Approve Deletion</Header.Content>
                  </Header>
                  <ApproveDeletion />
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="users" />
                    <Header.Content>Latest Accounts</Header.Content>
                  </Header>
                  {adminData.users && (
                    <AdminUserList
                      delete={deleteKeyElement}
                      listData={adminData.users}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="database" />
                    <Header.Content>Approve Virus</Header.Content>
                  </Header>
                  {adminData.viruses && (
                    <AdminList
                      delete={deleteKeyElement}
                      item="virus"
                      listData={adminData.viruses}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="database" />
                    <Header.Content>Approve Symptom</Header.Content>
                  </Header>
                  {adminData.symptoms && (
                    <AdminList
                      delete={deleteKeyElement}
                      item="symptom"
                      listData={adminData.symptoms}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="plug" />
                    <Header.Content>User Reports</Header.Content>
                  </Header>
                  <p>No User Reports</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        ) : (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </Container>
    </div>
  );
}

export default Admin;
