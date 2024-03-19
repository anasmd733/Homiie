import React, { useState, useRef, useEffect } from 'react';
import Paragraph from '../../Common/Paragraph/Paragraph';
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Notes.css";
import Textbox from '../../Common/Textbox/Textbox';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import axios from 'axios';
import DeletePopUp from '../../Common/DeletePopUp/DeletePopUp';
import { EndPoint } from '../../EndPoints/EndPoint';

const SaveNotesPdf = ({ text, fileName, date, ind, id, setdel, setDoor }) => {
  const Arr = ["Open","Rename", "Edit", "Download", "Print", "Delete"];
  const [open, setOpen] = useState(false);
  const [Action, setAction] = useState(0);
  const [Array, setArray] = useState(ind);
  const [disable, setDisabled] = useState(true);
  const [file,setfile] = useState(fileName)

  const [TempArray, setTempArray] = useState({
    id:"",
    FileName: "", 
    Date: "",
    Date: ""
  })

  useEffect(()=>{
    setfile(fileName)
  },[fileName])
  const handle = () => {
    setArray(id);
  };

  const [data,setdata] = useState()
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EndPoint}/NotesArray`);
        setdata(response.data[ind]);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    
    useEffect(() => 
    {
      fetchData();
    }, [id]); 



  const wrapperRef = useRef(null);
  const Navigate = useNavigate()



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);


  const TextboxHandle = (event) => {
    setTempArray({
      ...TempArray,
      id:data.id,
      FileName: event.target.value,
      Date:data.date,
      text:data.text,
        })
    setfile( event.target.value)
  }

  const handleClickOutside = async(event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
      setDisabled(true);
      setTempArray(false);
    }
  };

  useEffect(() => {
    const updateDataOnServer = async () => {
      try {
        await axios.put(`${EndPoint}/NotesArray/${id}`, TempArray);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };
  
    if (TempArray.id) { 
      updateDataOnServer();
    }
  }, [TempArray]);


  const Delete = async () => {
    deleteNote();
    setdel("true");
    fetchData(); 
    setDoor(true); 
  };


  const deleteNote = async () => 
  {
    try {
      await axios.delete(`${EndPoint}/NotesArray/${id}`);
      setOpen(false);
      setdel("true");
    } 
    catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  const actionHandle = async (index) => {
    setAction(index);
    if (index === 0) {
      Navigate(`${Path.notesTextPage}/${data.id}`);
    } 
  
    else if (index === 1) {
      setDisabled(!disable);
    } 
    else if (index === 2) {
      Navigate(`${Path.notesTextPage}/${data.id}`);
    } 
    else if (index === 3) {
      Download();
    } 
    else if (index === 4) {
      handlePrint();
    } 
    else if (index === 5) {
      setDoor(true)
      Delete();
    }
  };
  

  const handlePrint = () => {
    const printContent =data.text;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const Download = () => {
    const printContent = data.text;
    const opt = {
      margin: 1,
      filename: 'notes.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(printContent).set(opt).save();
  };

  const HandleOpen=()=>{
    Navigate(`${Path.notesTextPage}/${data.id}`);
  }


  
  return (
    <div>
    <div className='SaveNotesPdf-main-division' ref={wrapperRef}>
      <div>
        <div className='SaveNotesPdf-text-para-division' onClick={HandleOpen}>
          <Paragraph  value={text} className='SaveNotesPdf-text-para' />
        </div>
        <div className='SaveNotesPdf-Second-division'>
          <div>
            <Textbox
              type={"text"}
              value={file}
              className={
                disable == true ? 'SaveNotesPdf-filename-para' :
                disable == false ? 'SaveNotesPdf-filename-para-false' : null}
              disable={disable}
              onchange={TextboxHandle}
            />

            <Paragraph value={date} className='SaveNotesPdf-date-para' />
          </div>
          <div className='SaveNotesPdf-DropEnd-division' onClick={handle}>
            <div>
              {open ? (
                <button onClick={() => setOpen(false)} className="DropEnd-button">
                  <BsThreeDotsVertical />
                </button>
              ) : (
                <button onClick={() => setOpen(true)} className="DropEnd-button">
                  <BsThreeDotsVertical />
                </button>
              )}
              <div className="DropEnd-Paragraph-main-division">
                {open && Arr.map((value, index) => (
                    <div
                      className="DropEnd-Paragraph-division"
                      key={index}
                      onClick={() => actionHandle(index)}>
                        <Paragraph value={value} className='DropEnd-Paragraph' />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
}

export default SaveNotesPdf;
