import React from "react";
import _startCase from "lodash/startCase";
import CellComponent from "./CellComponent";
import BootstrapTable from "react-bootstrap-table-next";

import Permission from "./Permission";
import styles from "./table.module.scss";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const getCells = (props, columns, role, username) => {
  let cols = columns.map((c) => c.dataField);
  return props?.items?.map((rowProps, idx) => {
    const rowObject = {};
    cols.forEach((c) => {
      console.log(rowProps);
      rowObject[c] =
        c !== "addNew" ? (
          <CellComponent
            {...rowProps}
            column={c}
            username={username}
            role={role}
          />
        ) : (
          <Permission
            component={
              <>
                <button
                  // disabled={
                  //   rowProps.children.props.formData["status"] !== "Completed"
                  // }
                  onClick={(event) => {
                    event.preventDefault();
                    rowProps.onAddIndexClick(idx + 1)(event);
                  }}>
                  +
                </button>
                {/* <button
                  // disabled={rowProps.children.props.formData["username"]==='undefined'}
                  onClick={(event) => {
                    event.preventDefault();
                    rowProps.onDropIndexClick(idx)(event);
                  }}>
                  -
                </button> */}
              </>
            }
            requiredUsername={rowProps.children.props.formData["username"]}
            currentUsername={username}
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
  const filterByName = (filterVal, data) => {
    if (filterVal) {
      return data.filter((d) =>
        d.username.props.children.props.formData.username
          .toLowerCase()
          .includes(filterVal.toLowerCase())
      );
    }
    return data;
  };
  let columns = [
    {
      dataField: "username",
      text: "Participant",
      filter: textFilter({ onFilter: filterByName }),
    },
    {
      dataField: "actionItems",
      text: "Action Items",
      style: { width: "20%" },
    },
    {
      dataField: "startDate",
      text: "Start Date",
    },
    {
      dataField: "effortInDays",
      text: "Effort (in days)",
    },
    {
      dataField: "estCompletionDate",
      text: "Est. Completion Date",
    },
    {
      dataField: "actualCompletionDate",
      text: "Completion Date",
    },
    { dataField: "progress", text: "% of Progress" },

    { dataField: "priority", text: "Priority" },
    { dataField: "environment", text: "Environment" },

    { dataField: "status", text: "Status" },
    { dataField: "assignedBy", text: "Assigned by" },
    // { dataField: "category", text: "Category",

    { dataField: "addNew", text: "" },
  ];
  columns = columns.map((x) => ({
    ...x,
    headerStyle: { color: "grey" },
  }));

  const keyField = "username";
  const data = getCells(props, columns, role, username);

  const rowStyle = (row) => {
    const style = {};
    if (row.status.props.children.props.formData["status"] === "Completed") {
      style.backgroundColor = "#d3d3d3";
    }
    return style;
  };
  const options = {
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
    ],
  };
  return (
    <div id={`${styles.reactBootstrapTable}`} class="table table-hover">
      <BootstrapTable
        {...{
          keyField: "username",
          data,
          columns,
          bordered: false,
          rowStyle,
          pagination: paginationFactory(options),
          filter: filterFactory(),
        }}
      />
    </div>
  );
};
export default TableFieldTemplate;
