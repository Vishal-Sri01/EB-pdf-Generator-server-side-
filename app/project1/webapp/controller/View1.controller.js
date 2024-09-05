sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input"
], function (Controller, MessageBox, Dialog, Button, Input) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            var oDataModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/odata/v4/catalog/"
            });
            this.getView().setModel(oDataModel);
        },

        onAdd: function () {
            var oView = this.getView();
        
            // Open a dialog for user input
            var oAddDialog = new Dialog({
                title: "Add Employee",
                content: [
                    new Input("inputID", { placeholder: "Enter ID" }),
                    new Input("inputName", { placeholder: "Enter name" }),
                    new Input("inputEmail", { placeholder: "Enter email" }),
                    new Input("inputJobTitle", { placeholder: "Enter job title" }),
                    new Input("inputDepartment", { placeholder: "Enter department" }),
                    new Input("inputStartDate", { placeholder: "Enter start date", type: "Date" }),
                    new Input("inputSalary", { placeholder: "Enter salary", type: "Number" }),
                    new Input("inputPhoneNumber", { placeholder: "Enter phone number" }),
                    new Input("inputAddress", { placeholder: "Enter address" })
                ],
                beginButton: new Button({
                    text: "Add",
                    press: function () {
                        var sID = sap.ui.getCore().byId("inputID").getValue(),
                            sName = sap.ui.getCore().byId("inputName").getValue(),
                            sEmail = sap.ui.getCore().byId("inputEmail").getValue(),
                            sJobTitle = sap.ui.getCore().byId("inputJobTitle").getValue(),
                            sDepartment = sap.ui.getCore().byId("inputDepartment").getValue(),
                            sStartDate = sap.ui.getCore().byId("inputStartDate").getValue(),
                            sSalary = sap.ui.getCore().byId("inputSalary").getValue(),
                            sPhoneNumber = sap.ui.getCore().byId("inputPhoneNumber").getValue(),
                            sAddress = sap.ui.getCore().byId("inputAddress").getValue();
        
                        // Perform validation
                        if (!sID || !sName || !sEmail || !sJobTitle || !sDepartment || !sSalary) {
                            MessageBox.error("Please fill in all the required fields.");
                            return;
                        }
        
                        if (isNaN(sID)) {
                            MessageBox.error("ID must be a number.");
                            return;
                        }
        
                        if (isNaN(sSalary)) {
                            MessageBox.error("Salary must be a number.");
                            return;
                        }
        
                        if (isNaN(sPhoneNumber) || sPhoneNumber.length !== 10) {
                            MessageBox.error("Phone number must be a 10-digit number.");
                            return;
                        }
        
                        var oNewEmployee = {
                            ID: parseInt(sID, 10),
                            name: sName,
                            email: sEmail,
                            jobTitle: sJobTitle,
                            department: sDepartment,
                            startDate: sStartDate ? new Date(sStartDate).toISOString().split('T')[0] : null,
                            Salary: parseFloat(sSalary),
                            phoneNumber: sPhoneNumber,
                            address: sAddress
                        };
        
                        var oListBinding = this.byId("employeeTable").getBinding("items");
                        oListBinding.create(oNewEmployee).created().then(function () {
                            MessageBox.success("Employee added successfully!");
                            oListBinding.refresh();
        
                            
                            oAddDialog.close();  // Ensure this line is reached
                        }.bind(this)).catch(function (error) {
                            MessageBox.error("Failed to add employee: " + error.message);
                        });
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oAddDialog.close();
                    }
                }),
                afterClose: function () {
                    oAddDialog.destroy();
                }
            });
        
            oAddDialog.open();
        },
        
        
        


        onUpdate: function () {
            var oTable = this.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 1) {
                var oSelectedItem = aSelectedItems[0];
                var oContext = oSelectedItem.getBindingContext();

                // Open a dialog for user input
                var oInputDialog = new Dialog({
                    title: "Update Employee",
                    content: [
                        new Input("inputName", {
                            value: oContext.getProperty("name"),
                            placeholder: "Enter updated name"
                        }),
                        new Input("inputEmail", {
                            value: oContext.getProperty("email"),
                            placeholder: "Enter updated email"
                        }),
                        new Input("inputJobTitle", {
                            value: oContext.getProperty("jobTitle"),
                            placeholder: "Enter updated job title"
                        }),
                        new Input("inputDepartment", {
                            value: oContext.getProperty("department"),
                            placeholder: "Enter updated department"
                        }),
                        new Input("inputStartDate", {
                            value: oContext.getProperty("startDate"),
                            placeholder: "Enter updated start date"
                        }),
                        new Input("inputSalary", {
                            value: oContext.getProperty("Salary"),
                            placeholder: "Enter updated salary"
                        }),
                        new Input("inputPhoneNumber", {
                            value: oContext.getProperty("phoneNumber"),
                            placeholder: "Enter updated phone number"
                        }),
                        new Input("inputAddress", {
                            value: oContext.getProperty("address"),
                            placeholder: "Enter updated address"
                        })
                    ],
                    beginButton: new Button({
                        text: "Update",
                        press: function () {
                            var sUpdatedName = sap.ui.getCore().byId("inputName").getValue();
                            var sUpdatedEmail = sap.ui.getCore().byId("inputEmail").getValue();
                            var sUpdatedJobTitle = sap.ui.getCore().byId("inputJobTitle").getValue();
                            var sUpdatedDepartment = sap.ui.getCore().byId("inputDepartment").getValue();
                            var sUpdatedStartDate = sap.ui.getCore().byId("inputStartDate").getValue();
                            var sUpdatedSalary = sap.ui.getCore().byId("inputSalary").getValue();
                            var sUpdatedPhoneNumber = sap.ui.getCore().byId("inputPhoneNumber").getValue();
                            var sUpdatedAddress = sap.ui.getCore().byId("inputAddress").getValue();

                            // Perform validation
                            if (!sUpdatedName || !sUpdatedEmail || !sUpdatedJobTitle || !sUpdatedDepartment || !sUpdatedSalary || !sUpdatedStartDate ) {
                                MessageBox.error("Please fill in all the required fields.");
                                return;
                            }

                            if (isNaN(sUpdatedSalary)) {
                                MessageBox.error("Salary must be a number.");
                                return;
                            }
                            
                            if (isNaN(sUpdatedPhoneNumber) || sUpdatedPhoneNumber.length !== 10) {
                                MessageBox.error("Phone number must be a 10-digit number.");
                                return;
                            }


                            oContext.setProperty("name", sUpdatedName); // Set the new employee name
                            oContext.setProperty("email", sUpdatedEmail);
                            oContext.setProperty("jobTitle", sUpdatedJobTitle);
                            oContext.setProperty("department", sUpdatedDepartment);
                            oContext.setProperty("startDate", sUpdatedStartDate ? new Date(sUpdatedStartDate).toISOString().split('T')[0] : null);
                            oContext.setProperty("Salary", parseFloat(sUpdatedSalary));
                            oContext.setProperty("phoneNumber", sUpdatedPhoneNumber);
                            oContext.setProperty("address", sUpdatedAddress);

                            oContext.getModel().submitBatch(oContext.getModel().getUpdateGroupId()).then(function () {
                                MessageBox.success("Employee updated successfully!");
                                oInputDialog.close();
                            }).catch(function (error) {
                                MessageBox.error("Failed to update employee: " + error.message);
                            });
                        }
                    }),
                    endButton: new Button({
                        text: "Cancel",
                        press: function () {
                            oInputDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oInputDialog.destroy();
                    }
                });

                oInputDialog.open();
            } else {
                MessageBox.warning("Please select exactly one employee to update.");
            }
        },

        onDelete: function () {
            var oView = this.getView();
            var oTable = oView.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length > 0) {
                MessageBox.confirm("Are you sure you want to delete the selected employee(s)?", {
                    onClose: function (oAction) {
                        if (oAction === MessageBox.Action.OK) {
                            aSelectedItems.forEach(function (oItem) {
                                var oContext = oItem.getBindingContext();
                                oContext.delete("$auto").then(function () {
                                    MessageBox.success("Employee deleted successfully!");
                                }).catch(function (error) {
                                    MessageBox.error("Failed to delete employee: " + error.message);
                                });
                            });
                        }
                    }
                });
            } else {
                MessageBox.warning("Please select employee(s) to delete.");
            }
        },
        onExit: function() {
            // Cleanup on exit to avoid memory leaks
            this.oModel = null;
            this.oSmartVariantManagement = null;
            this.oExpandedLabel = null;
            this.oSnappedLabel = null;
            this.oFilterBar = null;
            this.oTable = null;
        },
 
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var sPath = oItem.getBindingContext().getPath();
            var sEmployeeId = sPath.split("(")[1].split(")")[0];
            oRouter.navTo("employee", {
                employeeId: sEmployeeId
            });
        }
    });
});
