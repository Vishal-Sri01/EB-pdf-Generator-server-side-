sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.EmployeeView", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("employee").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            this.getView().bindElement({
                path: "/Employees(" + sEmployeeId + ")",
                parameters: {
                    expand: "Employees"
                },
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function () {
                        this.getView().setBusy(true);
                    }.bind(this),
                    dataReceived: function () {
                        this.getView().setBusy(false);
                    }.bind(this)
                }
            });
        },

        _onBindingChange: function () {
            var oElementBinding = this.getView().getElementBinding();
            if (!oElementBinding.getBoundContext()) {
                sap.ui.core.UIComponent.getRouterFor(this).getTargets().display("notFound");
            }
        },

        onPreview: function () {
            var oView = this.getView();
            var oContext = oView.byId("employeeForm").getBindingContext();
        
            if (!oContext) {
                MessageToast.show("No data available to preview.");
                return;
            }
        
            var oData = oContext.getObject();
        
            // Call CAP service to generate PDF
            fetch('/PDF', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(oData)
            })
            .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                window.open(url, '_blank'); // Open the PDF in a new tab
                MessageToast.show("PDF generated successfully.");
            })
            .catch(error => {
                MessageToast.show("Error generating PDF.");
                console.error(error);
            });
        }
        
    });
});
