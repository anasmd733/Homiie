import { BsWhatsapp } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import { FaPrint } from "react-icons/fa";

 export const TopTableIcons = [
    {
        icon : BsWhatsapp,
        name : "whatsapp",
        isRounded : false
    },
    {
        icon : MdContentCopy,
        name : "copy",
        isRounded : false
    },
    {
        icon : BiSolidNotepad,
        name : "paste",
        isRounded : false
    },
    {
        icon : FaPrint,
        name : "print",
        isRounded : false
    },
 ]

 export const TotalCountsBelowArr = [
    {
        title : "Total Items",
        type : "number",
        name : "TotalItems"
    },
    {
        title : "Total Quantity",
        type : "number",
        name : "TotalQuantity"
    },
    {
        title : "Box Balance",
        type : "number",
        name : "BoxBalance"
    }
]

export const BillInputsArray = [
    {
        title : "Bill Amount",
        type : "number",
        name : "BillAmount"
    },
    {
        title : "Previous Balance",
        type : "number",
        name : "PreviousBalance"
    },
    {
        title : "Cash Received",
        type : "number",
        name : "CashRecieved"
    },
    {
        title : "Net Balance",
        type : "number",
        name : "NetBalance"
    },
]