import React, { useState } from "react";
import { Path } from "./Path";
import DashboardPage from "../Screen/Dashboard/DashboardPage";
import SalesDetailsPage from "../Screen/Transaction/SalesDetails/SalesDetailsPage";
import PurchaseDetailsPage from "../Screen/Transaction/PurchaseDetails/PurchaseDetailsPage";
import BoxDetailsPage from "../Screen/Transaction/BoxDetails/BoxDetailsPage";
import AdvanceOrderPage from "../Screen/Transaction/AdvanceOrder/AdvanceOrderPage";
import LedgerAccountPage from "../Screen/Master/LedgerAccountPage";
import MasterDetailsPage from "../Screen/Master/MasterDetailsPage";
import ProductRegisterPage from "../Screen/Master/ProductRegisterPage";
import BalanceEnquiryIndexPage from "../Screen/BalanceEnquiry/BalanceEnquiryIndexPage/BalanceEnquiryIndexPage";
import CustomerBalancePage from "../Screen/BalanceEnquiry/CustomerBalancePage/CustomerBalancePage";
import SupplierBalancePage from "../Screen/BalanceEnquiry/SupplierBalancePage/SupplierBalancePage";
import ReportsPageIndex from "../Screen/ReportsPage/ReportsPageIndex/ReportsPageIndex";
import ProductReportsPage from "../Screen/ReportsPage/ProductReportsPage/ProductReportsPage";
import CustomerReportPage from "../Screen/ReportsPage/CustomerReportsPage/CustomerReportPage";
import SupplierReportsPage from "../Screen/ReportsPage/SupplierReportsPage/SupplierReportsPage";
import BoxBalanceReportPage from "../Screen/ReportsPage/BoxBalanceReoportsPage/BoxBalanceReportPage";
import PaymentReciptIndexPage from "../Screen/PaymentRecipt/PaymentReciptIndex/PaymentReciptIndexPage";
import IncomeDetailsPage from "../Screen/PaymentRecipt/IncomeDetailsPage/IncomeDetailsPage";
import ExpenseDetailsPage from "../Screen/PaymentRecipt/ExpenseDetailsPage/ExpenseDetailsPage";
import PeriodicStatementPage from "../Screen/PeriodicStatementPage/PeriodicStatementPage";
import VehicleExpensePage from "../Screen/VehicleExpensePage/VehicleExpensePage";
import CommonExpensesPage from "../Screen/CommonExpensesPage/CommonExpensesPage";
import NotesPage from "../Screen/NotesPage/NotesPage";
import QuotationPage from "../Screen/QuotationPage/QuotationPage";
import { Route, Routes } from "react-router-dom";
import PeriodicStatementTablePage from "../Screen/PeriodicStatementPage/PeriodicStatementTablePage";
import VehicleExpenseTablePage from "../Screen/VehicleExpensePage/VehicleExpenseTablePage";
import CommonExpenseTablePage from "../Screen/CommonExpensesPage/CommonExpenseTablePage";
import QuotationTablePage from "../Screen/QuotationPage/QuotationTablePage";
import QuotationSubmitTable from "../Screen/QuotationPage/QuotationSubmitTable";
import NotesTextPage from "../Screen/NotesPage/NotesTextPage";
import TableWithCheckBoxTempSceen from "../Common/TableWithAdd/TableCheckBox/TableWithCheckBoxTempSceen";
import EditNotes from "../Components/Notes/EditNotes";
import ProductQuotationDetails from "../Components/Quotation/ProductQuotationDetails";
import CustomerQuotationEdit from "../Components/Quotation/CustomerQuotationEdit";
const Router = () => {
  const [routes, setRoutes] = useState([
    {
      path: Path.dashboard,
      Component: DashboardPage,
    },
    {
      path: Path.salesDetails,
      Component: SalesDetailsPage,
    },
    {
      path: Path.purchaseDetails,
      Component: PurchaseDetailsPage,
    },
    {
      path: Path.boxDetails,
      Component: BoxDetailsPage,
    },
    {
      path: Path.advanceOrder,
      Component: AdvanceOrderPage,
    },
    {
      path: Path.ledgerAccount,
      Component: LedgerAccountPage,
    },
    {
      path: Path.masterDetails,
      Component: MasterDetailsPage,
    },
    {
      path: Path.productRegister,
      Component: ProductRegisterPage,
    },
    {
      path: Path.balanceEnquiry,
      Component: BalanceEnquiryIndexPage,
    },
    {
      path: Path.customerBalance,
      Component: CustomerBalancePage,
    },
    {
      path: Path.supplierBalance,
      Component: SupplierBalancePage,
    },
    {
      path: Path.reports,
      Component: ReportsPageIndex,
    },
    {
      path: Path.productReports,
      Component: ProductReportsPage,
    },
    {
      path: Path.customerReports,
      Component: CustomerReportPage,
    },
    {
      path: Path.supplierReports,
      Component: SupplierReportsPage,
    },
    {
      path: Path.boxBalanceReports,
      Component: BoxBalanceReportPage,
    },
    {
      path: Path.paymentIndex,
      Component: PaymentReciptIndexPage,
    },
    {
      path: Path.incomeDetails,
      Component: IncomeDetailsPage,
    },
    {
      path: Path.expenseDetails,
      Component: ExpenseDetailsPage,
    },
    {
      path: Path.periodicStatement,
      Component: PeriodicStatementPage,
    },
    {
      path: Path.quotation,
      Component:QuotationPage
    },
    {
      path: Path.quotationEdit,
      Component:QuotationPage
    },
    {
      path: Path.periodicStatementGoTable,
      Component: PeriodicStatementTablePage,
    },
    {
      path: Path.vehicleExpenses,
      Component: VehicleExpensePage,
    },
    {
      path: Path.vehicleExpensesEdit,
      Component: VehicleExpensePage,
    },
    {
      path: Path.vehicleExpensesGoTable,
      Component: VehicleExpenseTablePage,
    },
    {
      path: Path.commonExpenses,
      Component: CommonExpensesPage,
    },
    
    {
      path: Path.commonExpensesEdit,
      Component: CommonExpensesPage,
    },
    {
      path: Path.commonExpensesGoTable,
      Component: CommonExpenseTablePage,
    },
    {
      path: Path.notes,
      Component: NotesPage,
    },
    {
      path: Path.quotationGoTable,
      Component: QuotationTablePage,
    },
    
    {
      path: Path.quotationGoTableEdit,
      Component: QuotationTablePage,
    },
    {
      path: Path.quotationSubmitTable,
      Component: QuotationSubmitTable,
    },
    {
      path: Path.quotationSubmitTableEdit,
      Component: CustomerQuotationEdit,
    },
    {
      path:Path.notesTextPage,
      Component:NotesTextPage,
    },
    {
      path:Path.notesEditPage,
      Component:EditNotes,
    },
    {
      path:Path.salesDetailsLocate,
      Component:TableWithCheckBoxTempSceen,
    },
    {
      path:Path.ProductQuotationDetails,
      Component:ProductQuotationDetails
    }
    ,
    {
      path:Path.ProductQuotation,
      Component:ProductQuotationDetails
    }
  ]);
  return (
    <Routes>
      {routes.map(({ path, Component }, i) => (
        <Route key={i} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default Router;