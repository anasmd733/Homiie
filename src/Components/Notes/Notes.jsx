import React, { useEffect, useState } from 'react';
import AddNotesCard from './AddNotesCard';
import "./Notes.css";
import { Path } from '../../Routes/Path';
import SaveNotesPdf from './SaveNotesPdf';
import SearchBar from '../../Common/SearchBar/SearchBar';
import axios from 'axios';
import DeletePopUp from '../../Common/DeletePopUp/DeletePopUp';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import { EndPoint } from '../../EndPoints/EndPoint';

const Notes = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [del, setDel] = useState("false");
  const [door, setDoor] = useState(false);

  const NotesData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/NotesArray`);
      setData(response.data);
      setLoaded(true);
      setDel("false"); 
    } catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };
  

  useEffect(() => {
    NotesData();
  }, [del]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const Navigate=useNavigate()

  const HandleNavigate=()=>{
    Navigate(Path.notes);
    // console.log("ok");
  }

  return (
    <div>
     <div onClick={HandleNavigate}>
     <BreadCrumbs BreadCrumbsvalue={"Notes"} className='Notes-BreadCrumbs'/>
     </div>
    <div className={`Notes-Main-Division ${door ? 'blur' : ''}`}>

      {loaded ? (
        <>
          <div className='Notes-SearchBar-division'>
            <SearchBar className='Notes-SearchBar' onChangeHandler={handleSearchTermChange} />
          </div>
          <div className={"Notes-Sub-Division"}>
            {data && data.filter(item => item.FileName.toLowerCase().includes(searchTerm.trim().toLowerCase())).map((value, index) => (
              <SaveNotesPdf
                key={index}
                ind={index}
                id={value.id}
                text={value.text}
                fileName={value.FileName}
                date={value.Date}
                setDel={setDel}
                setDoor={setDoor}
              />
            ))}
            <AddNotesCard path={Path.notesTextPage} />
          </div>
        </>
      ) : (
        "Loading"
      )}
      </div>
      {door && (
        <DeletePopUp
          className='DeletePopUp-delete-division'
          CancelonClick={() => setDoor(false)}
          DeleteonClick={() => {
            setDel("true"); 
            setDoor(false);
          }}
        />
      )}
    </div>
  );
};

export default Notes;
