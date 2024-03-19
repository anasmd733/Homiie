import React, { useState, useEffect } from 'react';
import Textbox from '../../Common/Textbox/Textbox';
import Button from '../../Common/Submit/Button';
import SaveNotesCard from './SaveNotesCard';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import "./Notes.css";
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import axios from 'axios';
import { EndPoint } from '../../EndPoints/EndPoint';

const NotesText = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [save, setSave] = useState(false);
  const [Empty, setEmpty] = useState('');
  const [DupArr, setDupArr] = useState({
    id: '',
    FileName: '',
    Date: '',
    text: ''
  });

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const Navigate = useNavigate();

  const NotesData = async () => {
    let Data = (await axios.get(`${EndPoint}/NotesArray`)).data;
    setData(Data);
    setLoaded(true);
  };

  useEffect(() => {
    NotesData();
  }, []);

  const HandleSave = () => {
    setSave(true);
  };

  const HandleText = (event) => {
    const nextId = getNextId().toString(); 
    setDupArr({
      ...DupArr,
      id: nextId,
      text: event.target.value,
      Date: `${day}-${month}-${year} (${hours}:${minutes})`
    });
  };
  

  const FileNameHandle = (event) => {
    setEmpty(event.target.value);
    setDupArr({
      ...DupArr,
      FileName: event.target.value
    });
  };

  const SaveNotesHandle = () => {
    if (Empty !== '') {
      Navigate(Path.notes);
      axios.post(`${EndPoint}/NotesArray`, DupArr);
    }
  };

  const getNextId = () => {
    if (data.length > 0) {
      const maxId = Math.max(...data.map(item => parseInt(item.id)));
      return maxId + 1;
    } else {
      return 0;
    }
  };
  const HandleNavigate=()=>{
    Navigate(Path.notes)
  }

  return (
    <div>
      <BreadCrumbs onClick={HandleNavigate} BreadCrumbsvalue={"Notes >"} />
      <BreadCrumbs  BreadCrumbsvalue={"Text Area"}/>
      <div className='NotesText-main-division'>
        <Textbox
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesText;
