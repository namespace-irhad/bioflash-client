import React, { useEffect } from "react";
import {
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Item,
  Loader,
  Dimmer,
  Image,
} from "semantic-ui-react";

//Share buttons
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  RedditIcon,
  TwitterIcon,
  ViberIcon,
} from "react-share";
import AmountList from "../../components/AmountList";
import Profile from "../../components/Profile";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getLatestResults } from "../../redux/actions/gameActions";
import LatestResults from "./Components/LatestResults";

function Dashboard() {
  const { top_users } = useSelector((state) => state.data);
  const { loading } = useSelector((state) => state.ui);
  const { latestResults, topResults } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (latestResults.length === 0) dispatch(getLatestResults());
  }, []);

  return (
    <div className="home-container">
      <Header className="header-dashboard-title" as="h1" textAlign="center">
        Learn Biology Through Quiz and Memorization
      </Header>
      <Grid
        stackable
        doubling
        columns="equal"
        celled="internally"
        reversed="mobile vertically"
      >
        <Grid.Column tablet={5} widescreen={3} computer={3}>
          <Segment stacked raised style={{ textAlign: "center" }}>
            {loading && (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            )}
            <Header attached="top" color="green" textAlign="center" as="h3">
              Top Contributions
            </Header>
            <Item.Group divided>
              {top_users.map((user) => (
                <AmountList
                  key={user.username}
                  data={user}
                  contribution={true}
                />
              ))}
            </Item.Group>

            <Divider horizontal>
              <Header as="h4">
                <Icon name="bar chart" />
                TOP
              </Header>
            </Divider>
            <Header attached="top" color="green" textAlign="center" as="h3">
              Quiz Leaderboards
            </Header>
            <Item.Group divided>
              {topResults.map((user) => (
                <AmountList
                  key={user.username}
                  data={user}
                  contribution={false}
                />
              ))}
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column verticalAlign="top" width={8} stretched>
          <Segment raised stacked color="green">
            <LatestResults results={latestResults} />
          </Segment>
          <Segment
            color="green"
            style={{ overflowY: "scroll", maxHeight: "700px" }}
          >
            <Header as="h2" textAlign="center">
              Learn About Various Infections and Viruses
            </Header>
            <Item.Group divided>
              <Item>
                <Item.Content>
                  <Item.Header as="h4">What is a virus?</Item.Header>
                  <Item.Description>
                    <Image
                      src="https://ec.europa.eu/programmes/creative-europe/sites/creative-europe/files/covid19-cdc-unsplash.jpg"
                      size="medium"
                    />
                  </Item.Description>
                  <Item.Extra>
                    Virus: A microorganism that is smaller than a bacterium that
                    cannot grow or reproduce apart from a living cell. A virus
                    invades living cells and uses their chemical machinery to
                    keep itself alive and to replicate itself. It may reproduce
                    with fidelity or with errors (mutations); this ability to
                    mutate is responsible for the ability of some viruses to
                    change slightly in each infected person, making treatment
                    difficult. Viruses cause many common human infections and
                    are also responsible for a number of rare diseases.
                  </Item.Extra>
                </Item.Content>
              </Item>
              <Item>
                <Item.Content>
                  <Item.Header as="h4">What is a symptom?</Item.Header>
                  <Item.Description>
                    <Image
                      src="https://www.cdc.gov/dengue/images/symptoms/DengueSymptoms.jpg"
                      size="medium"
                    />
                  </Item.Description>
                  <Item.Extra>
                    Any subjective evidence of disease. In contrast, a sign is
                    objective. Blood coming out a nostril is a sign; it is
                    apparent to the patient, physician, and others. Anxiety, low
                    back pain, and fatigue are all symptoms; only the patient
                    can perceive them.Any subjective evidence of disease. In
                    contrast, a sign is objective. Blood coming out a nostril is
                    a sign; it is apparent to the patient, physician, and
                    others. Anxiety, low back pain, and fatigue are all
                    symptoms; only the patient can perceive them.
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment stacked>
            <Header as="h2" textAlign="center">
              Learn About Symptoms and Share Your Score
            </Header>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <EmailIcon size={32} round={true} />
              <FacebookIcon size={32} round={true} />
              <InstapaperIcon size={32} round={true} />
              <RedditIcon size={32} round={true} />
              <ViberIcon size={32} round={true} />
              <TwitterIcon size={32} round={true} />
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment raised>
            <Profile />
          </Segment>
        </Grid.Column>
        <div className="spacer"></div>
      </Grid>
    </div>
  );
}

export default Dashboard;
