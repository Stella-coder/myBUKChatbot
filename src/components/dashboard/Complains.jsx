import { Box, Modal } from "@mui/material"
import { styled } from "@mui/styles"
import { collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import app from "../../base";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button } from "antd";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'firebase/firestore';
import { useParams } from "react-router-dom";

const firestore = getFirestore(app);

const Complains = ()=>{
    const[data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    // const [userId, setUserId] = useState('');
    // const {id} = useParams()
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

   
                      
      const handleBookAppointment = (id) => {
        if (selectedDate) {
          // Check if the selected date is already booked
          if (bookedDates.includes(selectedDate.toUTCString())) {
            alert('This date is already booked. Please choose another date.');
            return;
          }
    
          // Update the list of booked dates in Firestore
        const docRef = doc(firestore, 'complains', id);

      // Update the document with the new date field
      updateDoc(docRef, {
        date: selectedDate.toUTCString(),
      })
        .then(() => {
          alert(`Appointment updated for ${selectedDate}`);
          fetchData()
           //   const docRef = collection(firestore, 'appointment');
    //                   addDoc(docRef, newData);
    //                   console.log('Data submitted successfully');
        })
        .catch((error) => {
          console.error('Error updating appointment:', error);
          alert('An error occurred while updating the appointment.');
        });
    } else {
      alert('Please select a date, user ID, and document ID for the appointment update.');
    }

      };
    
      // Fetch the booked dates from Firestore on component mount
      useEffect(() => {
        try {
            const querySnapshot =  getDocs(collection(firestore, 'bookedAppointments'));
            const fetchedData = querySnapshot.docs.map((doc) => doc.data().date)
            setBookedDates(fetchedData);
            // setData(fetchedData);
            console.log(bookedDates, "data");
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        
       
      }, []);


    const columns = [
        { id: 'avatar', label: 'Image', minWidth: 170 },
         {
          id: 'firstname',
          label: 'Name',
          minWidth: 170,
        },
        {
          id: 'phoneNo',
          label: 'Phone No',
          minWidth: 170,
        },
        {
          id: 'spouseName',
          label: 'Spouse Name',
          minWidth: 170,
        },
        {
          id: 'spouseNo',
          label: 'Spouse No',
          minWidth: 170,
        },
        {
          id: 'date',
          label: 'Schedule',
          minWidth: 170,
        },
        { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 },
      ];

    

    const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'complains'));
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(fetchedData);
          console.log(data, "data");
        } catch (error) {
          console.error('Error fetching data:', error);
        }


      };
      console.log(data, "data")
      const deleteData = async (id) => {
        try {
          const collectionName = 'complains';
          const docRef = doc(firestore, collectionName, id);
          await deleteDoc(docRef);
      
          // Fetch the updated data after deletion
          await fetchData();
      
          // Display a success message
          console.log(`${id} item deleted successfully.`);
        } catch (error) {
          console.error('Error while deleting:', error);
        }
      }
    
      useEffect(() => { 
        fetchData();
        // deleteIntent()
      }, []);

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return(
        <Container>
            <Wrapper>
                <Header>Complains</Header>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
     
     <TableContainer component={Paper}>
 <Table>
   <TableHead>
     <TableRow>
       {columns.map((column) => (
         <TableCell key={column.id}>{column.label}</TableCell>
       ))}
     </TableRow>
   </TableHead>
   <TableBody>
{data.map((item) => (
 <TableRow key={item.id}>
   <TableCell>
    <img src={item.avatar} style={{width:"40px", height:"40px", borderRadius:"50%"}}/>
   </TableCell>
   <TableCell>{item.firstName} {item.surname}</TableCell>
   <TableCell>{item.phoneNo}</TableCell>
   <TableCell>{item.spouseName}</TableCell>
   <TableCell>{item.spouseNo}</TableCell>
   <TableCell onClick ={handleOpen}>{
    item.date === undefined? "Book": item.date
   }</TableCell>

   {/* Render the icons in the "Actions" column */}
   <TableCell align="center">
     <DeleteIcon color="error" onClick={()=>{deleteData(item.id)}} />
   </TableCell>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox >
            <Wrapper>
            <h2>Book an Appointment</h2>
      <div className="date-picker-container">
        <DatePicker
                   selected={selectedDate}
                   onChange={handleDateChange}
                   showTimeSelect
                   dateFormat="MMMM d, yyyy h:mm aa"
                   timeIntervals={15}
                   minDate={new Date()} // Set minimum date to today
                   excludeDates={bookedDates.map((date) => new Date(date))}
        />
      </div>
      <button onClick={()=>{handleBookAppointment(item.id)}}>Book Appointment</button>
            </Wrapper>
       
        
        </ModalBox>
      </Modal>
 </TableRow>
))}
</TableBody>
 </Table>
</TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={data.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
     />
   </Paper>
   
   </Wrapper>
        </Container>
    )
}

export default Complains

const Container = styled(Box)({
    width:"100%",
    display:"flex",
    justifyContent:"flex-end",
    minHeight:"100vh",
    
    
})
const Wrapper = styled(Box)({
    width:"80%",
    display:"flex",
    flexDirection:"column",
    paddingLeft:"5px",
    marginTop:"20px"
})
const ModalBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column"
})
const Header = styled(Box)({
    fontSize:"20px",
    fontWeight:"bold",
    margin:"10px 0px",
    color:"blue"
})
// const Container = styled(Box)({})