import React, { Fragment } from "react";
import { Table, Header, Image } from "semantic-ui-react";

const TableItem = ({ header, subheader, value, imageIcon }) => {
  return (
    <Fragment>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image src={imageIcon} rounded size="mini" />
            <Header.Content>
              {header}
              <Header.Subheader>{subheader}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{value}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default TableItem;
