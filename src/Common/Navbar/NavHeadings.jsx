import { AirportShuttle, BalanceOutlined, Description, HelpOutline, Leaderboard, NoteAdd, PersonAddOutlined, Poll, QueryStats, ReceiptLong, Wallet } from "@mui/icons-material";
import { Path } from "../../Routes/Path";

export const NavHeadings = [
  {
    heading: "Dashboard",
    icon: Leaderboard ,
    open: false,
    isNested: false,
    nestedHeads : [],
    pathName : "Dashboard",
    path : Path.dashboard
  },
  {
    heading: "Transaction",
    icon: Wallet,
    open: false,
    isNested: true,
    pathName : "Transaction",
    path : Path.salesDetails,
    nestedHeads: [
      { heading: "Sales Details",path: Path.salesDetails },
      { heading: "Purchase Details",path : Path.purchaseDetails },
      { heading: "Box Details", path : Path.boxDetails },
      { heading: "Advance Order", path : Path.advanceOrder },
    ],

  },
  {
    heading: "Master",
    icon: PersonAddOutlined,
    open: false,
    isNested: true,
    pathName : "Master",
    path : Path.ledgerAccount,
    nestedHeads: [
        { heading: "Ledger Account", path : Path.ledgerAccount },
        { heading: "Product Register", path : Path.productRegister },
        { heading: "Master Details", path : Path.masterDetails },
      ],
  },
  {
    heading: "Balance Enquiry",
    icon: BalanceOutlined,
    open: false,
    isNested : false,
    pathName : "balance_enquiry",
    path : Path.balanceEnquiry,
    nestedHeads : []
  },
  {
    heading: "Reports",
    icon: QueryStats,
    open: false,
    isNested : false,
    pathName : "Reports",
    path : Path.reports,
    nestedHeads : []
  },
  {
    heading: "Payment Receipt",
    icon: ReceiptLong,
    open: false,
    isNested : false,
    pathName : "paymentRecipt",
    path : Path.paymentIndex,
    nestedHeads : []
  },
  {
    heading: "Periodic Statement",
    icon: Description,
    open: false,
    isNested : false,
    pathName : "periodic_statement",
    path : Path.periodicStatement,
    nestedHeads : []
  },
  {
    heading: "Vehicle Expenses",
    icon: AirportShuttle,
    open: false,
    isNested : false,
    pathName : "vehicle_expenses",
    path : Path.vehicleExpenses,
    nestedHeads : []
  },
  {
    heading: "Common Expenses",
    icon: HelpOutline,
    open: false,
    isNested : false,
    pathName : "common_expenses",
    path : Path.commonExpenses,
    nestedHeads : []
  },
  {
    heading: "Notes",
    icon: NoteAdd,
    open: false,
    isNested : false,
    pathName : "Notes",
    path : Path.notes,
    nestedHeads : []
  },
  {
    heading: "Quotation",
    icon: Poll,
    open: false,
    isNested : false,
    pathName : "Quotation",
    path : Path.quotation,
    nestedHeads : []
  },
];
