import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";
import Typography from "@material-ui/core/Typography";
import {
  exampleData,
  exampleColumns,
  exampleRemoteColumns,
  basicTreeData,
  basicTreeDataColumns,
} from "./data";

let direction = "ltr";
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: "light",
  },
});

const bigData = [];
for (let i = 0; i < 1; i++) {
  const d = {
    id: i + 1,
    name: "Name" + i,
    surname: "Surname" + Math.round(i / 10),
    isMarried: i % 2 ? true : false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 0,
    sex: i % 2 ? "Male" : "Female",
    type: "adult",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35),
  };
  bigData.push(d);
}

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    text: "text",
    selecteds: 0,
    data: exampleData,
    columns: exampleColumns,
    remoteColumns: exampleRemoteColumns,
    initialFormData: {},
  };

  render() {
    const { initialFormData } = this.state;

    return (
      <>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            title="Basic Tree Data Preview"
            data={basicTreeData}
            columns={basicTreeDataColumns}
            parentChildData={(row, rows) =>
              rows.find((a) => a.id === row.parentId)
            }
            options={{
              selection: true,
              actionsColumnIndex: -1,
              columnsButton: true,
              exportButton: true,
              exportDelimiter: ",",
              exportFileName: "Title",
              filtering: true,
              paging: true,
              pageSize: 10,
              pageSizeOptions: [5, 10, 20],
            }}
            tableRef={this.tableRef}
            initialFormData={initialFormData}
            actions={[
              {
                icon: "save",
                tooltip: "Save User",
                onClick: (event, rowData) => {
                  // Do save operation
                },
              },
              {
                icon: "library_add",
                tooltip: "Duplicate User",
                onClick: (event, rowData) => {
                  const materialTable = this.tableRef.current;

                  this.setState({
                    initialFormData: {
                      ...rowData,
                      name: null,
                    },
                  });

                  materialTable.dataManager.changeRowEditing();
                  materialTable.setState({
                    ...materialTable.dataManager.getRenderState(),
                    showAddRow: true,
                  });
                },
              },
              (rowData) => ({
                icon: "delete",
                tooltip: "Delete User",
                onClick: (event, rowData) =>
                  confirm("You want to delete " + rowData.name),
                disabled: rowData.birthYear < 2000,
              }),
              {
                icon: "add",
                tooltip: "Add User",
                isFreeAction: true,
                onClick: (event) => alert("You want to add a new row"),
              },
            ]}
          />
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();

// <div style={{ maxWidth: "100%", direction }}>
//   <Grid container>
//     <Grid item xs={12}>
//       {this.state.selectedRows && this.state.selectedRows.length}
//       <MaterialTable
//           tableRef={this.tableRef}
//           columns={this.state.columns}
//           data={this.state.data}
//           title="Demo Title"
//           onFilterChange={(appliedFilter) => {
//             console.log("selected Filters : ", appliedFilter);
//           }}
//           // cellEditable={{
//           //   cellStyle: {},
//           //   onCellEditApproved: (
//           //     newValue,
//           //     oldValue,
//           //     rowData,
//           //     columnDef
//           //   ) => {
//           //     return new Promise((resolve, reject) => {
//           //       console.log("newValue: " + newValue);
//           //       setTimeout(resolve, 4000);
//           //     });
//           //   },
//           // }}
//           options={{
//             tableLayout: "fixed",
//             columnResizable: true,
//             headerSelectionProps: {
//               color: "primary",
//             },
//             selection: false,
//             selectionProps: (rowData) => {
//               rowData.tableData.disabled = rowData.name === "A1";
//
//               return {
//                 disabled: rowData.name === "A1",
//                 color: "primary",
//               };
//             },
//           }}
//           // editable={{
//           //   onBulkUpdate: (changedRows) =>
//           //     new Promise((resolve, reject) => {
//           //       console.log(changedRows);
//           //       setTimeout(() => {
//           //         {
//           //           /* const data = this.state.data;
//           //           data.push(newData);
//           //           this.setState({ data }, () => resolve()); */
//           //         }
//           //         resolve();
//           //       }, 1000);
//           //     }),
//           //   onRowAdd: (newData) =>
//           //     new Promise((resolve, reject) => {
//           //       setTimeout(() => {
//           //         {
//           //           /* const data = this.state.data;
//           //           data.push(newData);
//           //           this.setState({ data }, () => resolve()); */
//           //         }
//           //         resolve();
//           //       }, 1000);
//           //     }),
//           //   onRowUpdate: (newData, oldData) =>
//           //     new Promise((resolve, reject) => {
//           //       setTimeout(() => {
//           //         {
//           //           /* const data = this.state.data;
//           //           const index = data.indexOf(oldData);
//           //           data[index] = newData;
//           //           this.setState({ data }, () => resolve()); */
//           //         }
//           //         resolve();
//           //       }, 1000);
//           //     }),
//           //   onRowDelete: (oldData) =>
//           //     new Promise((resolve, reject) => {
//           //       setTimeout(() => {
//           //         {
//           //           /* let data = this.state.data;
//           //           const index = data.indexOf(oldData);
//           //           data.splice(index, 1);
//           //           this.setState({ data }, () => resolve()); */
//           //         }
//           //         resolve();
//           //       }, 1000);
//           //     }),
//           // }}
//           localization={{
//             body: {
//               emptyDataSourceMessage: "No records to display",
//               filterRow: {
//                 filterTooltip: "Filter",
//                 filterPlaceHolder: "Filtaaer",
//               },
//             },
//           }}
//           onSearchChange={(e) => console.log("search changed: " + e)}
//           onColumnDragged={(oldPos, newPos) =>
//               console.log(
//                   "Dropped column from " + oldPos + " to position " + newPos
//               )
//           }
//           // parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
//       />
//     </Grid>
//   </Grid>
//   {this.state.text}
//   <button
//       onClick={() => this.tableRef.current.onAllSelected(true)}
//       style={{ margin: 10 }}
//   >
//     Select
//   </button>
//   {/* <MaterialTable
//               title={
//                 <Typography variant="h6" color="primary">
//                   Remote Data Preview
//                 </Typography>
//               }
//               columns={[
//                 {
//                   title: "Avatar",
//                   field: "avatar",
//                   render: (rowData) => (
//                     <img
//                       style={{ height: 36, borderRadius: "50%" }}
//                       src={rowData.avatar}
//                     />
//                   ),
//                 },
//                 {
//                   title: "Id",
//                   field: "id",
//                   filterOnItemSelect: true,
//                   filterPlaceholder: "placeholder",
//                   lookup: {
//                     1: "1",
//                     2: "2",
//                     3: "3",
//                     4: "4",
//                     5: "5",
//                     6: "6",
//                     7: "7",
//                     8: "8",
//                     9: "9",
//                     10: "10",
//                     11: "11",
//                     12: "12",
//                   },
//                 },
//                 { title: "First Name", field: "first_name" },
//                 { title: "Last Name", field: "last_name" },
//               ]}
//               options={{
//                 filtering: true,
//                 grouping: true,
//                 groupTitle: (group) => group.data.length,
//                 searchFieldVariant: "outlined",
//               }}
//               localization={{
//                 toolbar: {
//                   searchPlaceholder: "Outlined Search Field",
//                 },
//               }}
//               data={(query) =>
//                 new Promise((resolve, reject) => {
//                   let url = "https://reqres.in/api/users?";
//                   url += "per_page=" + query.pageSize;
//                   url += "&page=" + (query.page + 1);
//                   console.log(query);
//                   fetch(url)
//                     .then((response) => response.json())
//                     .then((result) => {
//                       resolve({
//                         data: result.data,
//                         page: result.page - 1,
//                         totalCount: result.total,
//                       });
//                     });
//                 })
//               }
//             /> */}
// </div>
