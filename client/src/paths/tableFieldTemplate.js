import React from "react";
import _startCase from "lodash/startCase";
import CellComponent from "./CellComponent";
import BootstrapTable from "react-bootstrap-table-next";
import AddButton from "./AddButton";

const getCells = (props, columns, role, username) => {
  const cols = columns.map((c) => c.dataField);
  return props?.items?.map((rowProps) => {
    const rowObject = {};
    cols.forEach((c) => {
      rowObject[c] = (
        <CellComponent
          {...rowProps}
          column={c}
          username={username}
          role={role}
        />
      );
    });
    return rowObject;
  });
};

const TableFieldTemplate = (props) => {
  console.log(props);
  const { role, username } = props.schema.items;
  const columns = [
    {
      dataField: "username",
      text: "Participant",
    },
    {
      dataField: "actionItems",
      text: "Action Items",
    },
    {
      dataField: "startDate",
      text: "Start Date",
    },
    {
      dataField: "effortInDays",
      text: "Effort (in days)",
      style: { width: "10%" },
    },
    {
      dataField: "estCompletionDate",
      text: "Est. Completion Date",
    },
    { dataField: "progress", text: "% of Progress", style: { width: "10%" } },
    { dataField: "status", text: "Status" },
  ];

  const keyField = "username";
  const data = getCells(props, columns, role, username);

  return (
    <>
      {/* <AddButton onClick={props.onAddClick} /> */}
      <BootstrapTable {...{ columns, data, keyField }} />
    </>
  );
};
export default TableFieldTemplate;
