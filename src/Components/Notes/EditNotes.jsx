import React, { useState, useEffect } from 'react';
import Textbox from '../../Common/Textbox/Textbox';
import Button from '../../Common/Submit/Button';
import SaveNotesCard from './SaveNotesCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import "./Notes.css";
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import axios from 'axios';
import { EndPoint } from '../../EndPoints/EndPoint';

const EditNotes = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const { id } = useParams();
  const [fileName, setFileName] = useState("");
  const [save, setSave] = useState(false);
  const [data, setData] = useState(null);
  const [DupArr, setDupArr] = useState({});
  const [Empty, setEmpty] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EndPoint}/NotesArray/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      setDupArr({
        id: data.id,  
        FileName: data.FileName,
        Date: data.Date,
        text: data.text
      });
      setFileName(data.FileName);
      setEmpty(data.text);
    }
  }, [data]);

  const HandleSave = () => {
    setSave(true);
  };

  const HandleText = (event) => {
    setDupArr({
      ...DupArr,
      text: event.target.value,
      Date: `${day}-${month}-${year} (${hours}:${minutes})`
    });
  };

  const FileNameHandle = (event) => {
    setFileName(event.target.value);
    setEmpty(event.target.value);
    setDupArr({
      ...DupArr,
      FileName: event.target.value
    });
  };

  useEffect(() => {
    const updateDataOnServer = async () => {
      try {
        await axios.put(`${EndPoint}/NotesArray/${id}`, DupArr);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };
  
    if (DupArr.id) { 
      updateDataOnServer();
    }
  }, [DupArr]);

  const SaveNotesHandle = () => {
    if (Empty !== null) {
      Navigate(Path.notes);
    }
  };

  const Handle=()=>{
    Navigate(Path.notes);
  }

  return (
    <div>
      <div>
      <BreadCrumbs  onClick={Handle} BreadCrumbsvalue={"Notes"} className='Notes-BreadCrumbs'/>
      <BreadCrumbs  BreadCrumbsvalue={"> Edit Notes"} className='Notes-BreadCrumbs'/>
      </div>
      
      <div className='NotesText-main-division'>
        <Textbox
          value={DupArr.text || ""}
          type={"textarea"}
          className='NotesText-Textbox'
          onchange={HandleText}
        />
        {save === false ? (
          <div className='NotesText-save-button-division'>
            <Button
              value={"Save"}
              className='NotesText-save-button'
              onClick={HandleSave}
            />
          </div>
        ) : (
          <div className='NotesText-SaveNotesCard-division'>
            <div className='NotesText-SaveNotesCard'>
              <SaveNotesCard
                onChange={FileNameHandle}
                CancelonClick={() => setSave(false)}
                onClick={SaveNotesHandle}
                value={fileName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditNotes;
