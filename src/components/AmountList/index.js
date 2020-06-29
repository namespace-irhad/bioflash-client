import React, { Fragment } from "react";
import { Item, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useDarkMode from "use-dark-mode";

/**
 * Component used to pass through top users in quiz and contributions inside Dashboard View
 * @param {data from a list, contributions or quiz results} param0
 */
export default function AmountList({ data, contribution }) {
  const { value } = useDarkMode(false);
  /**
   * The component receives information about users name, amount of quiz answers or amount of viruses and symptoms made by that user. If the users profile image exists it adds the image too
   */
  return (
    <Item>
      <Popup
        content={`Symptoms: ${data.symptomsMade} and Viruses: ${data.virusesMade}`}
        key={data.username}
        inverted={value}
        header={`${data.username} helped make:`}
        trigger={
          <Item.Image
            style={{ border: "1px solid black" }}
            size="tiny"
            src={
              data.hasOwnProperty("imageUrl")
                ? data.imageUrl
                : "https://react.semantic-ui.com/images/wireframe/image.png"
            }
          />
        }
      />
      <Item.Content verticalAlign="middle">
        {data.username ? (
          <Link to={`/user/${data.username}`}>{data.username}</Link>
        ) : (
          "User"
        )}
        <Item.Extra>
          {contribution ? (
            <Fragment>
              Contributed: {data.virusesMade + data.symptomsMade}
            </Fragment>
          ) : (
            <Fragment>Answered: {data.quizAnswered}</Fragment>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
